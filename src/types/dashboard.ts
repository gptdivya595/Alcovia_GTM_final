export type DateRangeKey = 'this_month' | 'last_month' | 'q3_2026' | 'ytd_2026' | 'custom';

export interface DateRangeConfig {
  key: DateRangeKey;
  label: string;
  startDate: string;
  endDate: string;
  periodLabel: string;
}

export interface ExecutiveOverviewData {
  targetRevenue: number;
  actualRevenue: number;
  achievementRate: number;
  programRevenue: number;
  workshopRevenue: number;
  workshopSeatsSold: number;
  workshopSeatPrice: number;
  studentsOnboarded: number;
  trialSignups: number;
  fullProgramSignups: number;
  unpaidInvoicesAmount: number;
  overdueAccountsCount: number;
  upcomingRenewalsAmount: number;
  momGrowthPercent: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  offeringType: 'Program' | 'Workshop';
  description: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'Overdue 30d+' | 'Overdue 15d+' | 'Overdue <15d' | 'Pending Due' | 'Paid';
  daysOverdue: number;
}

export interface RenewalSchedule {
  id: string;
  studentName: string;
  parentName: string;
  currentTerm: string;
  targetTier: string;
  renewalDate: string;
  amount: number;
  likelihood: 'High' | 'Medium' | 'At Risk';
  mentorAssigned: string;
}

export interface FunnelStageData {
  id: string;
  stageNumber: number;
  name: string;
  count: number;
  denominatorName: string;
  stepConversionRate: number; // % relative to previous stage
  dropOffCount: number;
  dropOffRate: number; // % dropped off from previous stage
  overallConversionRate: number; // % from initial Lead stage
  channelBreakdown: {
    metaAds: number;
    googleSearch: number;
    schoolWorkshops: number;
    referrals: number;
    organicContent: number;
  };
  stageDescription: string;
  optimizationNote: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: 'Meta Ads' | 'Google Search' | 'LinkedIn' | 'YouTube' | 'School Partner Workshop';
  status: 'Active' | 'Under Review' | 'Paused';
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number; // %
  frequency: number; // Flag if >= 3.0
  frequencyFlagged: boolean;
  landingPageVisits: number;
  landingPageDropOffPercent: number; // %
  qualifiedLeads: number;
  costPerQualifiedLead: number; // CPQL = Spend / Qualified Leads
  trialSignups: number;
  fullProgramSignups: number;
  totalConversions: number;
  roas: number;
  investigationSignal: string;
  signalSeverity: 'normal' | 'review' | 'alert';
}

export interface GrowthInsight {
  id: string;
  category: 'Funnel' | 'Marketing' | 'Receivables' | 'Revenue';
  title: string;
  metric: string;
  observedValue: string;
  relevantComparison: string;
  recommendedInvestigation: string;
  causationCaution: string;
  severity: 'high' | 'medium' | 'info';
}

export interface RevenueMonthlyTrend {
  month: string;
  target: number;
  programRevenue: number;
  workshopRevenue: number;
  totalRevenue: number;
  achievementRate: number;
}
