interface LoanProduct {
  product_id: string;
  name: string;
  description: string | null;
  disburse_to: string;
  collection_method: string;
  interest_rate: number;
  interest_period: string | null;
  min_amount: number;
  max_amount: number;
  min_interest_amount: number | null;
  allow_multi_tenor: number;
  frequency: string | null;
  min_tenor_value: number | null;
  min_tenor_period: string | null;
  max_tenor_value: number | null;
  max_tenor_period: string | null;
  require_guarantor: number;
  require_loan_offer: number;
}

export interface GetLoanProductsResponse {
  status: string;
  message: string;
  data: LoanProduct[];
}

export interface InitializeLoanPayload {
  product_id: string;
  meta: {
    email: string;
    phone_number: string;
  };
}

export interface InitializeLoanResponse {
  status: string;
  message: string;
  data: {
    reference: string;
    url: string;
  };
}

interface LoanDetails {
  customer_type: string;
  tenor: number;
  tenor_period: string;
  status: LoanStatus;
  user: UserDetails;
  interest_rate: number;
  interest_period: string;
  reference: string;
  loan_amount: number;
  interest_due: number;
  amount_disbursed: number | null;
  paid: number;
  reject_reason: string | null;
  channel: string;
  disburse_to: string;
  multi_tenor: boolean;
  payment_link_hash: string;
}

interface LoanStatus {
  status: string;
  can_request: number;
  can_cancel: number;
}

interface UserDetails {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  photo_url: string;
  referral_code: string;
}

export interface GetLoanDetailsResponse {
  status: string;
  message: string;
  data: LoanDetails;
}

export interface InitializePaymentPayload {
  amount: number;
  description: string;
  callback_url: string;
  organization_id?: string;
}

export interface InitializePaymentResponse {
  status: string;
  message: string;
  data: {
    reference: string;
    url: string;
  };
}

interface PaymentDetails {
  id: number;
  org_id: number;
  distributor_id: number;
  transaction_id: string | null;
  reference: string;
  amount: number;
  description: string;
  callback_url: string | null;
  created_on: string;
  created_by: string | null;
  modified_on: string | null;
  modified_by: string | null;
  deleted_flag: number;
  deleted_on: string | null;
  deleted_by: string | null;
}

export interface QueryPaymentResponse {
  status: string;
  message: string;
  data: PaymentDetails;
}
