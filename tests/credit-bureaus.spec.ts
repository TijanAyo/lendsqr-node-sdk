import { CreditBureaus } from "../src/resources";
import { Lendsqr } from "../src/main";
import {
  GetCreditReportFromCRC,
  GetCreditReportFromFirstCentral,
} from "../src/interfaces";

describe("CreditBureaus", () => {
  let creditBureaus: CreditBureaus;
  let mockLendsqrClient: Lendsqr;

  const mockRequest = jest.fn();

  beforeEach(() => {
    creditBureaus = new CreditBureaus(mockLendsqrClient);
    creditBureaus.request = mockRequest;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch credit report from CRC for the provided BVN", async () => {
    const bvn = "12345678901";

    const mockCRCResponse: GetCreditReportFromCRC = {
      status: "success",
      message: "Successful",
      data: {
        consdisclaimer: {
          getdisclaimercontent: {
            _x0031_: "1",
          },
        },
        consumer_relation: "",
        last_checked_date: "2023-06-29 12:00:40",
        credit_nano_summary: {
          summary: {
            last_reported_date: "31-MAY-2023",
            has_creditfacilities: "YES",
            no_of_delinqcreditfacilities: "2",
          },
        },
        mfcredit_nano_summary: {
          summary: {
            last_reported_date: "31-MAY-2023",
            has_creditfacilities: "YES",
            no_of_delinqcreditfacilities: "1",
          },
        },
        mgcredit_nano_summary: {
          summary: {
            has_creditfacilities: "NO",
            no_of_delinqcreditfacilities: "0",
          },
        },
        nano_consumer_profile: {
          consumer_details: {
            name: "JOHN DOE",
            ruid: "1112020002201111",
            gender: "001",
            last_name: "DOE",
            first_name: "JOHN",
            citizenship: "NG",
            date_of_birth: "01-OCT-1960",
            identification: {
              ruid: "1112020002201111",
              id_value: "22293381111",
              source_id: "BVN",
              id_display_name: "Business Verification Number",
            },
          },
        },
      },
      meta: {
        cost: 100,
        balance: 1355,
      },
    };

    mockRequest.mockResolvedValue(mockCRCResponse);

    const result = await creditBureaus.getCreditReportFromCRC(bvn);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/creditbureaus/crc/${bvn}`
    );
    expect(result.status).toBe("success");
    expect(result).toEqual(mockCRCResponse);
  });

  it("should fetch credit report from FirstCentral for the provided BVN", async () => {
    const bvn = "12345678901";

    const mockFirstCentralResponse: GetCreditReportFromFirstCentral = {
      status: "success",
      message: "Successful",
      data: [
        {
          SubjectList: [
            {
              Reference: "2663443",
              ConsumerID: "2663443",
              SearchOutput: "DOE JANE, dantata estate kubwa abuja",
            },
          ],
        },
        {
          PersonalDetailsSummary: [
            {
              Gender: "Female",
              Header: "PERSONAL DETAILS SUMMARY: DOE JANE",
              Surname: "DOE",
              BirthDate: "19/03/1997",
              FirstName: "JANE",
              OtheridNo: "",
              CellularNo: "2348169591111",
              ConsumerID: "2663443",
              Dependants: "0",
              OtherNames: "",
              PassportNo: null,
              PencomIDNo: "",
              Nationality: "Nigeria",
              ReferenceNo: null,
              EmailAddress: "",
              NationalIDNo: "",
              MaritalStatus: null,
              EmployerDetail: null,
              PostalAddress1: "DANTATA ESTATE ABUJA FEDERAL CAPITAL TERRITORY",
              PostalAddress2: "15",
              PostalAddress3: "",
              PostalAddress4: " Nigeria",
              HomeTelephoneNo: "2348169591111",
              WorkTelephoneNo: "2348169591111",
              DriversLicenseNo: null,
              PropertyOwnedType: "",
              BankVerificationNo: "22293381111",
              ResidentialAddress1: "10nasiru dantata estate kubwa abuja",
              ResidentialAddress2: "",
              ResidentialAddress3: "",
              ResidentialAddress4: " ",
            },
          ],
        },
        {
          CreditSummary: [
            {
              NumberofAccountsInBadStanding: "0",
              TotalNumberOfAccountsReported: "6",
              NumberOfAccountsInGoodStanding: "6",
            },
          ],
        },
        {
          PerformanceClassification: [
            {
              NoOfLoansLost: "0",
              NoOfLoansDoubtful: "0",
              NoOfLoansPerforming: "6",
              NoOfLoansSubstandard: "1",
            },
          ],
        },
        {
          EnquiryDetails: [
            {
              ProductID: "63",
              MatchingRate: "90",
              SubscriberEnquiryEngineID: "179484634",
              SubscriberEnquiryResultID: "22059650",
            },
          ],
        },
      ],
      meta: {
        cost: 100,
        balance: 1025,
      },
    };

    mockRequest.mockResolvedValue(mockFirstCentralResponse);

    const result = await creditBureaus.getCreditReportFromFirstCentral(bvn);

    expect(mockRequest).toHaveBeenCalledWith(
      "GET",
      `/creditbureaus/firstcentral/${bvn}`
    );
    expect(result.status).toBe("success");
    expect(result).toEqual(mockFirstCentralResponse);
  });
});
