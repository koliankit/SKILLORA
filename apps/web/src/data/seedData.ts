export interface OrganizationData {
  id: string;
  name: string;
  legal_name: string;
  cin: string;
  founded_year: number;
  industry: string;
  sub_industry: string;
  stage: string;
  team_size: number;
  hq_location: string;
  secondary_office: string;
  founders: { name: string; role: string; email: string }[];
  business_model: string;
  target_customers: string;
  value_proposition: string;
  website: string;
  currency: string;
  display_currency: string;
  created_at: string;
}

export interface HealthScoreData {
  overall: number;
  grade: string;
  finance: number;
  operations: number;
  sales: number;
  workforce: number;
  compliance: number;
  last_assessed: string;
  trend: string;
  methodology: string;
}

export interface FinancialsData {
  summary: {
    annual_recurring_revenue: number;
    monthly_recurring_revenue: number;
    mrr_growth_rate_pct: number;
    cash_balance: number;
    monthly_gross_burn: number;
    monthly_net_burn: number;
    runway_months: number;
    gross_margin_pct: number;
    lifetime_value: number;
    customer_acquisition_cost: number;
    ltv_cac_ratio: number;
  };
  revenue_breakdown: { category: string; amount_monthly: number; share_pct: number }[];
  monthly_financials_2025_2026: {
    month: string;
    revenue: number;
    expenses: number;
    net_profit: number;
    burn: number;
  }[];
  expense_categories: { category: string; amount: number; percentage: number }[];
  scenario_models: {
    name: string;
    mrr_year_end: number;
    runway_months: number;
    profitability_status: string;
    risk_level: string;
  }[];
}

export interface KPIItem {
  id: string;
  name: string;
  category: string;
  current_value: number;
  target_value: number;
  unit: string;
  trend: "up" | "down" | "flat";
  change_pct: number;
  owner: string;
  frequency: string;
  status: "on_track" | "exceeded" | "at_risk";
}

export interface WorkflowItem {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  status: "active" | "paused" | "draft";
  runs_this_month: number;
  success_rate: number;
}

export interface ProcessStage {
  stage: string;
  lead_time: string;
  owner: string;
  bottleneck_risk: string;
  automation_level: string;
}

export interface EmployeeItem {
  id: string;
  name: string;
  role: string;
  department: string;
  skills: string[];
  status: "Active" | "On Leave" | "Contractor";
  join_date: string;
  location: string;
}

export interface ComplianceItem {
  id: string;
  name: string;
  category: string;
  due_date: string;
  owner: string;
  status: string;
  criticality: "Critical" | "High" | "Medium" | "Low";
  evidence_ref: string;
}

export interface AuditLogItem {
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  ip_address: string;
  status: "SUCCESS" | "WARNING" | "FAILED";
}

export interface AIInsightItem {
  id: string;
  category: string;
  observation: string;
  evidence: string;
  interpretation: string;
  recommended_action: string;
  confidence: "low" | "medium" | "high";
  limitation?: string;
  created_at: string;
}

export const initialOrganization: OrganizationData = {
  id: "org_skillora_001",
  name: "AeroSync Dynamics Pvt Ltd",
  legal_name: "AeroSync Dynamics Technologies Private Limited",
  cin: "U72900KA2024PTC184920",
  founded_year: 2024,
  industry: "Enterprise Robotics & AI Infrastructure",
  sub_industry: "Autonomous Fleet Telemetry & Edge AI",
  stage: "growth",
  team_size: 28,
  hq_location: "Bengaluru, Karnataka, India",
  secondary_office: "Hyderabad, Telangana, India",
  founders: [
    { name: "Ankit Sharma", role: "Founder & Chief Executive Officer", email: "ankit@aerosync.ai" },
    { name: "Dr. Ramesh Nair", role: "Co-Founder & Chief Technology Officer", email: "ramesh@aerosync.ai" }
  ],
  business_model: "Hybrid B2B SaaS + Edge Hardware Gateway Leases",
  target_customers: "Autonomous drone operators, industrial inspection firms, mining logistics, and smart warehouse enterprises",
  value_proposition: "Unified AI operating system for enterprise autonomous robotics fleets with real-time telemetry processing, predictive health diagnostics, and zero human intervention mission routing.",
  website: "https://aerosync.ai",
  currency: "INR",
  display_currency: "USD / INR",
  created_at: "2024-03-15T09:30:00Z"
};

