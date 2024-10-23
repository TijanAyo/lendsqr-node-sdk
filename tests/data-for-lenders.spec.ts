import { Lendsqr } from "../src/main";
import { DataForLenders } from "../src/resources";
import { GetOptionsResponse } from "../src/interfaces";

describe("Data-for-lenders", () => {
  let dataForLenders: DataForLenders;
  let mockLendsqrClient: Lendsqr;

  const mockRequest = jest.fn();

  beforeEach(() => {
    dataForLenders = new DataForLenders(mockLendsqrClient);
    dataForLenders.request = mockRequest;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch options available for a lender", async () => {
    const mockOptionsResponse: GetOptionsResponse = {
      success: true,
      data: [
        {
          name: "Users",
          description:
            "Get details of all users that have signed up to the system. This may include users who have not completed their onboarding",
          path: "/users",
        },
        {
          name: "Loans",
          description:
            "Get details of all loans for any users. You can filter with user_id, status, and approved_on columns",
          path: "/loans",
        },
        {
          name: "Options",
          description:
            "List all available data options. To get the data for any path, please call with base_url/<path>",
          path: "/options",
        },
      ],
    };

    mockRequest.mockResolvedValue(mockOptionsResponse);

    const result = await dataForLenders.getOptions();
    expect(mockRequest).toHaveBeenCalledWith("GET", `/data/options`);

    expect(result.success).toBe(true);
    expect(result).toEqual(mockOptionsResponse);
  });
});
