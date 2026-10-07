import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  initialOrganization,
  initialHealthScore,
  initialFinancials,
  initialKPIs,
  initialWorkflows,
  initialProcesses,
  initialEmployees,
  initialCompliance,
  initialInsights,
  OrganizationData,
  HealthScoreData,
  FinancialsData,
  KPIItem,
  WorkflowItem,
  ProcessStage,
  EmployeeItem,
  ComplianceItem,
  AuditLogItem,
  RiskItem,
  OpportunityItem,
  DocumentRecord,
  SOPItem,
  AIInsightItem,
  initialRisks,
  initialOpportunities,
  initialDocuments,
  initialSOPs
} from "@/data/seedData";

interface BusinessState {
  organization: OrganizationData;
  healthScore: HealthScoreData;
  financials: FinancialsData;
  kpis: KPIItem[];
  workflows: WorkflowItem[];
  processes: ProcessStage[];
  employees: EmployeeItem[];
  complianceItems: ComplianceItem[];
  auditTrail: AuditLogItem[];
  insights: AIInsightItem[];
  risks: RiskItem[];
  opportunities: OpportunityItem[];
  documents: DocumentRecord[];
  sops: SOPItem[];

  // Actions
  addTransaction: (tx: { month: string; revenue: number; expenses: number }) => void;
  addKPI: (kpi: Omit<KPIItem, "id">) => void;
  addWorkflow: (wf: Omit<WorkflowItem, "id" | "runs_this_month" | "success_rate">) => void;
  addEmployee: (emp: Omit<EmployeeItem, "id" | "join_date">) => void;
  addComplianceItem: (item: Omit<ComplianceItem, "id">) => void;
  addAuditLog: (action: string, actor?: string, role?: string) => void;
  addInsight: (insight: Omit<AIInsightItem, "id" | "created_at">) => void;
  addDocument: (doc: Omit<DocumentRecord, "id" | "date">) => void;
  addRisk: (risk: Omit<RiskItem, "id">) => void;
  addOpportunity: (opp: Omit<OpportunityItem, "id">) => void;
  runScenario: (scenarioType: "hiring" | "cloud_opt" | "custom", customParams?: any) => void;
  resetToSeedData: () => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      organization: initialOrganization,
      healthScore: initialHealthScore,
      financials: initialFinancials,
      kpis: initialKPIs,
      workflows: initialWorkflows,
      processes: initialProcesses,
      employees: initialEmployees,
      complianceItems: initialCompliance.items,
      auditTrail: initialCompliance.audit_trail,
      insights: initialInsights,
      risks: initialRisks,
      opportunities: initialOpportunities,
      documents: initialDocuments,
      sops: initialSOPs,

      addTransaction: (tx) => {
        const currentFinancials = get().financials;
        const netProfit = tx.revenue - tx.expenses;
        const burn = netProfit < 0 ? Math.abs(netProfit) : 0;
        const newMonthly = [
          ...currentFinancials.monthly_financials_2025_2026,
          {
            month: tx.month,
            revenue: tx.revenue,
            expenses: tx.expenses,
            net_profit: netProfit,
            burn: burn
          }
        ];

        // Update MRR and ARR
        const updatedMRR = tx.revenue;
        const updatedARR = updatedMRR * 12;

        set({
          financials: {
            ...currentFinancials,
            summary: {
              ...currentFinancials.summary,
              monthly_recurring_revenue: updatedMRR,
              annual_recurring_revenue: updatedARR
            },
            monthly_financials_2025_2026: newMonthly
          }
        });

        get().addAuditLog(`Inserted new financial entry for ${tx.month}: Revenue $${tx.revenue}, Expenses $${tx.expenses}`);
      },

      addKPI: (kpiData) => {
        const newKPI: KPIItem = {
          ...kpiData,
          id: `kpi_${Date.now()}`
        };
        set({ kpis: [newKPI, ...get().kpis] });
        get().addAuditLog(`Created new business KPI: ${kpiData.name} (Target: ${kpiData.target_value} ${kpiData.unit})`);
      },

      addWorkflow: (wfData) => {
        const newWorkflow: WorkflowItem = {
          ...wfData,
          id: `wf_${Date.now()}`,
          runs_this_month: 0,
          success_rate: 100
        };
        set({ workflows: [newWorkflow, ...get().workflows] });
        get().addAuditLog(`Configured new automated workflow: ${wfData.name}`);
      },

