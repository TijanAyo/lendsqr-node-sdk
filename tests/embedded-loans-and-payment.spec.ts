import { Lendsqr } from "../src/main";
import { EmbeddedLoansAndPayments } from "../src/resources";
import {
  GetLoanDetailsResponse,
  GetLoanProductsResponse,
  InitializeLoanPayload,
  InitializeLoanResponse,
  InitializePaymentPayload,
  InitializePaymentResponse,
  QueryPaymentResponse,
} from "../src/interfaces";

describe("EmbeddedLoansAndPayment", () => {
  let embeddedLoansAndPayment: EmbeddedLoansAndPayments;
  let mockLendsqrClient: Lendsqr;

  const mockRequest = jest.fn();

  beforeEach(() => {
    embeddedLoansAndPayment = new EmbeddedLoansAndPayments(mockLendsqrClient);
    embeddedLoansAndPayment.request = mockRequest;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all the loan products a distributor is subscribed to", async () => {
    const mockGetLoanProductsResponse: GetLoanProductsResponse = {
      status: "success",
      message: "Loan products retrieved successfully",
      data: [
        {
          product_id: "LP001",
          name: "Personal Loan",
          description: "A loan for personal expenses.",
          disburse_to: "bank_account",
          collection_method: "direct_debit",
          interest_rate: 12.5,
          interest_period: "annually",
          min_amount: 1000,
          max_amount: 50000,
          min_interest_amount: null,
          allow_multi_tenor: 1,
          frequency: "monthly",
          min_tenor_value: 6,
          min_tenor_period: "months",
          max_tenor_value: 24,
          max_tenor_period: "months",
          require_guarantor: 0,
          require_loan_offer: 1,
        },
        {
          product_id: "LP002",
          name: "Home Loan",
          description: "Loan for purchasing or renovating a home.",
          disburse_to: "escrow_account",
          collection_method: "postdated_checks",
          interest_rate: 8.0,
          interest_period: "annually",
          min_amount: 50000,
          max_amount: 500000,
          min_interest_amount: 4000,
          allow_multi_tenor: 0,
          frequency: "monthly",
          min_tenor_value: 12,
          min_tenor_period: "months",
          max_tenor_value: 360,
          max_tenor_period: "months",
          require_guarantor: 1,
          require_loan_offer: 1,
        },
      ],
    };

    mockRequest.mockReturnValue(mockGetLoanProductsResponse);
    const result = await embeddedLoansAndPayment.getLoanProducts();

    expect(mockRequest).toHaveBeenCalledWith("GET", `/loans/products`);
    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetLoanProductsResponse);
  });

  it("should initialize a loan", async () => {
    const mockInitializeLoanResponse: InitializeLoanResponse = {
      status: "success",
      message: "Loan initialization successful",
      data: {
        reference: "REF123456789",
        url: "https://example.com/loan/initialize?ref=REF123456789",
      },
    };

    const mockData: InitializeLoanPayload = {
      product_id: "prod_001234",
      meta: {
        email: "user@example.com",
        phone_number: "+1234567890",
      },
    };

    const mockPayload = {
      product_id: mockData.product_id,
      meta: {
        email: mockData.meta.email,
        phone_number: mockData.meta.phone_number,
      },
    };

    mockRequest.mockReturnValue(mockInitializeLoanResponse);
    const result = await embeddedLoansAndPayment.initializeLoan(mockData);

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/loans/initialize`,
      undefined,
      mockPayload
    );
    expect(result.status).toBe("success");
    expect(result).toEqual(mockInitializeLoanResponse);
  });

  it("should get loan details", async () => {
    const mockGetLoanDetaiilsResponse: GetLoanDetailsResponse = {
      status: "success",
      message: "Loan details retrieved successfully",
      data: {
        customer_type: "individual",
        tenor: 12,
        tenor_period: "months",
        status: {
          status: "approved",
          can_request: 1,
          can_cancel: 0,
        },
        user: {
          first_name: "John",
          last_name: "Doe",
          phone_number: "+1234567890",
          email: "john.doe@example.com",
          photo_url: "https://example.com/photos/johndoe.jpg",
          referral_code: "REF12345",
        },
        interest_rate: 5.5,
        interest_period: "monthly",
        reference: "LN-1234567890",
        loan_amount: 10000,
        interest_due: 550,
        amount_disbursed: 10000,
        paid: 0,
        reject_reason: null,
        channel: "online",
        disburse_to: "bank_account",
        multi_tenor: true,
        payment_link_hash: "abc123xyz456",
      },
    };
    const mockReference = "LN-1234567890";

    mockRequest.mockReturnValue(mockGetLoanDetaiilsResponse);
    const result = await embeddedLoansAndPayment.getLoanDetails(mockReference);

    expect(mockRequest).toHaveBeenCalledWith("GET", `/loans/${mockReference}`);
    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetLoanDetaiilsResponse);
  });

  it("should initialize payment", async () => {
    const mockInitializedPaymentResponse: InitializePaymentResponse = {
      status: "success",
      message: "Payment initialization successful",
      data: {
        reference: "PAY-9876543210",
        url: "https://paymentgateway.com/initialize?ref=PAY-9876543210",
      },
    };

    const mockData: InitializePaymentPayload = {
      amount: 10000,
      description: "Payment for order #12345",
      callback_url: "https://yourapp.com/payment/callback",
      organization_id: "ORG-123456",
    };

    const mockPayload = {
      amount: mockData.amount,
      description: mockData.description,
      callback_url: mockData.callback_url,
      organization_id: mockData.organization_id,
    };

    mockRequest.mockReturnValue(mockInitializedPaymentResponse);
    const result = await embeddedLoansAndPayment.initializePayment(mockData);

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `payments/initialize`,
      undefined,
      mockPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockInitializedPaymentResponse);
  });

  it("should fetch the details of payment made", async () => {
    const mockQueryPaymentResponse: QueryPaymentResponse = {
      status: "success",
      message: "Payment details retrieved successfully.",
      data: {
        id: 1,
        org_id: 123,
        distributor_id: 456,
        transaction_id: "TRAN-7890",
        reference: "REF-123456",
        amount: 5000,
        description: "Payment for service rendered",
        callback_url: "https://yourapp.com/payment/callback",
        created_on: "2024-10-23T10:00:00Z",
        created_by: "admin@example.com",
        modified_on: null,
        modified_by: null,
        deleted_flag: 0,
        deleted_on: null,
        deleted_by: null,
      },
    };
    const mockReference = "PAY-9876543210";

    mockRequest.mockReturnValue(mockQueryPaymentResponse);
    const result = await embeddedLoansAndPayment.queryPayment(mockReference);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/payments/${mockReference}`
    );
    expect(result.status).toBe("success");
    expect(result).toEqual(mockQueryPaymentResponse);
  });
});
