import React, { useState } from 'react';
import {
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  TrendingDown,
  Layers,
  Clock,
  Compass,
  FileCheck,
} from 'lucide-react';
import { GrowthInsight } from '../types/dashboard';

interface GrowthDecisionsViewProps {
  insights: GrowthInsight[];
}

export const GrowthDecisionsView: React.FC<GrowthDecisionsViewProps> = ({ insights }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedAudits, setCompletedAudits] = useState<Record<string, boolean>>({});

  const filteredInsights =
    selectedCategory === 'all'
      ? insights
      : insights.filter((i) => i.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleToggleAudit = (id: string) => {
    setCompletedAudits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Growth Decisions &amp; Investigative Audits
            </h2>
            <span className="px-2 py-0.5 text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 rounded-full">
              {insights.length} Audits Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Prescriptive diagnostics highlighting anomalies, comparative benchmarks, and controlled investigation hypotheses.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({insights.length})
          </button>
          <button
            onClick={() => setSelectedCategory('marketing')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              selectedCategory === 'marketing'
                ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Marketing
          </button>
          <button
            onClick={() => setSelectedCategory('funnel')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              selectedCategory === 'funnel'
                ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Funnel
          </button>
          <button
            onClick={() => setSelectedCategory('receivables')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              selectedCategory === 'receivables'
                ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Receivables
          </button>
        </div>
      </div>

      {/* Epistemological Rigor Callout (Mandatory non-causation requirement) */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-start gap-3 shadow-sm">
        <Compass className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <div className="font-bold text-white text-sm">
            Scientific Investigation Standard: Correlation Does Not Equal Causation
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            Every finding below presents the <strong>Metric</strong>, the <strong>Observed Value</strong>, the <strong>Relevant Comparison</strong>, and an empirical <strong>Next Investigation</strong>.
            Founders and growth operators must run controlled multivariate tests before attributing drop-offs or fatigue to a single causal root.
          </p>
        </div>
      </div>

      {/* List of Insights */}
      <div className="grid grid-cols-1 gap-4">
        {filteredInsights.map((insight) => {
          const isDone = completedAudits[insight.id];

          return (
            <div
              key={insight.id}
              className={`bg-white border rounded-2xl p-6 shadow-xs transition-all ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/20 opacity-80'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      insight.severity === 'high'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {insight.category} · {insight.severity.toUpperCase()} PRIORITY
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">
                    {insight.title}
                  </h3>
                </div>

                <button
                  onClick={() => handleToggleAudit(insight.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Audit Completed' : 'Mark as Audited'}</span>
                </button>
              </div>

              {/* Metric & Comparison 2-Column Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Observed Metric &amp; Value
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-1">
                    {insight.metric}
                  </div>
                  <div className="font-mono font-extrabold text-rose-600 text-base mt-1">
                    {insight.observedValue}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Relevant Comparison &amp; Benchmark
                  </div>
                  <div className="text-slate-700 text-xs mt-1 leading-relaxed">
                    {insight.relevantComparison}
                  </div>
                </div>
              </div>

              {/* Recommended Next Investigation */}
              <div className="mt-4 p-4 bg-blue-50/60 border border-blue-200/80 rounded-xl text-xs space-y-1.5">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-700" />
                  <span>Recommended Next Investigation Steps:</span>
                </div>
                <p className="text-blue-900/90 leading-relaxed text-[11px]">
                  {insight.recommendedInvestigation}
                </p>
              </div>

              {/* Causation Warning Callout */}
              <div className="mt-3 text-[11px] text-slate-500 italic flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{insight.causationCaution}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
