export interface MatchCustomerBVNImageResponse {
  status: string;
  message: string;
  data: {
    match: boolean;
    similarity: number;
  };
  meta: {
    cost: number;
    balance: number;
  };
}

export interface VerifyCustomerBankAccountResponse {
  status: string;
  message: string;
  data: {
    bank_code: string;
    account_name: string;
    account_number: string;
    bvn: string;
  };
  meta: {
    cost: number;
    balance: number;
  };
}

interface KarmaCheckData {
  karma_identity: string;
  amount_in_contention: string;
  reason: string | null;
  default_date: string; // Date should be a string in ISO format
  karma_type: {
    karma: string;
  };
  karma_identity_type: {
    identity_type: string;
  };
  reporting_entity: {
    name: string;
    email: string;
  };
}

export interface CheckCustomerKarmaResponse {
  status: string;
  message: string;
  data: KarmaCheckData;
  meta: {
    cost: number;
    balance: number;
  };
}

interface CustomerData {
  bvn: string;
  first_name: string;
  last_name: string;
  bvn_phone_number: string;
  date_of_birth: string; // ISO date string
  age: number;
  unique_phone_numbers: number;
  phone_number: string;
  unique_emails: number;
  email: string;
  gender: string;
  lenders: number;
  first_account: string; // ISO date string
  last_account: string; // ISO date string
  failed_selfie_bvn_check: number;
  lending_lenders: number;
  loans: number;
  loan_amount: number;
  loan_amount_minimum: number;
  loan_amount_maximum: number;
  loan_amount_average: number;
  settled_loans: number;
  settled_loan_amount: number;
  settled_loan_amount_paid: number;
  running_loans: number;
  running_loan_amount: number;
  past_due_loans: number;
  past_due_loan_amount: number;
  past_due_loan_amount_due: number;
  penalty: number;
  penalty_paid: number;
  delayed_paid_loans: number;
  delayed_paid_loan_amount: number;
  delayed_paid_loans_trials: number;
  delayed_paid_loans_avg: number;
  delayed_paid_loans_trials_max: number;
  delayed_paid_loans_trials_min: number;
  first_loan_date: string; // ISO date string
  last_loan_date: string; // ISO date string
  loan_requests: number;
  failed_loan_requests: number;
  logins: number;
  first_login: string; // ISO date string
  last_login: string; // ISO date string
  unique_login_ips: number;
  unique_device_ids: number;
  distinct_mobile_os: number;
  duplicated_devices: number;
  shared_device_users: number;
  credit_delinquency: number;
  processed_on: string; // ISO date string
}

export interface CheckCustomerInEcosystemResponse {
  status: string;
  message: string;
  data: CustomerData;
  meta: {
    cost: number;
    balance: number;
  };
}

interface NINVerificationData {
  nin: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  formatted_dob: string;
  mobile2: string;
  mobile: string;
  registration_date: string;
  email: string;
  gender: string;
  marital_status: string;
  state_of_residence: string;
  base64Image: string;
  image_url: string;
}

export interface VerifyCustomerNINResponse {
  status: string;
  message: string;
  data: NINVerificationData;
  meta: {
    cost: number;
    balance: number;
  };
}

export interface InitializeBVNConsentResponse {
  status: string;
  message: string;
  data: string;
  meta: {
    cost: number;
    balance: number;
  };
}

interface CompleteConsentUserData {
  reference: number;
  bvn: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  dob: string;
  formatted_dob: string;
  mobile2: string | null;
  mobile: string;
  registration_date: string;
  enrollment_bank: string;
  enrollment_branch: string;
  email: string;
  gender: string;
  level_of_account: string | null;
  lga_of_origin: string;
  lga_of_residence: string;
  marital_status: string;
  nin: string | null;
  name_on_card: string;
  nationality: string | null;
  residential_address: string;
  state_of_origin: string;
  state_of_residence: string;
  watchlisted: number;
  base64Image: string | null;
  image_url: string;
}

export interface CompleteConsentAndGetBVNDetailsResponse {
  status: string;
  message: string;
  data: CompleteConsentUserData;
  meta: {
    cost: number;
    balance: number;
  };
}

export interface InitializeBVNAccountConsentResponse {
  status: string;
  message: string;
  data: string;
  meta: {
    cost: number;
    balance: number;
  };
}

interface CustomerAccount {
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
  account_status: number;
  account_designation: string;
  account_type: string;
}

export interface CompleteConsentAndGetBVNAccountDetailsResponse {
  status: string;
  message: string;
  data: CustomerAccount[]; // Array of Account objects
  meta: {
    cost: number;
    balance: number;
  };
}
