import { Lendsqr } from "../src/main";
import { Validation } from "../src/resources";
import {
  CheckCustomerInEcosystemResponse,
  CheckCustomerKarmaResponse,
  CompleteConsentAndGetBVNAccountDetailsResponse,
  CompleteConsentAndGetBVNDetailsResponse,
  InitializeBVNAccountConsentResponse,
  InitializeBVNConsentResponse,
  MatchCustomerBVNImageResponse,
  VerifyCustomerBankAccountResponse,
  VerifyCustomerNINResponse,
} from "../src/interfaces";

describe("Validation", () => {
  let validation: Validation;
  let mockLendsqrClient: Lendsqr;

  const mockRequest = jest.fn();

  beforeEach(() => {
    validation = new Validation(mockLendsqrClient);
    validation.request = mockRequest;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should match customer BVN image", async () => {
    const mockBVN = "1234567890";
    const mockImageURL =
      "https://documents.lendsqr.com/irorun/45eab612ad3efff8f3da1e65130be";

    const mockPayload = {
      image: mockImageURL,
    };

    const mockMatchBVNImageResponse: MatchCustomerBVNImageResponse = {
      status: "success",
      message: "BVN image match completed successfully.",
      data: {
        match: true,
        similarity: 95.3,
      },
      meta: {
        cost: 10,
        balance: 90,
      },
    };

    mockRequest.mockReturnValue(mockMatchBVNImageResponse);
    const result = await validation.matchCustomerBVNImage(
      mockBVN,
      mockImageURL
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/verification/bvn/${mockBVN}/selfies`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockMatchBVNImageResponse);
  });

  it("should verify customer bank account", async () => {
    const mockAccountNumber = "0123456789";
    const mockBankCode = "011";
    const mockPayload = {
      account_number: mockAccountNumber,
      bank_code: mockBankCode,
    };
    const mockVerifyCustomerAccoutResponse: VerifyCustomerBankAccountResponse =
      {
        status: "success",
        message: "Bank account verification successful.",
        data: {
          bank_code: "011",
          account_name: "John Doe",
          account_number: "1234567890",
          bvn: "12345678901",
        },
        meta: {
          cost: 15,
          balance: 85,
        },
      };

    mockRequest.mockReturnValue(mockVerifyCustomerAccoutResponse);
    const result = await validation.verifyCustomerBankAccount(
      mockAccountNumber,
      mockBankCode
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/verification/bankaccount`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockVerifyCustomerAccoutResponse);
  });

  it("should check customer karma", async () => {
    const mockIdentity = "johndoe@email.com";
    const mockCheckKarmaResponse: CheckCustomerKarmaResponse = {
      status: "success",
      message: "Karma check completed successfully.",
      data: {
        karma_identity: "1234567890",
        amount_in_contention: "5000.00",
        reason: "Loan default",
        default_date: "2023-06-15T00:00:00Z",
        karma_type: {
          karma: "financial",
        },
        karma_identity_type: {
          identity_type: "BVN",
        },
        reporting_entity: {
          name: "ABC Lending",
          email: "support@abclending.com",
        },
      },
      meta: {
        cost: 20,
        balance: 80,
      },
    };

    mockRequest.mockReturnValue(mockCheckKarmaResponse);
    const result = await validation.checkCustomerKarma(mockIdentity);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/verification/karma/${mockIdentity}`
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockCheckKarmaResponse);
  });

  it("should check if customer exists in lendsqr ecosystem", async () => {
    const mockBVN = "0123456789";
    const mockCheckCustomerInEcosystemResponse: CheckCustomerInEcosystemResponse =
      {
        status: "success",
        message: "Customer data retrieved successfully.",
        data: {
          bvn: "12345678901",
          first_name: "John",
          last_name: "Doe",
          bvn_phone_number: "+2348012345678",
          date_of_birth: "1985-10-15",
          age: 39,
          unique_phone_numbers: 2,
          phone_number: "+2348012345679",
          unique_emails: 1,
          email: "john.doe@example.com",
          gender: "Male",
          lenders: 3,
          first_account: "2005-03-01",
          last_account: "2024-01-15",
          failed_selfie_bvn_check: 0,
          lending_lenders: 2,
          loans: 5,
          loan_amount: 500000,
          loan_amount_minimum: 10000,
          loan_amount_maximum: 200000,
          loan_amount_average: 100000,
          settled_loans: 4,
          settled_loan_amount: 400000,
          settled_loan_amount_paid: 450000,
          running_loans: 1,
          running_loan_amount: 100000,
          past_due_loans: 0,
          past_due_loan_amount: 0,
          past_due_loan_amount_due: 0,
          penalty: 5000,
          penalty_paid: 5000,
          delayed_paid_loans: 1,
          delayed_paid_loan_amount: 10000,
          delayed_paid_loans_trials: 2,
          delayed_paid_loans_avg: 1.5,
          delayed_paid_loans_trials_max: 2,
          delayed_paid_loans_trials_min: 1,
          first_loan_date: "2010-06-20",
          last_loan_date: "2024-01-01",
          loan_requests: 7,
          failed_loan_requests: 2,
          logins: 25,
          first_login: "2020-01-15",
          last_login: "2024-10-20",
          unique_login_ips: 3,
          unique_device_ids: 2,
          distinct_mobile_os: 2,
          duplicated_devices: 1,
          shared_device_users: 0,
          credit_delinquency: 0,
          processed_on: "2024-10-23",
        },
        meta: {
          cost: 50,
          balance: 150,
        },
      };

    mockRequest.mockReturnValue(mockCheckCustomerInEcosystemResponse);
    const result = await validation.checkCustomerInEcosystem(mockBVN);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/verification/ecosystem/${mockBVN}`
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockCheckCustomerInEcosystemResponse);
  });

  it("should verify customer NIN", async () => {
    const mockNIN = "0123456789";
    const mockVerifyCustomerNINResponse: VerifyCustomerNINResponse = {
      status: "success",
      message: "NIN verification successful.",
      data: {
        nin: "12345678901",
        first_name: "Jane",
        middle_name: "Elizabeth",
        last_name: "Doe",
        dob: "1990-05-15",
        formatted_dob: "15 May 1990",
        mobile2: "+2348098765432",
        mobile: "+2348012345678",
        registration_date: "2010-08-20",
        email: "jane.doe@example.com",
        gender: "Female",
        marital_status: "Single",
        state_of_residence: "Lagos",
        base64Image: "/9j/4AAQSkZJRgABAQEAAAAAAAD/...",
        image_url: "https://example.com/images/jane_doe.png",
      },
      meta: {
        cost: 100,
        balance: 500,
      },
    };

    mockRequest.mockReturnValue(mockVerifyCustomerNINResponse);
    const result = await validation.verifyCustomerNIN(mockNIN);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/verification/nin/${mockNIN}`
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockVerifyCustomerNINResponse);
  });

  it("should initiate the process for getting consent to get customers BVN details", async () => {
    const mockBVN = "0123456789";
    const mockContact = "example@gmail.com";
    const mockPayload = {
      contact: mockContact,
    };

    const mockInitializeBVNConstentResponse: InitializeBVNConsentResponse = {
      status: "success",
      message: "BVN consent initialized successfully.",
      data: "https://example.com/consent_form/12345",
      meta: {
        cost: 50,
        balance: 450,
      },
    };

    mockRequest.mockReturnValue(mockInitializeBVNConstentResponse);
    const result = await validation.initializeBVNConsent(mockBVN, mockContact);

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/verification/bvn/${mockBVN}`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockInitializeBVNConstentResponse);
  });

  it("should get BVN data after customer has been approved", async () => {
    const mockBVN = "0123456789";
    const mockOTP = "097832";
    const mockPayload = {
      otp: mockOTP,
    };
    const completeConstentAndGetDetailsResponse: CompleteConsentAndGetBVNDetailsResponse =
      {
        status: "success",
        message: "BVN details retrieved successfully.",
        data: {
          reference: 123456789,
          bvn: "12345678901",
          first_name: "John",
          middle_name: "Doe",
          last_name: "Smith",
          dob: "1990-01-15",
          formatted_dob: "15th January 1990",
          mobile2: null,
          mobile: "08012345678",
          registration_date: "2015-05-10",
          enrollment_bank: "XYZ Bank",
          enrollment_branch: "Main Branch",
          email: "john.smith@example.com",
          gender: "Male",
          level_of_account: "Tier 3",
          lga_of_origin: "Ikeja",
          lga_of_residence: "Lekki",
          marital_status: "Single",
          nin: "98765432109",
          name_on_card: "John Smith",
          nationality: "Nigerian",
          residential_address: "123 Lekki Phase 1, Lagos, Nigeria",
          state_of_origin: "Lagos",
          state_of_residence: "Lagos",
          watchlisted: 0,
          base64Image: null,
          image_url: "https://example.com/images/john-smith.jpg",
        },
        meta: {
          cost: 100,
          balance: 900,
        },
      };

    mockRequest.mockReturnValue(completeConstentAndGetDetailsResponse);
    const result = await validation.completeConsentAndGetBVNDetails(
      mockBVN,
      mockOTP
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "PUT",
      `/verification/bvn/${mockBVN}`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(completeConstentAndGetDetailsResponse);
  });

  it("should initiate the process for consent to get accouts associated with customer", async () => {
    const mockBVN = "0123456789";
    const mockContact = "example@gmail.com";
    const mockPayload = {
      contact: mockContact,
    };

    const mockInitializeBVNAccountConstentResponse: InitializeBVNAccountConsentResponse =
      {
        status: "success",
        message: "BVN consent initialized successfully.",
        data: "https://example.com/consent_form/12345",
        meta: {
          cost: 50,
          balance: 450,
        },
      };

    mockRequest.mockReturnValue(mockInitializeBVNAccountConstentResponse);
    const result = await validation.initializeBVNAccountConsent(
      mockBVN,
      mockContact
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/verification/bvn/${mockBVN}/accounts`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockInitializeBVNAccountConstentResponse);
  });

  it("should get account / accountsd data once consent has been approved", async () => {
    const mockBVN = "0123456789";
    const mockOTP = "097832";
    const mockPayload = {
      otp: mockOTP,
    };
    const mockCompleteConsentAndGetAccountDetailsResponse: CompleteConsentAndGetBVNAccountDetailsResponse =
      {
        status: "success",
        message: "Customer account details retrieved successfully.",
        data: [
          {
            account_name: "John Smith",
            account_number: "0123456789",
            bank_name: "XYZ Bank",
            bank_code: "123",
            account_status: 1,
            account_designation: "Primary",
            account_type: "Savings",
          },
          {
            account_name: "John Smith",
            account_number: "9876543210",
            bank_name: "ABC Bank",
            bank_code: "456",
            account_status: 1,
            account_designation: "Secondary",
            account_type: "Current",
          },
        ],
        meta: {
          cost: 150,
          balance: 850,
        },
      };

    mockRequest.mockReturnValue(
      mockCompleteConsentAndGetAccountDetailsResponse
    );
    const result = await validation.completeConsentAndGetBVNAccountDetails(
      mockBVN,
      mockOTP
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "PUT",
      `/verification/bvn/${mockBVN}/accounts`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockCompleteConsentAndGetAccountDetailsResponse);
  });
});
