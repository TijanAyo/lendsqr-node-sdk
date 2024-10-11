interface Karma {
  required: boolean;
  sequence: number;
  continue_on_failure: boolean;
  pre_offer: boolean;
}

interface Ecosystem {
  required: boolean;
  sequence: number;
  continue_on_failure: boolean;
  pre_offer: boolean;
}

interface CreditBureau {
  required: boolean;
  sequence: number;
  continue_on_failure: boolean;
  pre_offer?: boolean;
}

interface DecisionSetting {
  karma: Karma;
  ecosystem?: Ecosystem;
  credit_bureau: CreditBureau;
}

interface Rule {
  "*": (number | { var: string[] })[];
}

interface OfferSetting {
  rule: Rule;
  maximum: number;
  minimum: number;
}

interface DataItem {
  id: number;
  product_id: number | null;
  org_id: number;
  version_id: number;
  country: string;
  name: string;
  description: string;
  decision_setting: DecisionSetting;
  offer_setting: OfferSetting[];
  status: string;
  created_on: string;
}

export interface GetDecisionModelResponse {
  status: string;
  message: string;
  data: DataItem[];
}

interface Data {
  id: number;
  product_id: number | null;
  org_id: number;
  version_id: number;
  country: string;
  name: string;
  description: string;
  decision_setting: DecisionSetting;
  offer_setting: OfferSetting[];
  status: string;
  created_on: string;
  settings: any[];
}

export interface GetDecisionModelDetails {
  status: string;
  message: string;
  data: Data;
}

export interface OraculiBorrowerPayload {
  gender: string;
  marital_status: string;
  age: string;
  location: string;
  no_of_dependent: string;
  type_of_residence: string;
  educational_attainment: string;
  employment_status: string;
  sector_of_employment: string;
  monthly_net_income: string;
  employer_category: string;
  bvn: string;
  phone_number: string;
  total_years_of_experience: number;
  time_with_current_employer: number;
  previous_lendsqr_loans: number;
  phone: string;
  bvn_phone: string;
  office_email: string;
  personal_email: string;
  amount: number;
}

interface CreditScoreItem {
  score_name: string;
  score_value: string | number | null;
  weight: string;
  maximum_score: number;
  borrower_score: number;
  weighted_score: number;
}

interface CreditScoreData {
  credit_score_items: CreditScoreItem[];
  total_weight: number;
  score: number;
  offers: any[];
}

export interface OraculiBorrowerScoringResponse {
  status: string;
  message: string;
  data: CreditScoreData;
  meta: {
    cost: number;
    balance: number;
  };
}
