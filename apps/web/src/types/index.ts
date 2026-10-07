/** SKILLORA shared frontend types */

export type UserRole =
  | "founder"
  | "owner"
  | "admin"
  | "finance"
  | "hr"
  | "operations"
  | "manager"
  | "analyst"
  | "employee";

export interface User {
  id: string;
  email: string;
  full_name: string;
  roles: UserRole[];
}

export interface Organization {
  id: string;
  name: string;
  industry?: string;
  stage?: "idea" | "validation" | "early" | "growth" | "scale";
  team_size?: string;
  created_at: string;
  member_count: number;
}

export interface BusinessProfile {
  company_name: string;
  industry: string;
  products_services: string;
  target_customers: string;
  value_proposition: string;
  business_model: string;
  competitors: string[];
  locations: string[];
  team_size: string;
  growth_goals: string[];
  stage: string;
}

export interface BusinessHealthScore {
  overall: number; // 0-100
  finance: number;
  operations: number;
  sales: number;
  workforce: number;
  compliance: number;
  explanation: string;
  last_updated: string;
}

export interface AIInsight {
  id: string;
  observation: string;
  evidence: string;
  interpretation: string;
  recommended_action: string;
  confidence: "low" | "medium" | "high";
  limitation?: string;
  created_at: string;
}

export interface KPI {
  id: string;
  name: string;
  current_value: number;
  target_value?: number;
  unit: string;
  trend: "up" | "down" | "flat";
  owner?: string;
  frequency: "daily" | "weekly" | "monthly";
}

export type EntrepreneurStage =
  | "idea"
  | "validate"
  | "plan"
  | "build"
  | "operate"
  | "measure"
  | "optimize"
  | "scale";