export const initialHealthScore: HealthScoreData = {
  overall: 84,
  grade: "A- (Robust)",
  finance: 81,
  operations: 89,
  sales: 78,
  workforce: 88,
  compliance: 85,
  last_assessed: "2026-09-12T18:00:00Z",
  trend: "+4.2% from last month",
  methodology: "Weighted multi-variate assessment: Financial Runway (25%), Fleet Ops Reliability (25%), Pipeline Conversion (20%), Workforce Retention & Skill Coverage (15%), Statutory Compliance (15%)."
};

export const initialFinancials: FinancialsData = {
  summary: {
    annual_recurring_revenue: 1420800,
    monthly_recurring_revenue: 118400,
    mrr_growth_rate_pct: 11.8,
    cash_balance: 1240000,
    monthly_gross_burn: 112000,
    monthly_net_burn: 48200,
    runway_months: 25.7,
    gross_margin_pct: 74.2,
    lifetime_value: 78000,
    customer_acquisition_cost: 11200,
    ltv_cac_ratio: 6.96
  },
  revenue_breakdown: [
    { category: "Enterprise Cloud SaaS", amount_monthly: 80500, share_pct: 68 },
    { category: "Edge AI Gateway Hardware Lease", amount_monthly: 26048, share_pct: 22 },
    { category: "Custom AI Model Integration", amount_monthly: 11852, share_pct: 10 }
  ],
  monthly_financials_2025_2026: [
    { month: "Oct 2025", revenue: 72400, expenses: 89000, net_profit: -16600, burn: 16600 },
    { month: "Nov 2025", revenue: 76800, expenses: 91200, net_profit: -14400, burn: 14400 },
    { month: "Dec 2025", revenue: 81500, expenses: 94000, net_profit: -12500, burn: 12500 },
    { month: "Jan 2026", revenue: 87200, expenses: 97800, net_profit: -10600, burn: 10600 },
    { month: "Feb 2026", revenue: 92100, expenses: 99500, net_profit: -7400, burn: 7400 },
    { month: "Mar 2026", revenue: 96800, expenses: 102000, net_profit: -5200, burn: 5200 },
    { month: "Apr 2026", revenue: 101400, expenses: 104500, net_profit: -3100, burn: 3100 },
    { month: "May 2026", revenue: 105800, expenses: 106200, net_profit: -400, burn: 400 },
    { month: "Jun 2026", revenue: 109200, expenses: 108400, net_profit: 800, burn: -800 },
    { month: "Jul 2026", revenue: 112600, expenses: 110100, net_profit: 2500, burn: -2500 },
    { month: "Aug 2026", revenue: 115900, expenses: 111300, net_profit: 4600, burn: -4600 },
    { month: "Sep 2026", revenue: 118400, expenses: 112000, net_profit: 6400, burn: -6400 }
  ],
  expense_categories: [
    { category: "R&D & Engineering Payroll", amount: 62500, percentage: 55.8 },
    { category: "Cloud & GPU Infrastructure (AWS/GCP)", amount: 21300, percentage: 19.0 },
    { category: "Sales & Enterprise Marketing", amount: 12800, percentage: 11.4 },
    { category: "Operations, Logistics & Facilities", amount: 9600, percentage: 8.6 },
    { category: "Legal, Compliance & Audit", amount: 5800, percentage: 5.2 }
  ],
  scenario_models: [
    {
      name: "Base Plan (Current Trajectory)",
      mrr_year_end: 178000,
      runway_months: 25.7,
      profitability_status: "Cashflow positive by Q1 2027",
      risk_level: "Low"
    },
    {
      name: "Aggressive Hiring (Add 6 AI Engineers)",
      mrr_year_end: 215000,
      runway_months: 16.2,
      profitability_status: "Requires Series A closing by month 12",
      risk_level: "Medium"
    },
    {
      name: "Cloud Optimization & Price Increase (+15%)",
      mrr_year_end: 204000,
      runway_months: 34.0,
      profitability_status: "Cashflow positive immediately",
      risk_level: "Very Low"
    }
  ]
};

