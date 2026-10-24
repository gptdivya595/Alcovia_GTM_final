import React, { useState } from 'react';
import {
  Calendar,
  Download,
  RotateCcw,
  AlertCircle,
  ChevronDown,
  Info,
  Check,
} from 'lucide-react';
import { DateRangeConfig, DateRangeKey } from '../types/dashboard';
import { DATE_RANGE_OPTIONS } from '../data/demoData';

interface HeaderProps {
  selectedDateRange: DateRangeKey;
  onDateRangeChange: (key: DateRangeKey) => void;
  onResetDemo: () => void;
  onExportSummary: () => void;
  customStartDate?: string;
  customEndDate?: string;
  onCustomDatesChange?: (start: string, end: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDateRange,
  onDateRangeChange,
  onResetDemo,
  onExportSummary,
  customStartDate,
  customEndDate,
  onCustomDatesChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [tempStart, setTempStart] = useState(customStartDate || '2026-10-01');
  const [tempEnd, setTempEnd] = useState(customEndDate || '2026-10-24');
  const [showDisclaimerDetails, setShowDisclaimerDetails] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  const currentOption =
    DATE_RANGE_OPTIONS.find((opt) => opt.key === selectedDateRange) ||
    DATE_RANGE_OPTIONS[0];

  const handleApplyCustom = () => {
    if (onCustomDatesChange) {
      onCustomDatesChange(tempStart, tempEnd);
    }
    onDateRangeChange('custom');
    setShowCustomModal(false);
    setDropdownOpen(false);
  };

  const handleExport = () => {
    onExportSummary();
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand breadcrumb & title */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>ALCOVIA GROWTH &amp; REVENUE</span>
            <span>/</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px] font-medium">
              Fictional Demo Data
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            GTM &amp; Revenue Executive Console
          </h1>
        </div>

        {/* Action Controls & Date Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>{selectedDateRange === 'custom' ? `Custom: ${tempStart} → ${tempEnd}` : currentOption.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Evaluation Window
                </div>
                {DATE_RANGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      onDateRangeChange(opt.key);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                      selectedDateRange === opt.key
                        ? 'bg-slate-950 text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedDateRange === opt.key && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => {
                    setShowCustomModal(true);
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-3.5 py-2 text-xs text-left transition-colors font-medium ${
                    selectedDateRange === 'custom'
                      ? 'bg-slate-950 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Custom Range...
                </button>
              </div>
            )}
          </div>

          {/* Export Summary Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors"
            title="Download executive CSV summary"
          >
            {exportNotice ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Download className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span>{exportNotice ? 'Exported CSV!' : 'Export Summary'}</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={onResetDemo}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors group"
            title="Reset to default date range (Oct 2026) and default state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500 group-hover:-rotate-90 transition-transform duration-300" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Custom Date Range Picker Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Select Custom Range</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={tempStart}
                  onChange={(e) => setTempStart(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-950"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={tempEnd}
                  onChange={(e) => setTempEnd(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-950"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustom}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg shadow-sm"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fictional Demo Data Banner */}
      <div className="mt-2 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            <strong>Fictional Demo Environment:</strong> All revenue figures, funnel transitions, student records, and ad metrics are synthetic mock values for product architecture evaluation.
          </span>
        </div>
        <button
          onClick={() => setShowDisclaimerDetails(!showDisclaimerDetails)}
          className="text-slate-500 hover:text-slate-800 underline font-medium shrink-0 ml-2"
        >
          {showDisclaimerDetails ? 'Hide Details' : 'Integrations Notice'}
        </button>
      </div>

      {showDisclaimerDetails && (
        <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Pre-Production Integration Roadmap</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-800">
            This dashboard operates on deterministic mock data with full mathematical integrity. Prior to production release, live Webhook/API integrations are required for: <strong>Stripe / Razorpay</strong> (invoice auto-sync &amp; instant reconciliation), <strong>HubSpot / Salesforce</strong> (CRM 8-stage funnel progression), and <strong>Meta Marketing &amp; Google Ads APIs</strong> (automated live impression &amp; frequency ingest).
          </p>
        </div>
      )}
    </header>
  );
};
