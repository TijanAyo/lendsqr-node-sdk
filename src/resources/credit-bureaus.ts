import { BaseResource } from "./base";
import {
  GetCreditReportFromCRC,
  GetCreditReportFromFirstCentral,
} from "../interfaces";

export class CreditBureaus extends BaseResource {
  /**
   * Check the CRC database for the credit history of a customer using their BVN
   * @param {string} bvn
   * @returns {Promise<GetCreditReportFromCRC>}
   */
  async getCreditReportFromCRC(bvn: string): Promise<GetCreditReportFromCRC> {
    const path = `/creditbureaus/crc/${bvn}`;

    return this.request<GetCreditReportFromCRC>("GET", path);
  }

  /**
   * Check the FirstCentral database for the credit history of a customer using their BVN
   * @param {string} bvn
   * @returns {Promise<GetCreditReportFromFirstCentral>}
   */
  async getCreditReportFromFirstCentral(
    bvn: string
  ): Promise<GetCreditReportFromFirstCentral> {
    const path = `/creditbureaus/firstcentral/${bvn}`;

    return this.request<GetCreditReportFromFirstCentral>("GET", path);
  }
}