export const initialKPIs: KPIItem[] = [
  {
    id: "kpi_mrr",
    name: "Monthly Recurring Revenue (MRR)",
    category: "Finance",
    current_value: 118400,
    target_value: 135000,
    unit: "$",
    trend: "up",
    change_pct: 11.8,
    owner: "Ankit Sharma (CEO)",
    frequency: "monthly",
    status: "on_track"
  },
  {
    id: "kpi_fleet_sla",
    name: "Mission Telemetry SLA Uptime",
    category: "Operations",
    current_value: 99.88,
    target_value: 99.50,
    unit: "%",
    trend: "up",
    change_pct: 0.12,
    owner: "Ops Command",
    frequency: "daily",
    status: "exceeded"
  },
  {
    id: "kpi_edge_latency",
    name: "Edge Inference & Sync Latency",
    category: "Engineering",
    current_value: 34.2,
    target_value: 45.0,
    unit: "ms",
    trend: "up",
    change_pct: -8.5,
    owner: "Dr. Ramesh Nair (CTO)",
    frequency: "weekly",
    status: "exceeded"
  },
  {
    id: "kpi_gross_margin",
    name: "Gross Profit Margin",
    category: "Finance",
    current_value: 74.2,
    target_value: 78.0,
    unit: "%",
    trend: "up",
    change_pct: 2.4,
    owner: "Finance Team",
    frequency: "monthly",
    status: "on_track"
  },
  {
    id: "kpi_churn",
    name: "Monthly Customer Churn",
    category: "Sales",
    current_value: 0.72,
    target_value: 1.20,
    unit: "%",
    trend: "up",
    change_pct: -0.15,
    owner: "Customer Success",
    frequency: "monthly",
    status: "exceeded"
  },
  {
    id: "kpi_burn",
    name: "Monthly Gross Burn",
    category: "Finance",
    current_value: 112000,
    target_value: 120000,
    unit: "$",
    trend: "flat",
    change_pct: 1.2,
    owner: "Finance Lead",
    frequency: "monthly",
    status: "on_track"
  }
];

export const initialWorkflows: WorkflowItem[] = [
  {
    id: "wf_001",
    name: "Statutory Drone Flight Clearance & Telemetry Ingestion",
    trigger: "New flight mission plan uploaded via API",
    condition: "Airspace classification verified via DGCA DigitalSky check",
    action: "Dispatch edge cryptographic tokens & start real-time anomaly monitoring",
    status: "active",
    runs_this_month: 1842,
    success_rate: 99.9
  },
  {
    id: "wf_002",
    name: "Tier-1 Anomaly Incident Auto-Escalation",
    trigger: "Edge sync heartbeat latency > 120ms for > 15s",
    condition: "Severity >= P1 (Mission In-Flight)",
    action: "Trigger failover satellite telemetry & page on-call SRE lead via Slack/SMS",
    status: "active",
    runs_this_month: 7,
    success_rate: 100
  },
  {
    id: "wf_003",
    name: "Bi-Weekly Vendor Invoice Approval & Reconciliation",
    trigger: "Invoice received over $5,000",
    condition: "Within budget & verified against Goods Received Note (GRN)",
    action: "Request dual sign-off (Dept Head + Finance) and route to ERP",
    status: "active",
    runs_this_month: 44,
    success_rate: 97.7
  },
  {
    id: "wf_004",
    name: "Enterprise RBAC Provisioning & Key Rotation",
    trigger: "Employee onboarded or 90-day timer elapsed",
    condition: "Organization audit flag enabled",
    action: "Generate zero-trust KMS keys and notify IT Security",
    status: "active",
    runs_this_month: 18,
    success_rate: 100
  }
];

