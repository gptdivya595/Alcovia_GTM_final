import React, { useState } from 'react';
import {
  Megaphone,
  AlertTriangle,
  Search,
  Filter,
  TrendingUp,
  HelpCircle,
  Eye,
  MousePointer,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { MarketingCampaign } from '../types/dashboard';
import { formatINR, formatNumberIN, formatPercent } from '../utils/formatters';

interface MarketingViewProps {
  campaigns: MarketingCampaign[];
}

export const MarketingView: React.FC<MarketingViewProps> = ({ campaigns }) => {
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<MarketingCampaign | null>(null);

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesChannel =
      selectedChannel === 'all' || camp.channel === selectedChannel;
    const matchesSearch =
      camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.channel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalQualified = campaigns.reduce((acc, c) => acc + c.qualifiedLeads, 0);
  const blendedCPQL = totalSpend / (totalQualified || 1);
  const blendedCTR = (totalClicks / (totalImpressions || 1)) * 100;
  const flaggedCount = campaigns.filter((c) => c.frequency >= 3.0).length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Paid Acquisition &amp; Campaign Unit Economics
            </h2>
            {flaggedCount > 0 && (
              <span className="px-2 py-0.5 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                {flaggedCount} Frequency Flags (≥ 3.0)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cost per qualified lead (CPQL), ad frequency fatigue reviews, and landing page drop-off telemetry.
          </p>
        </div>
      </div>

      {/* Frequency Protocol Banner (Mandatory requirement from brief) */}
      <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-900 text-sm">
            Ad Frequency Policy Rule: Review Trigger at Frequency ≥ 3.0
          </div>
          <p className="text-amber-800 leading-relaxed text-[11px]">
            A frequency at or above <strong>3.0</strong> is configured as a creative refresh review threshold, <em>not an automatic decision to halt or kill a campaign</em>.
            When triggered, review marginal week-over-week CPQL and creative fatigue before adjusting audience targeting or budget pacing.
          </p>
        </div>
      </div>

      {/* Aggregate Unit Economics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Ad Spend
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
            {formatINR(totalSpend)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across 6 tracked campaigns
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Impressions
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
            {formatNumberIN(totalImpressions)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {formatNumberIN(totalClicks)} clicks ({formatPercent(blendedCTR)} CTR)
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Qualified Leads (QL)
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
            {formatNumberIN(totalQualified)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Verified academic profile match
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Blended CPQL
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1 tabular-nums">
            {formatINR(blendedCPQL)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Spend ÷ Qualified Leads
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Attributed Enrollments
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
            {campaigns.reduce((acc, c) => acc + c.totalConversions, 0)} Won
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Trials + Full programs
          </div>
        </div>
      </div>

      {/* Campaigns Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Campaign Performance &amp; Diagnostic Ledger
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any campaign row to inspect ad creative signals and audience fatigue details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter campaign name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-950 w-48"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setSelectedChannel('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedChannel === 'all'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Channels
              </button>
              <button
                onClick={() => setSelectedChannel('Meta Ads')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedChannel === 'Meta Ads'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Meta
              </button>
              <button
                onClick={() => setSelectedChannel('Google Search')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedChannel === 'Google Search'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Google
              </button>
              <button
                onClick={() => setSelectedChannel('School Partner Workshop')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedChannel === 'School Partner Workshop'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Workshops
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Campaign Name &amp; Channel</th>
                <th className="py-3 px-4 text-right">Spend</th>
                <th className="py-3 px-4 text-right">Clicks (CTR)</th>
                <th className="py-3 px-4 text-center">Frequency</th>
                <th className="py-3 px-4 text-right">LP Drop-off</th>
                <th className="py-3 px-4 text-right">Qualified Leads</th>
                <th className="py-3 px-4 text-right">CPQL</th>
                <th className="py-3 px-4 text-center">Won</th>
                <th className="py-3 px-4">Operational Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCampaigns.map((camp) => {
                const isFrequencyFlagged = camp.frequency >= 3.0;

                return (
                  <tr
                    key={camp.id}
                    onClick={() => setSelectedCampaign(camp)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 max-w-[220px]">
                      <div className="font-semibold text-slate-900 truncate">
                        {camp.name}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{camp.channel}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {formatINR(camp.spend)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="font-mono text-slate-900">
                        {formatNumberIN(camp.clicks)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {formatPercent(camp.ctr)} CTR
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                          isFrequencyFlagged
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                        title={
                          isFrequencyFlagged
                            ? 'Frequency ≥ 3.0: Ad fatigue review threshold'
                            : 'Nominal frequency'
                        }
                      >
                        {isFrequencyFlagged && (
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{camp.frequency.toFixed(2)}x</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-mono font-bold ${
                          camp.landingPageDropOffPercent > 65
                            ? 'text-rose-600'
                            : 'text-slate-700'
                        }`}
                      >
                        {formatPercent(camp.landingPageDropOffPercent)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {camp.qualifiedLeads}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-extrabold text-emerald-700 tabular-nums">
                      {formatINR(camp.costPerQualifiedLead)}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">
                      {camp.totalConversions}
                    </td>
                    <td className="py-3 px-4 max-w-[250px]">
                      <div
                        className={`text-[11px] leading-tight truncate ${
                          camp.signalSeverity === 'alert'
                            ? 'text-rose-700 font-semibold'
                            : camp.signalSeverity === 'review'
                            ? 'text-amber-800'
                            : 'text-slate-600'
                        }`}
                      >
                        {camp.investigationSignal}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Campaign Unit Economics Deep Dive
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">
                  {selectedCampaign.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Total Spend</span>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                  {formatINR(selectedCampaign.spend)}
                </div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Frequency</span>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5 flex items-center gap-1">
                  <span>{selectedCampaign.frequency.toFixed(2)}x</span>
                  {selectedCampaign.frequency >= 3.0 && (
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-1 rounded">Flag</span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Cost per QL</span>
                <div className="font-mono font-extrabold text-emerald-700 text-sm mt-0.5">
                  {formatINR(selectedCampaign.costPerQualifiedLead)}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Channel &amp; Status:</span>
                <span className="font-semibold text-slate-900">
                  {selectedCampaign.channel} ({selectedCampaign.status})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Landing Page Visits:</span>
                <span className="font-mono text-slate-900">
                  {formatNumberIN(selectedCampaign.landingPageVisits)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Landing Page Drop-Off:</span>
                <span className="font-mono font-bold text-rose-600">
                  {formatPercent(selectedCampaign.landingPageDropOffPercent)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Trial Signups Attributed:</span>
                <span className="font-mono text-slate-900">
                  {selectedCampaign.trialSignups} students
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Full Program Signups Attributed:</span>
                <span className="font-mono text-slate-900">
                  {selectedCampaign.fullProgramSignups} students
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1 text-xs">
              <span className="font-bold text-amber-900 block">Recommended Investigation:</span>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                {selectedCampaign.investigationSignal}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
