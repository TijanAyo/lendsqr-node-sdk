import { BaseResource } from "./base";
import {
  GetLoanDetailsResponse,
  GetLoanProductsResponse,
  InitializeLoanPayload,
  InitializeLoanResponse,
  InitializePaymentPayload,
  InitializePaymentResponse,
  QueryPaymentResponse,
} from "../interfaces";

export class EmbeddedLoansAndPayments extends BaseResource {
  /**
   * Retrieve all the loan products a distributor is subscribed to
   * @returns {Promise<GetLoanProductsResponse>}
   */
  async getLoanProducts(): Promise<GetLoanProductsResponse> {
    const path = `/loans/products`;

    return this.request<GetLoanProductsResponse>("GET", path);
  }

  /**
   * Allows for loan initialization
   * @param {InitializeLoanPayload} data
   * @returns {Promise<InitializeLoanResponse>}
   */
  async initializeLoan(
    data: InitializeLoanPayload
  ): Promise<InitializeLoanResponse> {
    const path = `/loans/initialize`;

    return this.request<InitializeLoanResponse>("POST", path, undefined, data);
  }

  /**
   * Retrieve the details of a loan or loan request made via your platform as a distributor.
   * @param {string} reference
   * @returns { Promise<GetLoanDetailsResponse>}
   */
  async getLoanDetails(reference: string): Promise<GetLoanDetailsResponse> {
    const path = `/loans/${reference}`;

    return this.request<GetLoanDetailsResponse>("GET", path);
  }

  /**
   * Generates a payment link that would open a web page that would allow customers to
   * log into the lender's account and initiate the relevant payment.
   *  @param {InitializePaymentResponse} data
   * @returns {Promise<InitializePaymentResponse>}
   */
  async initializePayment(
    data: InitializePaymentPayload
  ): Promise<InitializePaymentResponse> {
    const path = `payments/initialize`;

    return this.request<InitializePaymentResponse>(
      "POST",
      path,
      undefined,
      data
    );
  }

  /**
   * Query the details of the payment made.
   * @param {string} reference
   * @returns {Promise<QueryPaymentResponse>}
   */
  async queryPayment(reference: string): Promise<QueryPaymentResponse> {
    const path = `/payments/${reference}`;

    return this.request<QueryPaymentResponse>("GET", path);
  }
}