export const initialProcesses: ProcessStage[] = [
  {
    stage: "1. Enterprise Lead Qualification",
    lead_time: "2 Days",
    owner: "Sales Team",
    bottleneck_risk: "Low",
    automation_level: "80%"
  },
  {
    stage: "2. Security & Compliance Review",
    lead_time: "5 Days",
    owner: "Legal & InfoSec",
    bottleneck_risk: "Medium (SOC2 questionnaire review)",
    automation_level: "55%"
  },
  {
    stage: "3. Edge Gateway Deployment",
    lead_time: "4 Days",
    owner: "Hardware Operations",
    bottleneck_risk: "Low",
    automation_level: "40%"
  },
  {
    stage: "4. API Onboarding & Fleet Sync",
    lead_time: "1 Day",
    owner: "Solutions Engineering",
    bottleneck_risk: "Low",
    automation_level: "95%"
  }
];

export const initialEmployees: EmployeeItem[] = [
  {
    id: "emp_001",
    name: "Ankit Sharma",
    role: "Founder & Chief Executive Officer",
    department: "Executive Leadership",
    skills: ["Enterprise Strategy", "Product Vision", "Fundraising", "B2B Sales"],
    status: "Active",
    join_date: "2024-03-15",
    location: "Bengaluru"
  },
  {
    id: "emp_002",
    name: "Dr. Ramesh Nair",
    role: "Co-Founder & Chief Technology Officer",
    department: "AI & Robotics Engineering",
    skills: ["ROS2", "Computer Vision", "Edge AI", "Distributed Systems", "C++"],
    status: "Active",
    join_date: "2024-03-15",
    location: "Bengaluru"
  },
  {
    id: "emp_003",
    name: "Pooja Deshmukh",
    role: "VP of Engineering",
    department: "Cloud & Platform Infrastructure",
    skills: ["Kubernetes", "Next.js", "Python FastAPI", "PostgreSQL", "Kafka"],
    status: "Active",
    join_date: "2024-06-01",
    location: "Hyderabad"
  },
  {
    id: "emp_004",
    name: "Vikram Sen",
    role: "Staff Robotics & Telemetry Engineer",
    department: "AI & Robotics Engineering",
    skills: ["ROS2", "Rust", "RTOS", "PX4 Autopilot", "CAN Bus"],
    status: "Active",
    join_date: "2024-08-15",
    location: "Bengaluru"
  },
  {
    id: "emp_005",
    name: "Sneha Iyer",
    role: "Head of Enterprise Compliance & Finance",
    department: "Finance, Legal & People",
    skills: ["SOC2 Type II", "ISO 27001", "ROC Filings", "Financial Modeling", "GST Audits"],
    status: "Active",
    join_date: "2024-09-01",
    location: "Bengaluru"
  },
  {
    id: "emp_006",
    name: "Aman Verma",
    role: "Senior Enterprise Sales Director",
    department: "Sales, Enterprise & Marketing",
    skills: ["Enterprise SaaS", "Contract Negotiation", "Government RFP", "Solution Architecture"],
    status: "Active",
    join_date: "2025-01-10",
    location: "Hyderabad"
  }
];

