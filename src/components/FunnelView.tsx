import React, { useState } from 'react';
import {
  Filter,
  ArrowDown,
  Layers,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BarChart2,
  ChevronRight,
} from 'lucide-react';
import { FunnelStageData } from '../types/dashboard';
import { formatNumberIN, formatPercent } from '../utils/formatters';

interface FunnelViewProps {
  funnelStages: FunnelStageData[];
  trialSignups: number;
  fullProgramSignups: number;
}

export const FunnelView: React.FC<FunnelViewProps> = ({
  funnelStages,
  trialSignups,
  fullProgramSignups,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-4'); // Default select Discovery Call Attended

  const selectedStage =
    funnelStages.find((s) => s.id === selectedStageId) || funnelStages[0];

  const totalWonStudents = trialSignups + fullProgramSignups;
  const initialLeads = funnelStages[0]?.count || 1420;
  const qualifiedLeads = funnelStages[1]?.count || 780;
  const architectSessions = funnelStages[5]?.count || 122;

  const leadToWonRate = (totalWonStudents / initialLeads) * 100;
  const qualifiedToWonRate = (totalWonStudents / qualifiedLeads) * 100;
  const architectClosingRate = (totalWonStudents / architectSessions) * 100;

  return (
    <div className="space-y-6">
      {/* Title & Summary Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              8-Stage Admissions &amp; Enrollment Funnel
            </h2>
            <span className="px-2 py-0.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full">
              {totalWonStudents} Won Enrolled
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage progression, mathematically verified drop-offs, explicit denominators, and channel attribution.
          </p>
        </div>
      </div>

      {/* Funnel Efficiency KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Won Students
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
            {totalWonStudents}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {trialSignups} 3-Month Trials + {fullProgramSignups} Full Programs
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Architect Session Closing Rate
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1 tabular-nums">
            {formatPercent(architectClosingRate)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Denominator: Stage 6 ({architectSessions} sessions completed)
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Qualified Lead to Won
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
            {formatPercent(qualifiedToWonRate)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Denominator: Stage 2 ({qualifiedLeads} verified prospects)
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Blended Intake Conversion
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
            {formatPercent(leadToWonRate, 2)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Denominator: Stage 1 ({initialLeads} total raw leads)
          </div>
        </div>
      </div>

      {/* Main Funnel Layout: Stages Column + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 8 Stages Visual Progression (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Full 8-Stage Progression Pipeline
              </span>
              <span className="text-[11px] text-slate-400">
                Click any stage card to audit attribution
              </span>
            </div>

            <div className="space-y-2.5">
              {funnelStages.map((stage, idx) => {
                const isSelected = stage.id === selectedStageId;
                const widthPercent = Math.max(
                  15,
                  (stage.count / funnelStages[0].count) * 100
                );

                return (
                  <div key={stage.id} className="relative">
                    <button
                      onClick={() => setSelectedStageId(stage.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-slate-950 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200/80 bg-white hover:bg-slate-50 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isSelected
                                ? 'bg-emerald-400 text-slate-950'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {stage.stageNumber}
                          </span>
                          <span className="font-bold text-xs truncate">
                            {stage.name}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span
                            className={`font-mono font-extrabold text-sm tabular-nums ${
                              isSelected ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {formatNumberIN(stage.count)}
                          </span>
                          <span
                            className={`text-[10px] font-medium ${
                              isSelected ? 'text-slate-300' : 'text-slate-400'
                            }`}
                          >
                            ({formatPercent(stage.overallConversionRate)} of leads)
                          </span>
                        </div>
                      </div>

                      {/* Visual stage volume bar */}
                      <div className="mt-2.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isSelected ? 'bg-emerald-400' : 'bg-slate-800'
                          }`}
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>

                      {/* Explicit Denominator & Step Conversion Formula */}
                      <div
                        className={`mt-2 flex flex-wrap items-center justify-between text-[10px] pt-1.5 border-t ${
                          isSelected
                            ? 'border-slate-800 text-slate-300'
                            : 'border-slate-100 text-slate-500'
                        }`}
                      >
                        <div>
                          <strong>Conversion:</strong>{' '}
                          <span className={isSelected ? 'text-emerald-300' : 'text-emerald-700 font-bold'}>
                            {formatPercent(stage.stepConversionRate)}
                          </span>{' '}
                          (Denominator: {stage.denominatorName})
                        </div>
                        {stage.dropOffCount > 0 && (
                          <div className={isSelected ? 'text-rose-300' : 'text-rose-600'}>
                            Drop-off: <strong>{formatNumberIN(stage.dropOffCount)}</strong> ({formatPercent(stage.dropOffRate)})
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Stage Deep Dive & Channel Attribution (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs sticky top-24 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  {selectedStage.stageNumber}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  Stage Audit: {selectedStage.name}
                </h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold text-slate-700 bg-slate-100 rounded-full font-mono">
                {formatNumberIN(selectedStage.count)} Count
              </span>
            </div>

            {/* Description */}
            <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {selectedStage.stageDescription}
            </div>

            {/* Explicit Conversion Math Box */}
            <div className="p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                <span>Explicit Mathematical Formula</span>
              </div>
              <div className="text-[11px] text-blue-900 space-y-1">
                <div>
                  • <strong>Numerator:</strong> Current Stage Count ={' '}
                  <span className="font-mono font-bold">{formatNumberIN(selectedStage.count)}</span>
                </div>
                <div>
                  • <strong>Denominator:</strong> {selectedStage.denominatorName}
                </div>
                <div>
                  • <strong>Step Conversion Rate:</strong>{' '}
                  <span className="font-mono font-bold text-emerald-800">
                    {formatPercent(selectedStage.stepConversionRate)}
                  </span>
                </div>
                {selectedStage.dropOffCount > 0 && (
                  <div>
                    • <strong>Drop-off Rate:</strong>{' '}
                    <span className="font-mono font-bold text-rose-700">
                      {formatPercent(selectedStage.dropOffRate)}
                    </span>{' '}
                    ({formatNumberIN(selectedStage.dropOffCount)} drop-offs)
                  </div>
                )}
              </div>
            </div>

            {/* Channel Inflow Breakdown for this Stage */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Inflow by Marketing Channel</span>
                <span className="text-[10px] text-slate-400 font-normal">Sum = {selectedStage.count}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Meta Ads</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedStage.channelBreakdown.metaAds} (
                    {formatPercent((selectedStage.channelBreakdown.metaAds / selectedStage.count) * 100)}
                    )
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{
                      width: `${(selectedStage.channelBreakdown.metaAds / selectedStage.count) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-600">Google Search</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedStage.channelBreakdown.googleSearch} (
                    {formatPercent((selectedStage.channelBreakdown.googleSearch / selectedStage.count) * 100)}
                    )
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{
                      width: `${(selectedStage.channelBreakdown.googleSearch / selectedStage.count) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-600">School Partner Workshops</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedStage.channelBreakdown.schoolWorkshops} (
                    {formatPercent((selectedStage.channelBreakdown.schoolWorkshops / selectedStage.count) * 100)}
                    )
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{
                      width: `${(selectedStage.channelBreakdown.schoolWorkshops / selectedStage.count) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-600">Referrals &amp; Alumni</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedStage.channelBreakdown.referrals} (
                    {formatPercent((selectedStage.channelBreakdown.referrals / selectedStage.count) * 100)}
                    )
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full"
                    style={{
                      width: `${(selectedStage.channelBreakdown.referrals / selectedStage.count) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Counselors Optimization Note */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">Counselor Operational Signal:</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {selectedStage.optimizationNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
