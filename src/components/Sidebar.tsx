import React from 'react';
import {
  LayoutGrid,
  IndianRupee,
  Filter,
  Megaphone,
  Lightbulb,
  FileSpreadsheet,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { formatPercent } from '../utils/formatters';

export type ActiveTab = 'overview' | 'revenue' | 'funnel' | 'marketing' | 'growth' | 'quality';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  achievementRate: number;
  studentsOnboarded: number;
  overdueInvoicesCount: number;
  flaggedCampaignsCount: number;
  growthAuditsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  achievementRate,
  studentsOnboarded,
  overdueInvoicesCount,
  flaggedCampaignsCount,
  growthAuditsCount,
}) => {
  const navItems = [
    {
      id: 'overview' as ActiveTab,
      label: 'Executive Overview',
      icon: LayoutGrid,
      badge: null,
    },
    {
      id: 'revenue' as ActiveTab,
      label: 'Revenue & Invoices',
      icon: IndianRupee,
      badge: overdueInvoicesCount > 0 ? `${overdueInvoicesCount} Due` : null,
      badgeStyle: 'bg-rose-100 text-rose-700 border-rose-200',
    },
    {
      id: 'funnel' as ActiveTab,
      label: '8-Stage Lead Funnel',
      icon: Filter,
      badge: `${studentsOnboarded} Won`,
      badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'marketing' as ActiveTab,
      label: 'Marketing Campaigns',
      icon: Megaphone,
      badge: flaggedCampaignsCount > 0 ? `${flaggedCampaignsCount} Flags` : null,
      badgeStyle: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'growth' as ActiveTab,
      label: 'Growth Decisions',
      icon: Lightbulb,
      badge: `${growthAuditsCount} Audits`,
      badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      id: 'quality' as ActiveTab,
      label: 'Data Quality & Math',
      icon: FileSpreadsheet,
      badge: 'Verified',
      badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-lg bg-slate-950 text-white font-extrabold flex items-center justify-center text-sm tracking-wider shadow-sm">
            ALC
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              Alcovia Growth
            </div>
            <div className="text-sm font-bold text-slate-900 tracking-tight">
              Executive Console
            </div>
          </div>
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Fictional Demo Data
        </div>
      </div>

      {/* Navigation Links */}
      <div className="p-3 flex-1 space-y-1">
        <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left group ${
                isActive
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full border shrink-0 transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-slate-200 border-slate-700'
                      : item.badgeStyle || 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Quick KPI Pill Footer */}
      <div className="p-4 mx-3 mb-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Target Achievement</span>
          <span className="font-bold text-slate-900 font-mono tabular-nums">
            {formatPercent(achievementRate)}
          </span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(achievementRate, 100)}%` }}
          />
        </div>
        <div className="pt-1 flex items-center justify-between text-xs border-t border-slate-200/60">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Users className="w-3.5 h-3.5" />
            <span>Students Onboarded:</span>
          </div>
          <span className="font-bold text-slate-900 font-mono tabular-nums">
            {studentsOnboarded}
          </span>
        </div>
      </div>

      {/* Sandbox attribution footer */}
      <div className="px-5 py-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Alcovia GTM v2.4</span>
        <span className="inline-flex items-center gap-1 text-slate-500">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Sandboxed
        </span>
      </div>
    </aside>
  );
};