export const initialCompliance: {
  status: { score: number; completed: number; pending: number; overdue: number; next_deadline: string };
  items: ComplianceItem[];
  audit_trail: AuditLogItem[];
} = {
  status: {
    score: 85,
    completed: 14,
    pending: 2,
    overdue: 0,
    next_deadline: "2026-09-30 (ROC Annual Return Filing)"
  },
  items: [
    {
      id: "comp_001",
      name: "ROC Form AOC-4 & MGT-7 (Annual Return)",
      category: "Corporate Law (MCA)",
      due_date: "2026-09-30",
      owner: "Sneha Iyer (Compliance)",
      status: "In Progress (Drafted & Verified by CA)",
      criticality: "Critical",
      evidence_ref: "DOC-MCA-2026-09"
    },
    {
      id: "comp_002",
      name: "Monthly GSTR-3B & GSTR-1 Reconciliation",
      category: "Taxation (GST)",
      due_date: "2026-09-20",
      owner: "Finance Team",
      status: "In Progress",
      criticality: "High",
      evidence_ref: "GSTN-29AABCA1234F1Z5"
    },
    {
      id: "comp_003",
      name: "Quarterly TDS Return (Form 26Q)",
      category: "Direct Tax",
      due_date: "2026-10-31",
      owner: "Finance Team",
      status: "Compliant",
      criticality: "Medium",
      evidence_ref: "ITD-TDS-Q1-ACK"
    },
    {
      id: "comp_004",
      name: "ISO/IEC 27001:2022 Surveillance Audit",
      category: "Information Security",
      due_date: "2026-11-15",
      owner: "Pooja Deshmukh (VP Eng)",
      status: "Compliant",
      criticality: "Critical",
      evidence_ref: "BSI-ISO27001-CERT-2025"
    },
    {
      id: "comp_005",
      name: "DGCA NPNT (No Permission, No Takeoff) Firmware Certification",
      category: "Civil Aviation (DGCA)",
      due_date: "2026-10-15",
      owner: "Vikram Sen (Robotics Lead)",
      status: "Compliant",
      criticality: "Critical",
      evidence_ref: "DGCA-DIGITALSKY-FIRMWARE-V3"
    }
  ],
  audit_trail: [
    {
      timestamp: "2026-09-12T17:42:10Z",
      actor: "ankit@aerosync.ai",
      role: "Founder / CEO",
      action: "Triggered AI Financial Scenario Model: Cloud Optimization",
      ip_address: "103.15.22.84",
      status: "SUCCESS"
    },
    {
      timestamp: "2026-09-12T14:15:33Z",
      actor: "sneha@aerosync.ai",
      role: "Head of Compliance",
      action: "Uploaded draft Board Resolution for ROC Filing AOC-4",
      ip_address: "49.207.180.11",
      status: "SUCCESS"
    },
    {
      timestamp: "2026-09-12T11:05:02Z",
      actor: "system_workflow_engine",
      role: "Autonomous Service Worker",
      action: "Executed Workflow WF-001 (Flight Clearance Tokens generated: 142 missions)",
      ip_address: "10.0.4.19",
      status: "SUCCESS"
    },
    {
      timestamp: "2026-09-11T19:30:00Z",
      actor: "ramesh@aerosync.ai",
      role: "Co-Founder / CTO",
      action: "Updated Edge Inference KPI baseline from 38ms to 34.2ms",
      ip_address: "103.15.22.85",
      status: "SUCCESS"
    }
  ]
};

export const initialInsights: AIInsightItem[] = [
  {
    id: "ins_001",
    category: "Finance & Cloud",
    observation: "Cloud GPU infrastructure costs grew 14% MoM while active fleet hours grew 31%.",
    evidence: "Ledger AWS/GCP bills + Fleet Telemetry Logs (3,400 flight hours in Aug vs 4,450 in Sep)",
    interpretation: "Batch inference amortization is beginning to show positive unit economics, but idle spot instance timeouts remain unoptimized during night shifts (01:00 - 06:00 IST).",
    recommended_action: "Enable dynamic auto-scaling sleep thresholds for non-mission edge replica pods; modeled to save $3,200/month.",
    confidence: "high",
    limitation: "Assumes current telemetry stream compression ratio stays constant at 8.4:1.",
    created_at: "2026-09-12T16:30:00Z"
  },
  {
    id: "ins_002",
    category: "Sales & Pipeline",
    observation: "Enterprise sales cycle shortened from 42 days to 28 days for clients using the pre-configured DGCA compliance sandbox.",
    evidence: "CRM Pipeline records for last 6 signed enterprise accounts",
    interpretation: "Regulatory compliance validation is the primary trust bottleneck during enterprise pilot evaluation.",
    recommended_action: "Surface one-click DigitalSky audit report generation directly within client sandbox dashboards.",
    confidence: "high",
    limitation: "Sample size limited to 6 closed-won deals in Q2-Q3.",
    created_at: "2026-09-11T12:15:00Z"
  },
  {
    id: "ins_003",
    category: "Workforce & R&D",
    observation: "Critical dependency identified on single engineer for PX4 autopilot CAN-bus firmware stack.",
    evidence: "Git commit telemetry & PR reviews (91% of firmware commits by Vikram Sen)",
    interpretation: "Key-person risk for hardware avionics layer during upcoming Q4 mass deployment.",
    recommended_action: "Pair Vikram Sen with junior robotics engineer and document architecture specs in internal knowledge base.",
    confidence: "medium",
    limitation: "Does not account for external contractor capabilities if engaged.",
    created_at: "2026-09-10T09:00:00Z"
  },
  {
    id: "ins_004",
    category: "Statutory Compliance",
    observation: "ROC Annual Filing (AOC-4 & MGT-7) due date is in 18 days.",
    evidence: "MCA Compliance Calendar & uploaded auditor draft resolution",
    interpretation: "CA verification complete; awaiting final digital signature (DSC) of board directors.",
    recommended_action: "Schedule board resolution sign-off by 2026-09-18 to ensure zero penalty filing.",
    confidence: "high",
    limitation: "Subject to MCA portal server uptime and DSC token validity.",
    created_at: "2026-09-12T08:00:00Z"
  }
];

