import React, { useState } from 'react';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Header } from './components/Header';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { RevenueView } from './components/RevenueView';
import { FunnelView } from './components/FunnelView';
import { MarketingView } from './components/MarketingView';
import { GrowthDecisionsView } from './components/GrowthDecisionsView';
import { DataQualityView } from './components/DataQualityView';
import {
  EXECUTIVE_OVERVIEWS,
  FUNNEL_STAGES_OCTOBER,
  GROWTH_INSIGHTS_DATA,
  MARKETING_CAMPAIGNS_DATA,
  REVENUE_MONTHLY_TRENDS,
  UNPAID_INVOICES_DATA,
  UPCOMING_RENEWALS_DATA,
} from './data/demoData';
import { DateRangeKey, ExecutiveOverviewData } from './types/dashboard';
import { formatINR, formatPercent } from './utils/formatters';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeKey>('this_month');
  const [customStart, setCustomStart] = useState('2026-10-01');
  const [customEnd, setCustomEnd] = useState('2026-10-24');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive active executive overview data
  const currentOverview: ExecutiveOverviewData =
    EXECUTIVE_OVERVIEWS[selectedDateRange] || EXECUTIVE_OVERVIEWS.this_month;

  // Derive proportionally scaled funnel data for the selected date range
  const scaleFactor =
    currentOverview.studentsOnboarded / EXECUTIVE_OVERVIEWS.this_month.studentsOnboarded;

  const scaledFunnelStages = FUNNEL_STAGES_OCTOBER.map((stage) => {
    const scaledCount = Math.round(stage.count * scaleFactor);
    const scaledDropOff = Math.round(stage.dropOffCount * scaleFactor);
    return {
      ...stage,
      count: scaledCount,
      dropOffCount: scaledDropOff,
      channelBreakdown: {
        metaAds: Math.round(stage.channelBreakdown.metaAds * scaleFactor),
        googleSearch: Math.round(stage.channelBreakdown.googleSearch * scaleFactor),
        schoolWorkshops: Math.round(stage.channelBreakdown.schoolWorkshops * scaleFactor),
        referrals: Math.round(stage.channelBreakdown.referrals * scaleFactor),
        organicContent: Math.round(stage.channelBreakdown.organicContent * scaleFactor),
      },
    };
  });

  // Scale marketing spend based on period
  const scaledCampaigns = MARKETING_CAMPAIGNS_DATA.map((camp) => {
    const spendScaled = Math.round(camp.spend * scaleFactor);
    const qualScaled = Math.max(1, Math.round(camp.qualifiedLeads * scaleFactor));
    return {
      ...camp,
      spend: spendScaled,
      impressions: Math.round(camp.impressions * scaleFactor),
      clicks: Math.round(camp.clicks * scaleFactor),
      qualifiedLeads: qualScaled,
      costPerQualifiedLead: Math.round((spendScaled / qualScaled) * 100) / 100,
      totalConversions: Math.max(1, Math.round(camp.totalConversions * scaleFactor)),
    };
  });

  // Filter invoices for display (e.g. subset for last month or full for this month)
  const displayedInvoices =
    selectedDateRange === 'last_month'
      ? UNPAID_INVOICES_DATA.slice(0, 3)
      : UNPAID_INVOICES_DATA;

  // Reset to default date filter
  const handleResetDemo = () => {
    setSelectedDateRange('this_month');
    setActiveTab('overview');
  };

  // Export Executive Summary to CSV
  const handleExportSummary = () => {
    const csvRows = [
      ['Alcovia GTM & Revenue Executive Summary'],
      ['Evaluation Period', selectedDateRange],
      ['Generated At', new Date().toISOString()],
      [''],
      ['Metric', 'Value', 'Unit/Notes'],
      ['Total Actual Revenue', currentOverview.actualRevenue, 'INR (₹)'],
      ['Revenue Target', currentOverview.targetRevenue, 'INR (₹)'],
      ['Achievement Rate', `${currentOverview.achievementRate}%`, 'Percentage'],
      ['Program Revenue', currentOverview.programRevenue, 'INR (₹) (Trials + Full)'],
      ['Workshop Revenue', currentOverview.workshopRevenue, 'INR (₹) (Masterclasses)'],
      ['Workshop Seats Sold', currentOverview.workshopSeatsSold, 'Seats @ ₹3,999/seat'],
      ['Students Onboarded', currentOverview.studentsOnboarded, 'Total Enrolled'],
      ['3-Month Trials', currentOverview.trialSignups, 'Signups @ ₹29,999'],
      ['Full Programs', currentOverview.fullProgramSignups, 'Tuition @ ₹98,000'],
      ['Unpaid Invoices', currentOverview.unpaidInvoicesAmount, 'INR (₹) Overdue'],
      ['Upcoming Renewals', currentOverview.upcomingRenewalsAmount, 'INR (₹) Pipeline'],
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      csvRows.map((e) => e.map((cell) => `"${cell}"`).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Alcovia_GTM_Executive_Summary_${selectedDateRange}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex bg-[#f6f8fb] text-slate-900">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setMobileMenuOpen(false);
          }}
          achievementRate={currentOverview.achievementRate}
          studentsOnboarded={currentOverview.studentsOnboarded}
          overdueInvoicesCount={currentOverview.overdueAccountsCount}
          flaggedCampaignsCount={2}
          growthAuditsCount={GROWTH_INSIGHTS_DATA.length}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Toggle */}
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slate-950 text-white font-extrabold flex items-center justify-center text-xs">
              ALC
            </div>
            <span className="font-bold text-xs text-slate-900">Alcovia GTM</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Global Executive Header with Date Filtering */}
        <Header
          selectedDateRange={selectedDateRange}
          onDateRangeChange={setSelectedDateRange}
          onResetDemo={handleResetDemo}
          onExportSummary={handleExportSummary}
          customStartDate={customStart}
          customEndDate={customEnd}
          onCustomDatesChange={(start, end) => {
            setCustomStart(start);
            setCustomEnd(end);
          }}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {activeTab === 'overview' && (
            <ExecutiveOverview
              data={currentOverview}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'revenue' && (
            <RevenueView
              overviewData={currentOverview}
              monthlyTrends={REVENUE_MONTHLY_TRENDS}
              invoices={displayedInvoices}
              renewals={UPCOMING_RENEWALS_DATA}
            />
          )}

          {activeTab === 'funnel' && (
            <FunnelView
              funnelStages={scaledFunnelStages}
              trialSignups={currentOverview.trialSignups}
              fullProgramSignups={currentOverview.fullProgramSignups}
            />
          )}

          {activeTab === 'marketing' && (
            <MarketingView campaigns={scaledCampaigns} />
          )}

          {activeTab === 'growth' && (
            <GrowthDecisionsView insights={GROWTH_INSIGHTS_DATA} />
          )}

          {activeTab === 'quality' && (
            <DataQualityView
              overviewData={currentOverview}
              invoices={displayedInvoices}
              onResetDemo={handleResetDemo}
            />
          )}
        </main>
      </div>
    </div>
  );
}
