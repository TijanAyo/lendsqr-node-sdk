interface Identification {
  ruid: string;
  id_value: string;
  source_id: string;
  id_display_name: string;
}

interface ConsumerDetails {
  name: string;
  ruid: string;
  gender: string;
  last_name: string;
  first_name: string;
  citizenship: string;
  date_of_birth: string;
  identification: Identification;
}

interface CreditSummaryCRC {
  last_reported_date: string;
  has_creditfacilities: string;
  no_of_delinqcreditfacilities: string;
}

interface NanoConsumerProfile {
  consumer_details: ConsumerDetails;
}

interface CRCData {
  consdisclaimer: {
    getdisclaimercontent: {
      _x0031_: string;
    };
  };
  consumer_relation: string;
  last_checked_date: string;
  credit_nano_summary: {
    summary: CreditSummaryCRC;
  };
  mfcredit_nano_summary: {
    summary: CreditSummaryCRC;
  };
  mgcredit_nano_summary: {
    summary: {
      has_creditfacilities: string;
      no_of_delinqcreditfacilities: string;
    };
  };
  nano_consumer_profile: NanoConsumerProfile;
}

export interface GetCreditReportFromCRC {
  status: string;
  message: string;
  data: CRCData;
  meta: {
    cost: number;
    balance: number;
  };
}

interface Subject {
  Reference: string;
  ConsumerID: string;
  SearchOutput: string;
}

interface PersonalDetails {
  Gender: string;
  Header: string;
  Surname: string;
  BirthDate: string;
  FirstName: string;
  OtheridNo: string;
  CellularNo: string;
  ConsumerID: string;
  Dependants: string;
  OtherNames: string;
  PassportNo: string | null;
  PencomIDNo: string;
  Nationality: string;
  ReferenceNo: string | null;
  EmailAddress: string;
  NationalIDNo: string;
  MaritalStatus: string | null;
  EmployerDetail: string | null;
  PostalAddress1: string;
  PostalAddress2: string;
  PostalAddress3: string;
  PostalAddress4: string;
  HomeTelephoneNo: string;
  WorkTelephoneNo: string;
  DriversLicenseNo: string | null;
  PropertyOwnedType: string;
  BankVerificationNo: string;
  ResidentialAddress1: string;
  ResidentialAddress2: string;
  ResidentialAddress3: string;
  ResidentialAddress4: string;
}

interface CreditSummaryFirstCental {
  NumberofAccountsInBadStanding: string;
  TotalNumberOfAccountsReported: string;
  NumberOfAccountsInGoodStanding: string;
}

interface PerformanceClassification {
  NoOfLoansLost: string;
  NoOfLoansDoubtful: string;
  NoOfLoansPerforming: string;
  NoOfLoansSubstandard: string;
}

interface EnquiryDetail {
  ProductID: string;
  MatchingRate: string;
  SubscriberEnquiryEngineID: string;
  SubscriberEnquiryResultID: string;
}

interface FirstCentralData {
  SubjectList?: Subject[];
  PersonalDetailsSummary?: PersonalDetails[];
  CreditSummary?: CreditSummaryFirstCental[];
  PerformanceClassification?: PerformanceClassification[];
  EnquiryDetails?: EnquiryDetail[];
}

export interface GetCreditReportFromFirstCentral {
  status: string;
  message: string;
  data: FirstCentralData[];
  meta: {
    cost: number;
    balance: number;
  };
}