export interface RiskItem {
  id: string;
  risk: string;
  category: "Technical" | "Financial" | "Regulatory" | "Market" | "People";
  probability: "High" | "Medium" | "Low";
  impact: "High" | "Medium" | "Low";
  owner: string;
  mitigation: string;
  status: "Mitigated" | "Active" | "Monitoring";
}

export interface OpportunityItem {
  id: string;
  opportunity: string;
  category: "Partnership" | "Product Expansion" | "Cost Reduction" | "Enterprise Contract";
  potential_value: string;
  probability: "High" | "Medium" | "Low";
  owner: string;
  next_step: string;
  status: "Evaluating" | "In Negotiation" | "Signed";
}

export interface DocumentRecord {
  id: string;
  title: string;
  category: "Invoices" | "Contracts" | "Compliance Evidence" | "Board Resolutions";
  file_name: string;
  date: string;
  size: string;
  status: "Audited" | "Pending Sign-off" | "Archived";
  ocr_extracted_data?: Record<string, any>;
}

export interface SOPItem {
  id: string;
  code: string;
  title: string;
  department: string;
  last_updated: string;
  steps: string[];
}

export const initialRisks: RiskItem[] = [
  {
    id: "risk_01",
    risk: "Single-point engineer dependency on PX4 telemetry & CAN-bus firmware",
    category: "People",
    probability: "High",
    impact: "High",
    owner: "Dr. Ramesh Nair (CTO)",
    mitigation: "Pair senior firmware engineer with junior apprentice; document architecture specs.",
    status: "Active"
  },
  {
    id: "risk_02",
    risk: "Unanticipated peak GPU spot instance preemptions during live mission telemetry",
    category: "Technical",
    probability: "Low",
    impact: "High",
    owner: "Pooja Deshmukh (VP Eng)",
    mitigation: "Deploy multi-region failover pool with automatic fallback to reserved cloud instances.",
    status: "Mitigated"
  },
  {
    id: "risk_03",
    risk: "DGCA DigitalSky API downtime delaying automated flight clearance tokens",
    category: "Regulatory",
    probability: "Medium",
    impact: "Medium",
    owner: "Vikram Sen",
    mitigation: "Pre-cache approved flight routes 24 hours in advance with local digital signatures.",
    status: "Monitoring"
  }
];

