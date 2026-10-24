import React from 'react';
import {
  Users,
  Sparkles,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { ExecutiveOverviewData } from '../types/dashboard';
import { formatINR, formatNumberIN, formatPercent } from '../utils/formatters';
import { ActiveTab } from './Sidebar';

interface ExecutiveOverviewProps {
  data: ExecutiveOverviewData;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  data,
  onNavigateTab,
}) => {
  const programShare = ((data.programRevenue / data.actualRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Title & Currency strip */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Executive Overview &amp; Financial Health
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            High-level revenue pacing, stream attribution, receivables risk, and cohort conversion metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-slate-600">
            Currency: <strong className="text-slate-900">INR (₹)</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>+{data.momGrowthPercent}% MoM</span>
          </span>
        </div>
      </div>

      {/* Primary Split: Revenue vs Target Card + GTM Health Pulse Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Total Revenue Card (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Total Revenue vs Target
              </span>
              <div className="text-right">
                <div className="text-xl font-extrabold text-emerald-600 font-mono tabular-nums leading-none">
                  {formatPercent(data.achievementRate)}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  Achievement Rate
                </div>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-mono tracking-tight tabular-nums">
                {formatINR(data.actualRevenue)}
              </span>
              <span className="text-sm font-semibold text-slate-500">
                of {formatINR(data.targetRevenue)} Target
              </span>
            </div>

            {/* Target Progress Bar */}
            <div className="mt-5 space-y-1.5">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(data.achievementRate, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 font-mono">
                <span>0%</span>
                <span className="text-slate-600 font-semibold">Target: {formatINR(data.targetRevenue)}</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Revenue Stream Breakdown (Separated to eliminate double-counting) */}
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Program Revenue
              </div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-1 tabular-nums">
                {formatINR(data.programRevenue)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Trials, Full Programs &amp; Ongoing Cohorts
              </div>
            </div>

            <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Workshop Revenue
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 rounded-full font-mono">
                  ₹{formatNumberIN(data.workshopSeatPrice)}/seat
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-1 tabular-nums">
                {formatINR(data.workshopRevenue)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {data.workshopSeatsSold} seats sold across Masterclasses
              </div>
            </div>
          </div>
        </div>

        {/* Right: GTM Health Pulse Card (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
              GTM Health Pulse
            </div>
            <h3 className="text-lg font-bold text-white mt-1.5 leading-snug">
              Growth Pacing: {formatPercent(data.achievementRate)} of Target
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
              Programs contribute {programShare}% of revenue, with workshops acting as the primary low-friction gateway for qualified discovery calls.
            </p>
          </div>

          <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigateTab('revenue')}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors text-left group"
            >
              <span>Inspect Detailed Ledger</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigateTab('funnel')}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors text-left group shadow-sm"
            >
              <span>Explore 8-Stage Funnel</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Students Onboarded */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Students Onboarded
              </span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {data.studentsOnboarded}
              </span>
              <span className="text-xs text-slate-500 font-medium">active this term</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>3-Month Trials:</span>
              <strong className="text-slate-900 font-mono">{data.trialSignups}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Full Programs:</span>
              <strong className="text-slate-900 font-mono">{data.fullProgramSignups}</strong>
            </div>
          </div>
        </div>

        {/* Card 2: 3-Month Trials */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                3-Month Trials
              </span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {data.trialSignups}
              </span>
              <span className="text-xs text-slate-500 font-medium">signups</span>
            </div>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
            Introductory pricing @ ₹29,999. High historical conversion to full annual programs.
          </p>
        </div>

        {/* Card 3: Full Program Signups */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Full Program Signups
              </span>
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {data.fullProgramSignups}
              </span>
              <span className="text-xs text-slate-500 font-medium">enrolled</span>
            </div>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
            Direct annual enrollments @ ₹98,000 tuition. Long-term student LTV anchor.
          </p>
        </div>

        {/* Card 4: Receivables & Renewals */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Receivables &amp; Renewals
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-rose-600 font-semibold">Unpaid Invoices:</span>
                <span className="font-extrabold text-rose-600 font-mono tabular-nums">
                  {formatINR(data.unpaidInvoicesAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Upcoming Renewals:</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums">
                  {formatINR(data.upcomingRenewalsAmount)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('revenue')}
            className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center justify-between text-left group"
          >
            <span>Review {data.overdueAccountsCount} overdue accounts</span>
            <ArrowRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