      addEmployee: (empData) => {
        const newEmp: EmployeeItem = {
          ...empData,
          id: `emp_${Date.now()}`,
          join_date: new Date().toISOString().split("T")[0]
        };
        set({
          employees: [newEmp, ...get().employees],
          organization: {
            ...get().organization,
            team_size: get().organization.team_size + 1
          }
        });
        get().addAuditLog(`Onboarded new team member: ${empData.name} (${empData.role})`);
      },

      addComplianceItem: (itemData) => {
        const newItem: ComplianceItem = {
          ...itemData,
          id: `comp_${Date.now()}`
        };
        set({ complianceItems: [newItem, ...get().complianceItems] });
        get().addAuditLog(`Added regulatory compliance track: ${itemData.name} (Due: ${itemData.due_date})`);
      },

      addAuditLog: (action, actor = "ankit@aerosync.ai", role = "Founder / CEO") => {
        const newLog: AuditLogItem = {
          timestamp: new Date().toISOString(),
          actor,
          role,
          action,
          ip_address: "127.0.0.1 (Local Session)",
          status: "SUCCESS"
        };
        set({ auditTrail: [newLog, ...get().auditTrail.slice(0, 40)] });
      },

      addInsight: (insightData) => {
        const newInsight: AIInsightItem = {
          ...insightData,
          id: `ins_${Date.now()}`,
          created_at: new Date().toISOString()
        };
        set({ insights: [newInsight, ...get().insights] });
      },

      runScenario: (scenarioType, customParams) => {
        const currentFin = get().financials;
        if (scenarioType === "hiring") {
          // Add 5 engineers: expenses + $35,000/mo, ARR projection + $400k
          get().addAuditLog("Simulated AI Scenario: Hiring 5 Senior Robotics & AI Engineers");
          get().addInsight({
            category: "Scenario Simulation",
            observation: "Modeled impact of hiring 5 Senior Robotics & AI Engineers.",
            evidence: "Scenario Engine: +$35,000/mo payroll vs +$400,000 ARR capacity expansion.",
            interpretation: "Shortens runway from 25.7 months to 17.8 months unless enterprise contract conversion accelerates within 4 months.",
            recommended_action: "Stage hiring in cohorts of 2 engineers aligned with signed POC deliverables.",
            confidence: "high"
          });
        } else if (scenarioType === "cloud_opt") {
          get().addAuditLog("Simulated AI Scenario: GPU Cloud Optimization & Spot Instances");
          get().addInsight({
            category: "Scenario Simulation",
            observation: "Modeled impact of spot GPU instance pooling and telemetry compression.",
            evidence: "Scenario Engine: -18% compute expenditure.",
            interpretation: "Increases gross margin from 74.2% to 78.6% and extends cash runway by +4.6 months.",
            recommended_action: "Deploy dynamic spot instance pooling script in staging environment.",
            confidence: "high"
          });
        }
      },

      addDocument: (docData) => {
        const newDoc: DocumentRecord = {
          ...docData,
          id: `doc_${Date.now()}`,
          date: new Date().toISOString().split("T")[0]
        };
        set({ documents: [newDoc, ...get().documents] });
        get().addAuditLog(`Uploaded enterprise document: ${docData.title}`);
      },

      addRisk: (riskData) => {
        const newRisk: RiskItem = {
          ...riskData,
          id: `risk_${Date.now()}`
        };
        set({ risks: [newRisk, ...get().risks] });
        get().addAuditLog(`Logged operational risk: ${riskData.risk}`);
      },

      addOpportunity: (oppData) => {
        const newOpp: OpportunityItem = {
          ...oppData,
          id: `opp_${Date.now()}`
        };
        set({ opportunities: [newOpp, ...get().opportunities] });
        get().addAuditLog(`Registered growth opportunity: ${oppData.opportunity}`);
      },

      resetToSeedData: () => {
        set({
          organization: initialOrganization,
          healthScore: initialHealthScore,
          financials: initialFinancials,
          kpis: initialKPIs,
          workflows: initialWorkflows,
          processes: initialProcesses,
          employees: initialEmployees,
          complianceItems: initialCompliance.items,
          auditTrail: initialCompliance.audit_trail,
          insights: initialInsights,
          risks: initialRisks,
          opportunities: initialOpportunities,
          documents: initialDocuments,
          sops: initialSOPs
        });
        get().addAuditLog("Database reset to full enterprise seed state (AeroSync Dynamics)");
      }
    }),
    {
      name: "skillora_business_store"
    }
  )
);
