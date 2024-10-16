import { injectable } from "tsyringe";

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

@injectable()
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

    const payload = {
      product_id: data.product_id,
      meta: {
        email: data.meta.email,
        phone_number: data.meta.phone_number,
      },
    };

    return this.request<InitializeLoanResponse>(
      "POST",
      path,
      undefined,
      payload
    );
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

    const payload = {
      amout: data.amount,
      description: data.description,
      callback_url: data.callback_url,
      organization_id: data.organization_id,
    };

    return this.request<InitializePaymentResponse>(
      "POST",
      path,
      undefined,
      payload
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