export const initialOpportunities: OpportunityItem[] = [
  {
    id: "opp_01",
    opportunity: "Tata Advanced Systems Defense Drone Fleet Telemetry Integration",
    category: "Enterprise Contract",
    potential_value: "$240,000 ARR",
    probability: "High",
    owner: "Aman Verma (Sales)",
    next_step: "Finalize master service agreement & NDA review",
    status: "In Negotiation"
  },
  {
    id: "opp_02",
    opportunity: "OEM Hardware Bundling Partnership with IdeaForge & Throttle",
    category: "Partnership",
    potential_value: "$180,000 / yr",
    probability: "Medium",
    owner: "Ankit Sharma (CEO)",
    next_step: "Schedule joint engineering prototype demo in Bengaluru",
    status: "Evaluating"
  },
  {
    id: "opp_03",
    opportunity: "GPU Spot Instance Auto-scaling Policy",
    category: "Cost Reduction",
    potential_value: "$38,400 Annual Savings",
    probability: "High",
    owner: "Cloud Team",
    next_step: "Deploy staging terraform plan with 90s warm-up buffer",
    status: "Signed"
  }
];

export const initialDocuments: DocumentRecord[] = [
  {
    id: "doc_01",
    title: "Master Enterprise SLA Agreement — Tata Advanced Systems",
    category: "Contracts",
    file_name: "TASL_AeroSync_MSA_v2.pdf",
    date: "2026-09-08",
    size: "2.4 MB",
    status: "Pending Sign-off",
    ocr_extracted_data: { contract_value: "$240,000 ARR", term: "24 Months", sla: "99.8% Uptime" }
  },
  {
    id: "doc_02",
    title: "Audited Financial Statements & Board Resolution for Form AOC-4",
    category: "Board Resolutions",
    file_name: "MCA_AOC4_Audited_2026.pdf",
    date: "2026-09-10",
    size: "1.8 MB",
    status: "Audited",
    ocr_extracted_data: { net_revenue: "$1,420,800", auditor: "S.K. Kapoor & Co." }
  },
  {
    id: "doc_03",
    title: "ISO/IEC 27001:2022 Surveillance Certificate",
    category: "Compliance Evidence",
    file_name: "ISO27001_Surveillance_Cert.pdf",
    date: "2026-08-20",
    size: "840 KB",
    status: "Audited",
    ocr_extracted_data: { cert_body: "BSI Group", standard: "ISO/IEC 27001:2022" }
  },
  {
    id: "doc_04",
    title: "AWS Cloud & GPU Enterprise Invoice — August 2026",
    category: "Invoices",
    file_name: "AWS_Invoice_984129.pdf",
    date: "2026-09-02",
    size: "310 KB",
    status: "Audited",
    ocr_extracted_data: { total: "$21,300 USD", due_date: "2026-09-25", service: "EC2 GPU Spot + S3" }
  }
];

export const initialSOPs: SOPItem[] = [
  {
    id: "sop_01",
    code: "SOP-ENG-001",
    title: "Autonomous Fleet Pre-Flight Telemetry & Airspace Verification",
    department: "Operations",
    last_updated: "2026-09-01",
    steps: [
      "Verify DGCA DigitalSky airspace boundary via automated API token.",
      "Execute CAN-bus onboard sensor calibration (IMU drift < 0.02 deg/s).",
      "Check dual LTE / Satellite uplink ping latency (must be < 40ms).",
      "Validate emergency geofence boundaries and return-to-launch (RTL) safe point."
    ]
  },
  {
    id: "sop_02",
    code: "SOP-SEC-002",
    title: "P1 Incident Escalation & Satellite Telemetry Failover",
    department: "Engineering & SRE",
    last_updated: "2026-08-15",
    steps: [
      "Detect unacknowledged telemetry packet sequence > 15 seconds.",
      "Switch edge telemetry stream automatically to secondary Iridium satellite transceiver.",
      "Page Lead SRE on-call engineer via PagerDuty / Slack channel #incident-p1.",
      "Document root-cause post-mortem within 24 hours of mission landing."
    ]
  },
  {
    id: "sop_03",
    code: "SOP-FIN-003",
    title: "Enterprise Vendor PO Dual Approval Protocol",
    department: "Finance",
    last_updated: "2026-07-20",
    steps: [
      "Invoices under $5,000 require Department Head approval.",
      "Invoices $5,000 - $25,000 require Department Head + Head of Finance sign-off.",
      "Invoices > $25,000 require CEO dual digital signature.",
      "Verify against physical Goods Received Note (GRN) prior to initiating wire transfer."
    ]
  }
];

