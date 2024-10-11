interface Bank {
  id: number;
  name: string;
  bank_code: string;
  institution_code: string;
  url: string;
  activation_amount: string;
  meta: string;
}

interface PaginationMeta {
  records: number;
  page: string;
  pages: number;
  page_size: string;
}

interface BankData {
  data: Bank[];
  meta: PaginationMeta;
}

interface Meta {
  cost: number;
  balance: number;
}

export interface GetAllBanksResponse {
  status: string;
  message: string;
  data: BankData;
  meta: Meta;
}

export interface GetBankDetailsResponse {
  status: string;
  message: string;
  data: Bank;
  meta: Meta;
}

export interface VerifyAccountNumberPayload {
  account_number: string;
  bank_code: string;
}

interface AccountData {
  account_name: string;
  bvn: string;
  session_id: string;
}

export interface VerifyAccountNumberResponse {
  status: string;
  message: string;
  data: AccountData;
  meta: Meta;
}

enum DebitType {
  All = "all",
  Partial = "partial",
}

enum Frequency {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

enum MandateType {
  Emandate = "emandate",
  Manual = "manual",
}

enum FileExtension {
  Pdf = "pdf",
  Png = "png",
}

enum MandateStatus {
  Success = "success",
  Initiated = "initiated",
}

enum MandateType {
  Activate = "activate",
  Deactivate = "deactivate",
}

export interface CreateMandatePaylod {
  account_number: string;
  phone_number: string;
  debit_type: DebitType;
  frequency: Frequency;
  bank_id: number;
  email: string;
  start_date: string;
  end_date: string;
  narration: string;
  address: string;
  amount: number;
  schedule?: boolean | number; // TODO: Get more information about this field (is it required or optional)
  type: MandateType;
  file_base64: string;
  file_extension?: FileExtension;
}

export interface CreateMandateResponse {
  status: MandateStatus;
  message: string;
  data: {
    id: number;
    session_id: string;
    reference_number: string;
    account_number: string;
    account_name: string;
    frequency: Frequency;
    bvn: string;
    phone_number: string;
    email: string;
    start_date: string;
    end_date: string;
    narration: string;
    address: string;
    minimum_amount: string;
    amount: string;
    status: MandateStatus;
    schedule: number;
    type: MandateType;
    NIBSS_workflow_status: string | null;
    NIBSS_workflow_status_description: string | null;
    debit_type: DebitType;
    invite: boolean;
    created_on: string;
    activation_instruction: string;
    schedules: any[];
  };
  meta: {
    balance: number;
  };
}

interface MandateBank {
  id: number;
  name: string;
  bank_code: string;
  institution_code: string;
  url: string;
  meta?: {
    "mandate-activation-amount": number;
    "mandate-activation-bank": string;
    "mandate-activation-account-number": string;
  };
}

interface Beneficiary {
  id: number;
  account_number: string;
  account_name: string;
  bvn: string;
  last_transaction_date: string | null;
  status: string;
  created_on: string;
  bank: MandateBank;
}

interface Mandate {
  id: number;
  session_id: string;
  reference_number: string;
  account_number: string;
  account_name: string;
  frequency: string;
  bvn: string;
  phone_number: string;
  email: string;
  start_date: string;
  end_date: string;
  narration: string;
  address: string;
  minimum_amount: string;
  amount: string;
  status: string;
  schedule: number;
  type: string;
  NIBSS_workflow_status: string | null;
  NIBSS_workflow_status_description: string | null;
  debit_type: string;
  created_on: string;
  schedules: any[];
  bank: MandateBank;
  beneficiary: Beneficiary;
  activation_instruction: string;
}

export interface GetMandateDetailsResponse {
  status: string;
  message: string;
  data: {
    data: Mandate[];
    meta: {
      records: number;
      page: number;
      pages: number;
      page_size: number;
    };
  };
  meta: Meta;
}

export interface GetMandateSummaryResponse {
  status: string;
  message: string;
  data: any[]; //TODO: Find out the types of this field
  meta: Meta;
}

export interface CancelMandateType {
  type: MandateType;
}

export interface CancelMandateResponse {
  status: string;
  message: string;
  meta: {
    balance: number;
  };
}

interface DebitData {
  status: string;
  amount: string;
  reference: string;
}

export interface DebitMandateResponse {
  status: string;
  message: string;
  data: DebitData;
  meta: {
    balance: number;
  };
}

export interface GetMandateAccountBalanceResponse {
  status: string;
  message: string;
  data: {
    balance: number;
  };
  meta: {
    balance: number;
  };
}
