import { Lendsqr } from "../src/main";
import { Decisioning } from "../src/resources";
import {
  GetDecisionModelDetails,
  GetDecisionModelResponse,
  OraculiBorrowerPayload,
  OraculiBorrowerScoringResponse,
} from "../src/interfaces";

describe("Decisioning", () => {
  let decisioning: Decisioning;
  let mockLendsqrClient: Lendsqr;

  const mockRequest = jest.fn();

  beforeEach(() => {
    decisioning = new Decisioning(mockLendsqrClient);
    decisioning.request = mockRequest;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all the decision models that has been configured on users account", async () => {
    const mockGetDecisionModelResponse: GetDecisionModelResponse = {
      status: "success",
      message: "Decision model retrieved successfully",
      data: [
        {
          id: 1,
          product_id: null,
          org_id: 123,
          version_id: 1,
          country: "NG",
          name: "Personal Loan",
          description: "A personal loan for individuals.",
          decision_setting: {
            karma: {
              required: true,
              sequence: 1,
              continue_on_failure: false,
              pre_offer: true,
            },
            ecosystem: {
              required: false,
              sequence: 2,
              continue_on_failure: true,
              pre_offer: false,
            },
            credit_bureau: {
              required: true,
              sequence: 3,
              continue_on_failure: false,
              pre_offer: true,
            },
          },
          offer_setting: [
            {
              rule: {
                "*": [50000, { var: ["credit_score", "income"] }],
              },
              maximum: 1000000,
              minimum: 100000,
            },
          ],
          status: "active",
          created_on: "2024-10-18T12:00:00Z",
        },
        {
          id: 2,
          product_id: 1,
          org_id: 123,
          version_id: 1,
          country: "NG",
          name: "Home Loan",
          description: "A loan for purchasing homes.",
          decision_setting: {
            karma: {
              required: true,
              sequence: 1,
              continue_on_failure: false,
              pre_offer: true,
            },
            ecosystem: {
              required: true,
              sequence: 2,
              continue_on_failure: false,
              pre_offer: true,
            },
            credit_bureau: {
              required: true,
              sequence: 3,
              continue_on_failure: true,
              pre_offer: false,
            },
          },
          offer_setting: [
            {
              rule: {
                "*": [200000, { var: ["property_value", "credit_score"] }],
              },
              maximum: 5000000,
              minimum: 500000,
            },
          ],
          status: "active",
          created_on: "2024-10-18T12:00:00Z",
        },
      ],
    };

    mockRequest.mockResolvedValue(mockGetDecisionModelResponse);

    const result = await decisioning.getDecisionModel();

    expect(mockRequest).toHaveBeenCalledWith("GET", `/decisioning/models`);
    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetDecisionModelResponse);
  });

  it("should get the details of a specific decision model", async () => {
    const id = 1;

    const mockGetDecisonModelDetailsResponse: GetDecisionModelDetails = {
      status: "success",
      message: "Decision model details retrieved successfully",
      data: {
        id: 1,
        product_id: 2,
        org_id: 123,
        version_id: 1,
        country: "NG",
        name: "Home Loan",
        description: "A loan for purchasing residential properties.",
        decision_setting: {
          karma: {
            required: true,
            sequence: 1,
            continue_on_failure: false,
            pre_offer: true,
          },
          ecosystem: {
            required: true,
            sequence: 2,
            continue_on_failure: true,
            pre_offer: false,
          },
          credit_bureau: {
            required: true,
            sequence: 3,
            continue_on_failure: false,
            pre_offer: true,
          },
        },
        offer_setting: [
          {
            rule: {
              "*": [300000, { var: ["property_value", "credit_score"] }],
            },
            maximum: 10000000,
            minimum: 1000000,
          },
        ],
        status: "active",
        created_on: "2024-10-18T12:00:00Z",
        settings: [
          {
            key: "interest_rate",
            value: 5.5,
            description: "The interest rate for the loan.",
          },
          {
            key: "loan_term",
            value: "30 years",
            description: "The term of the loan.",
          },
        ],
      },
    };

    mockRequest.mockResolvedValue(mockGetDecisonModelDetailsResponse);

    const result = await decisioning.getDecisionModelDetails(id);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/decisioning/models/${id}/settings`
    );
    expect(result.status).toBe("success");
    expect(result).toEqual(mockGetDecisonModelDetailsResponse);
  });

  it("should show scores based on parameters passed", async () => {
    const id = 1;

    const mockBorrowerScoringResponse: OraculiBorrowerScoringResponse = {
      status: "success",
      message: "Credit scoring data retrieved successfully.",
      data: {
        credit_score_items: [
          {
            score_name: "Payment History",
            score_value: 95,
            weight: "30%",
            maximum_score: 100,
            borrower_score: 30,
            weighted_score: 28.5,
          },
          {
            score_name: "Credit Utilization",
            score_value: 60,
            weight: "25%",
            maximum_score: 100,
            borrower_score: 25,
            weighted_score: 15,
          },
          {
            score_name: "Length of Credit History",
            score_value: 40,
            weight: "15%",
            maximum_score: 100,
            borrower_score: 15,
            weighted_score: 6,
          },
          {
            score_name: "New Credit",
            score_value: 70,
            weight: "10%",
            maximum_score: 100,
            borrower_score: 10,
            weighted_score: 7,
          },
          {
            score_name: "Credit Mix",
            score_value: 80,
            weight: "20%",
            maximum_score: 100,
            borrower_score: 20,
            weighted_score: 16,
          },
        ],
        total_weight: 100,
        score: 73.5,
        offers: [
          {
            offer_id: 1,
            offer_description: "Personal Loan with low interest rate",
            interest_rate: 5.5,
            maximum_amount: 1000000,
          },
          {
            offer_id: 2,
            offer_description: "Credit Card with cashback rewards",
            interest_rate: 18.0,
            maximum_amount: 500000,
          },
        ],
      },
      meta: {
        cost: 50,
        balance: 2000,
      },
    };

    const mockBorrowerPayload: OraculiBorrowerPayload = {
      gender: "Female",
      marital_status: "Single",
      age: "21",
      location: "lagos",
      no_of_dependent: "0",
      type_of_residence: "Rented Apartment",
      educational_attainment: "BSc, HND and Other Equivalent",
      employment_status: "Employed",
      sector_of_employment: "Other Financial",
      monthly_net_income: "100,000 - 199,999",
      employer_category: "Private Company",
      bvn: "22536051111",
      phone_number: "08012345678",
      total_years_of_experience: 5,
      time_with_current_employer: 2,
      previous_lendsqr_loans: 3,
      phone: "07062561111",
      bvn_phone: "07062561111",
      office_email: "adojohnsule@lendsqr.com",
      personal_email: "adojohnsule@lendsqr.com",
      amount: 10000,
    };

    mockRequest.mockResolvedValue(mockBorrowerScoringResponse);

    const result = await decisioning.oraculiBorrowerScoring(
      id,
      mockBorrowerPayload
    );

    expect(mockRequest).toHaveBeenCalledWith(
      "POST",
      `/decisioning/models/${id}`,
      undefined,
      mockBorrowerPayload
    );

    expect(result.status).toBe("success");
    expect(result).toEqual(mockBorrowerScoringResponse);
  });
});
