import { Lendsqr } from "../src/main";
import { DirectDebit } from "../src/resources";
import {
  CancelMandateResponse,
  CancelMandateType,
  CreateMandatePaylod,
  CreateMandateResponse,
  DebitMandateResponse,
  DebitType,
  Frequency,
  GetAllBanksResponse,
  GetAllMandateTransactionResponse,
  GetBankDetailsResponse,
  CheckMandateAccountBalanceResponse,
  GetMandateDetailsResponse,
  GetMandateSummaryResponse,
  GetMandateTransactionDetailsResponse,
  GetMandateTranscationStatsResponse,
  MandateStatus,
  MandateType,
  MandateTypes,
  VerifyAccountNumberPayload,
  VerifyAccountNumberResponse,
} from "../src/interfaces";

describe("Direct-Debit", () => {
  let directDebit: DirectDebit;
  let mockLendsqrClient: Lendsqr;

  const mockRequest = jest.fn();

  beforeEach(() => {
    directDebit = new DirectDebit(mockLendsqrClient);
    directDebit.request = mockRequest;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of banks able to provide direct debit authorization", async () => {
    const mockLimit = 100;
    const mockPageNumber = 1;
    const mockSortDir = "ASC";

    const mockParams = {
      limit: mockLimit,
      page: mockPageNumber,
      sort_dir: mockSortDir,
    };

    const mockGetBanksResponse: GetAllBanksResponse = {
      status: "success",
      message: "success",
      data: {
        data: [
          {
            id: 1,
            name: "Access Bank",
            bank_code: "044",
            institution_code: "000014",
            url: "https://lendstack-s3.s3.us-east-2.amazonaws.com/bank_logos/044.png",
            activation_amount: "50.00",
            meta: '{"mandate-activation-amount":50,"mandate-activation-bank":"Paystack-Titan","mandate-activation-account-number":"9880218357"}',
          },
          {
            id: 7,
            name: "Ecobank Nigeria",
            bank_code: "050",
            institution_code: "000010",
            url: "https://lendstack-s3.s3.us-east-2.amazonaws.com/bank_logos/050.png",
            activation_amount: "50.00",
            meta: '{"mandate-activation-amount":50,"mandate-activation-bank":"Paystack-Titan","mandate-activation-account-number":"9880218357"}',
          },
          {
            id: 11,
            name: "Fidelity Bank",
            bank_code: "070",
            institution_code: "000007",
            url: "https://lendstack-s3.s3.us-east-2.amazonaws.com/bank_logos/070.png",
            activation_amount: "50.00",
            meta: '{"mandate-activation-amount":50,"mandate-activation-bank":"Paystack-Titan","mandate-activation-account-number":"9880218357"}',
          },
        ],
        meta: {
          records: 3,
          page: "1",
          pages: 1,
          page_size: "100",
        },
      },
      meta: {
        cost: 1,
        balance: 1010,
      },
    };

    mockRequest.mockResolvedValue(mockGetBanksResponse);

    const result = await directDebit.getAllBanks(
      mockLimit,
      mockPageNumber,
      mockSortDir
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/direct-debit/banks`,
      mockParams
    );
    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetBanksResponse);
  });

  it("should fetch the detail of the specified bank", async () => {
    const bankId = 2;

    const mockBankDetailsResponse: GetBankDetailsResponse = {
      status: "success",
      message: "success",
      data: {
        id: 1,
        name: "Access Bank",
        bank_code: "044",
        institution_code: "000014",
        url: "https://lendstack-s3.s3.us-east-2.amazonaws.com/bank_logos/044.png",
        activation_amount: "50.00",
        meta: '{"mandate-activation-amount":50,"mandate-activation-bank":"Paystack-Titan","mandate-activation-account-number":"9880218357"}',
      },
      meta: {
        cost: 1,
        balance: 1010,
      },
    };

    mockRequest.mockResolvedValue(mockBankDetailsResponse);

    const result = await directDebit.getBankDetails(bankId);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/direct-debit/banks/${bankId}`
    );
    expect(result.status).toBe("success");
    expect(result).toEqual(mockBankDetailsResponse);
  });

  it("should verify the details of the details of the account", async () => {
    const mockPayload: VerifyAccountNumberPayload = {
      account_number: "234567891",
      bank_code: "10739",
    };

    const mockVerifyAccountResponse: VerifyAccountNumberResponse = {
      status: "success",
      message: "Account number verified successfully.",
      data: {
        account_name: "John Doe",
        bvn: "234567891",
        session_id: "abcd1234efgh5678ijkl",
      },
      meta: {
        cost: 5,
        balance: 1000,
      },
    };

    mockRequest.mockResolvedValue(mockVerifyAccountResponse);

    const result = await directDebit.verifyAccountNumber(mockPayload);

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/direct-debit/banks/account-lookup`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockVerifyAccountResponse);
  });

  it("should create mandate on customer's account", async () => {
    const mockPayload: CreateMandatePaylod = {
      account_number: "0123456789",
      phone_number: "08123456789",
      debit_type: DebitType.All,
      frequency: Frequency.Daily,
      bank_code: "057",
      bank_id: 2,
      email: "email@example.com",
      number_of_payments: 6,
      payment_start_date: "2023-11-01",
      start_date: "2023-11-01",
      end_date: "2023-12-30",
      narration: "Rand",
      address: "Ikate",
      invite: true,
      amount: 500,
      type: MandateTypes.Emandate,
      file_base64: "SGVsbG8gV29ybGQ=",
    };

    const mockCreateMandateResponse: CreateMandateResponse = {
      status: MandateStatus.Success,
      message: "Mandate created successfully",
      data: {
        id: 55,
        session_id: "999999230712125043396550293089",
        reference_number: "RC1153578/1234/999999999",
        account_number: "0123456789",
        account_name: "ADO JOHN SULE",
        frequency: Frequency.Daily,
        bvn: "",
        phone_number: "08123456789",
        email: "email@example.com",
        start_date: "2023-10-31T23:00:00.000Z",
        end_date: "2023-12-29T23:00:00.000Z",
        narration: "Rand",
        address: "Ikate",
        minimum_amount: "0.00",
        amount: "500.00",
        status: MandateStatus.Initiated,
        schedule: 0,
        type: MandateTypes.Emandate,
        NIBSS_workflow_status: null,
        NIBSS_workflow_status_description: null,
        debit_type: DebitType.All,
        invite: true,
        created_on: "2023-10-27T08:51:38.000Z",
        activation_instruction:
          "This emandate is currently in initiated status. To activate, kindly send a N50.00 from the account on which the mandate is set up to undefined at undefined Bank. The activation must be done within 24 hours of set up.",
        schedules: [],
      },
      meta: {
        balance: 1010,
      },
    };

    mockRequest.mockResolvedValue(mockCreateMandateResponse);

    const result = await directDebit.createMandate(mockPayload);

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/direct-debit/mandates`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockCreateMandateResponse);
  });

  it("should fetch information about all mandates", async () => {
    const mockLimit = 10;
    const mockPageNumber = 1;
    const mockParams = {
      limit: mockLimit,
      page: mockPageNumber,
    };
    const mockGetAllMandateResponse: GetMandateDetailsResponse = {
      status: "success",
      message: "success",
      data: {
        data: [
          {
            id: 10,
            session_id: "999999231016152258600000000000",
            reference_number: "RC00000/1507/000000000000",
            account_number: "2150000090",
            account_name: "TEST ACCOUNT",
            frequency: "daily",
            bvn: "22000000076",
            phone_number: "08130050033",
            email: "email@example.com",
            start_date: "2023-10-31T23:00:00.000Z",
            end_date: "2023-12-29T23:00:00.000Z",
            narration: "Rand",
            address: "Ikate",
            minimum_amount: "0.00",
            amount: "500.00",
            status: "initiated",
            schedule: 0,
            type: "manual",
            NIBSS_workflow_status: null,
            NIBSS_workflow_status_description: null,
            debit_type: "all",
            created_on: "2023-10-16 14:22:59",
            schedules: [],
            bank: {
              id: 42,
              name: "Zenith Bank",
              bank_code: "057",
              institution_code: "000015",
              url: "https://lendstack-s3.s3.us-east-2.amazonaws.com/bank_logos/057.png",
              meta: {
                "mandate-activation-amount": 50,
                "mandate-activation-bank": "Paystack-Titan",
                "mandate-activation-account-number": "9880218357",
              },
            },
            beneficiary: {
              id: 2,
              account_number: "54000000000",
              account_name: "DD OPERATIONS",
              bvn: ".",
              last_transaction_date: null,
              status: "active",
              created_on: "2023-09-22 15:29:32",
              bank: {
                id: 24,
                name: "Providus Bank",
                bank_code: "101",
                institution_code: "000023",
                url: "https://lendstack-s3.s3.us-east-2.amazonaws.com/bank_logos/101.png",
              },
            },
            activation_instruction:
              "This mandate is currently in initiated status. To activate, the bank direct debit officers need to log into the NIBSS CMMS platform to authorize or approve. The customer may also call their bank account manager for more details.",
          },
        ],
        meta: {
          records: 1,
          page: "1",
          pages: 1,
          page_size: "10",
        },
      },
      meta: {
        cost: 1,
        balance: 1010,
      },
    };

    mockRequest.mockResolvedValue(mockGetAllMandateResponse);

    const result = await directDebit.getAllMandates(mockLimit, mockPageNumber);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/direct-debit/mandates`,
      mockParams
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetAllMandateResponse);
  });

  it("should fetch information about a specific mandate", async () => {
    const mockReferenceNumber = "RC00000/1507/000000000000";
    const mockParams = {
      reference_number: mockReferenceNumber,
    };
    const mockGetMandateDetailsResponse: GetMandateDetailsResponse = {
      status: "success",
      message: "Mandate details retrieved successfully.",
      data: {
        data: [
          {
            id: 1,
            session_id: "ABC123SESSIONID",
            reference_number: "REF123456789",
            account_number: "0123456789",
            account_name: "John Doe",
            frequency: "monthly",
            bvn: "12345678901",
            phone_number: "08012345678",
            email: "johndoe@example.com",
            start_date: "2023-11-01",
            end_date: "2024-11-01",
            narration: "Mandate for loan repayment",
            address: "123, Street Name, City, Country",
            minimum_amount: "1000",
            amount: "5000",
            status: "active",
            schedule: 1,
            type: "emandate",
            NIBSS_workflow_status: null,
            NIBSS_workflow_status_description: null,
            debit_type: "all",
            created_on: "2023-10-01T08:00:00Z",
            schedules: [],
            bank: {
              id: 1,
              name: "First Bank",
              bank_code: "011",
              institution_code: "123456",
              url: "https://firstbank.com",
              meta: {
                "mandate-activation-amount": 1000,
                "mandate-activation-bank": "First Bank",
                "mandate-activation-account-number": "0123456789",
              },
            },
            beneficiary: {
              id: 1,
              account_number: "0123456789",
              account_name: "Jane Doe",
              bvn: "09876543210",
              last_transaction_date: null,
              status: "active",
              created_on: "2023-10-01T08:00:00Z",
              bank: {
                id: 2,
                name: "GTBank",
                bank_code: "058",
                institution_code: "654321",
                url: "https://gtbank.com",
                meta: {
                  "mandate-activation-amount": 2000,
                  "mandate-activation-bank": "GTBank",
                  "mandate-activation-account-number": "0987654321",
                },
              },
            },
            activation_instruction: "Auto-debit for loan repayment",
          },
        ],
        meta: {
          records: 1,
          page: "1",
          pages: 1,
          page_size: "10",
        },
      },
      meta: {
        cost: 10,
        balance: 1000,
      },
    };

    mockRequest.mockResolvedValue(mockGetMandateDetailsResponse);

    const result = await directDebit.getMandateDetails(mockReferenceNumber);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/direct-debit/mandates`,
      mockParams
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetMandateDetailsResponse);
  });

  it("should get the summary of a mandate", async () => {
    const mockSummaryMandateResponse: GetMandateSummaryResponse = {
      status: "success",
      message: "Mandate summary retrieved successfully.",
      data: [
        {
          status: "active",
          count: 120,
        },
        {
          status: "inactive",
          count: 30,
        },
        {
          status: "pending",
          count: 45,
        },
        {
          status: "cancelled",
          count: 10,
        },
        {
          status: "failed",
          count: 5,
        },
      ],
      meta: {
        cost: 5,
        balance: 100,
      },
    };

    mockRequest.mockResolvedValue(mockSummaryMandateResponse);
    const result = await directDebit.getMandateSummary();

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/direct-debit/mandates/stats`
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockSummaryMandateResponse);
  });

  it("should cancel / update the status of a mandate", async () => {
    const mockReferenceNumber = "RC00000/1507/000000000000";
    const mockType: CancelMandateType = {
      type: MandateType.Deactivate,
    };
    const mockParams = {
      type: mockType,
    };
    const mockPayload = {
      reference_number: mockReferenceNumber,
    };
    const mockCancelMandateResponse: CancelMandateResponse = {
      status: "success",
      message: "Mandate cancelled successfully.",
      meta: {
        balance: 9500,
      },
    };

    mockRequest.mockResolvedValue(mockCancelMandateResponse);
    const result = await directDebit.cancelMandate(
      mockType,
      mockReferenceNumber
    );
    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/direct-debit/mandates/cancel`,
      mockParams,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockCancelMandateResponse);
  });

  it("should perform a debit on customer account based off the mandate", async () => {
    const mockReferenceNumber = "RC00000/1507/000000000000";
    const mockAmount = 5000;
    const mockPayload = {
      reference_number: mockReferenceNumber,
      amount: mockAmount,
    };

    const mockDebitMandateResponse: DebitMandateResponse = {
      status: "success",
      message: "Mandate debited successfully.",
      data: {
        status: "completed",
        amount: "5000",
        reference: "ABC123456789",
      },
      meta: {
        balance: 4500,
      },
    };

    mockRequest.mockResolvedValue(mockDebitMandateResponse);
    const result = await directDebit.debitMandate(
      mockReferenceNumber,
      mockAmount
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/direct-debit/mandates/debit`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockDebitMandateResponse);
  });

  it("should get mandate account balance", async () => {
    const mockReferenceNumber = "RC00000/1507/000000000000";
    const mockPayload = {
      reference_number: mockReferenceNumber,
    };

    const mockMandateBalanceResponse: CheckMandateAccountBalanceResponse = {
      status: "success",
      message: "Balance retrieved successfully",
      data: {
        balance: 1000.5,
      },
      meta: {
        balance: 1000.5,
      },
    };

    mockRequest.mockResolvedValue(mockMandateBalanceResponse);
    const result = await directDebit.checkMandateAccountBalance(
      mockReferenceNumber
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/direct-debit/banks/balance-lookup`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockMandateBalanceResponse);
  });

  it("should get all mandate transactions", async () => {
    const mockLimit = 10;
    const mockPageNumber = 1;

    const mockParams = {
      limit: mockLimit,
      page: mockPageNumber,
    };

    const mockGetAllMandateTransactionResponse: GetAllMandateTransactionResponse =
      {
        status: "success",
        message: "success",
        data: {
          data: [
            {
              id: 15,
              amount: "500",
              mandate_id: 7,
              mandate_account_name: "vee Test",
              mandate_account_number: "1780004070",
              mandate_bvn: "22222222222",
              reference: "DD-cU26qsOsdGCSGn",
              narration: "Direct Debit Transfer",
              session_id: "999999230920215225299534241477",
              status: "successful",
              created_on: "2023-05-11 07:07:01",
              mandate_bank: {
                name: "Test Bank 1",
                bank_code: "998",
                institution_code: "999998",
                url: null,
              },
              mandate: {
                reference_number: "RC1145578/1599/000000000",
              },
            },
            {
              id: 14,
              amount: "500",
              mandate_id: 7,
              mandate_account_name: "vee Test",
              mandate_account_number: "1780004070",
              mandate_bvn: "22222222222",
              reference: "DD-cU26qsO05mGCSGn",
              narration: "Direct Debit Transfer",
              session_id: "999999230920215225299534241477",
              status: "successful",
              created_on: "2023-05-11 07:07:01",
              mandate_bank: {
                name: "Test Bank 1",
                bank_code: "998",
                institution_code: "999998",
                url: null,
              },
              mandate: {
                reference_number: "RC1145578/1599/000000000",
              },
            },
            {
              id: 13,
              amount: "500",
              mandate_id: 7,
              mandate_account_name: "vee Test",
              mandate_account_number: "1780004070",
              mandate_bvn: "22222222222",
              reference: "DD-cU26qsdmGCSgGn",
              narration: "Direct Debit Transfer",
              session_id: "999999230920215225299534241477",
              status: "successful",
              created_on: "2023-05-11 07:07:01",
              mandate_bank: {
                name: "Test Bank 1",
                bank_code: "998",
                institution_code: "999998",
                url: null,
              },
              mandate: {
                reference_number: "RC1145578/1599/000000000",
              },
            },
          ],
          meta: {
            records: 15,
            page: "1",
            pages: 2,
            page_size: "10",
          },
        },
        meta: {
          cost: 1,
          balance: 1010,
        },
      };

    mockRequest.mockResolvedValue(mockGetAllMandateTransactionResponse);
    const result = await directDebit.getAllMandateTransactions(
      mockLimit,
      mockPageNumber
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/direct-debit/transactions`,
      mockParams
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetAllMandateTransactionResponse);
  });

  it("should get a specific mandate transaction detail", async () => {
    const mockReferenceNumber = "RC00000/1507/000000000000";

    const mockParams = {
      reference: mockReferenceNumber,
    };

    const mockGetMandateTransactionDetailsResponse: GetMandateTransactionDetailsResponse =
      {
        status: "success",
        message: "success",
        data: {
          data: [
            {
              id: 15,
              amount: "500",
              mandate_id: 7,
              mandate_account_name: "vee Test",
              mandate_account_number: "1780004070",
              mandate_bvn: "22222222222",
              reference: "DD-cU26qsOsdGCSGn",
              narration: "Direct Debit Transfer",
              session_id: "999999230920215225299534241477",
              status: "successful",
              created_on: "2023-05-11 07:07:01",
              mandate_bank: {
                name: "Test Bank 1",
                bank_code: "998",
                institution_code: "999998",
                url: null,
              },
              mandate: {
                reference_number: "RC1145578/1599/000000000",
              },
            },
          ],
          meta: {
            records: 15,
            page: "1",
            pages: 2,
            page_size: "10",
          },
        },
        meta: {
          cost: 1,
          balance: 1010,
        },
      };

    mockRequest.mockResolvedValue(mockGetMandateTransactionDetailsResponse);
    const result = await directDebit.getMandateTransactionDetails(
      mockReferenceNumber
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/direct-debit/transactions`,
      mockParams
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetMandateTransactionDetailsResponse);
  });

  it("should get the status of the transaction", async () => {
    const mockGetMandateTransactionStat: GetMandateTranscationStatsResponse = {
      status: "success",
      message: "Transaction statistics retrieved successfully",
      data: {
        transactions: [
          {
            status: "successful",
            count: 10,
            sum: "5000",
          },
          {
            status: "pending",
            count: 5,
            sum: "2500",
          },
          {
            status: "failed",
            count: 2,
            sum: "1000",
          },
        ],
      },
      meta: {
        cost: 1,
        balance: 1000,
      },
    };

    mockRequest.mockResolvedValue(mockGetMandateTransactionStat);
    const result = await directDebit.getMandateTransactionStats();

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/direct-debit/transactions/stats`
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetMandateTransactionStat);
  });
});
