import { injectable } from "tsyringe";

import { BaseResource } from "./base";
import {
  CancelMandateResponse,
  CancelMandateType,
  CreateMandatePaylod,
  CreateMandateResponse,
  DebitMandateResponse,
  GetAllBanksResponse,
  GetAllMandateTransactionResponse,
  GetBankDetailsResponse,
  GetMandateAccountBalanceResponse,
  GetMandateDetailsResponse,
  GetMandateSummaryResponse,
  GetMandateTransactionDetailsResponse,
  GetMandateTranscationStatsResponse,
  VerifyAccountNumberPayload,
  VerifyAccountNumberResponse,
} from "../interfaces";

@injectable()
export class DirectDebit extends BaseResource {
  /**
   * Returns the lis of banks able to provide direct debit authorizations
   * @param {number} limit
   * @param {number} page
   * @param {string} sort_dir
   * @returns {Promise<GetAllBanksResponse>}
   */
  async getAllBanks(
    limit: number = 100,
    page: number = 1,
    sort_dir: string = "ASC"
  ): Promise<GetAllBanksResponse> {
    const path = `/direct-debit/banks`;

    const params = {
      limit,
      page,
      sort_dir,
    };

    return this.request<GetAllBanksResponse>("GET", path, params);
  }

  /**
   * Retrieve the details of a specific bank
   * @param {number} bankId
   * @returns {Promise<GetBankDetailsResponse>}
   */
  async getBankDetails(bankId: number): Promise<GetBankDetailsResponse> {
    const path = `/direct-debit/banks/${bankId}`;

    return this.request<GetBankDetailsResponse>("GET", path);
  }

  /**
   *  Verify the validity and details of a Nigerian account number
   * @param {VerifyAccountNumberPayload} data
   * @returns {Promise<VerifyAccountNumberResponse>}
   */
  async verifyAccountNumber(
    data: VerifyAccountNumberPayload
  ): Promise<VerifyAccountNumberResponse> {
    const path = `/direct-debit/banks/account-lookup`;

    const payload = {
      account_number: data.account_number,
      bank_code: data.bank_code,
    };

    return this.request<VerifyAccountNumberResponse>(
      "POST",
      path,
      undefined,
      payload
    );
  }

  /**
   * Allows you to create a mandate on a customer's account
   * @param {CreateMandatePaylod} data
   * @returns
   */
  async createMandate(
    data: CreateMandatePaylod
  ): Promise<CreateMandateResponse> {
    const path = `/direct-debit/mandates`;

    const payload = {
      account_number: data.account_number,
      phone_number: data.phone_number,
      debit_type: data.debit_type,
      frequency: data.frequency,
      bank_id: data.bank_id,
      email: data.email,
      start_date: data.start_date,
      end_date: data.end_date,
      narration: data.narration,
      address: data.address,
      amount: data.amount,
      schedule: data.schedule,
      type: data.type,
      file_base64: data.file_base64,
      file_extension: data.file_extension,
    };

    return this.request<CreateMandateResponse>(
      "POST",
      path,
      undefined,
      payload
    );
  }

  /**
   * Retrieve mandates or information for a specific mandate
   * @param {number} limit
   * @param {number} page
   * @param {string} reference_number
   * @returns {Promise<GetMandateDetailsResponse>}
   */
  async getAllMandates(
    limit: number = 10,
    page: number = 1,
    reference_number?: string
  ): Promise<GetMandateDetailsResponse> {
    const path = `/direct-debit/mandates`;

    const params = {
      limit,
      page,
      reference_number,
    };

    return this.request<GetMandateDetailsResponse>("GET", path, params);
  }

  /**
   * Retrieves the details of a specific mandate
   * @param {string} reference_number
   * @returns { Promise<GetMandateDetailsResponse>}
   */
  async getMandateDetails(
    reference_number: string
  ): Promise<GetMandateDetailsResponse> {
    const path = `/direct-debit/mandates`;

    const params = {
      reference_number,
    };

    return this.request<GetMandateDetailsResponse>("GET", path, params);
  }

  /**
   * Provides the summary of all mandates within the system
   * @returns {Promise<GetMandateSummaryResponse>}
   */
  async getMandateSummary(): Promise<GetMandateSummaryResponse> {
    const path = `/direct-debit/mandates/stats`;

    return this.request<GetMandateSummaryResponse>("GET", path);
  }

  /**
   * Updates the status of a mandate
   * @param { CancelMandateType} type
   * @param { string } reference_number
   * @returns { Promise<CancelMandateResponse>}
   */
  async cancelMandate(
    type: CancelMandateType,
    reference_number: string
  ): Promise<CancelMandateResponse> {
    const path = `/direct-debit/mandates/cancel`;

    const params = {
      type,
    };

    const payload = {
      reference_number,
    };

    return this.request<CancelMandateResponse>("POST", path, params, payload);
  }

  /**
   * Allows perform a debit on a customer's account using an authorized mandate
   * @param {string} reference_number
   * @param {number} amount
   * @returns {Promise<DebitMandateResponse>}
   */
  async debitMandate(
    reference_number: string,
    amount: number
  ): Promise<DebitMandateResponse> {
    const path = `/direct-debit/mandates/debit`;

    const payload = {
      reference_number,
      amount,
    };

    return this.request<DebitMandateResponse>("POST", path, undefined, payload);
  }

  /**
   * Retrieves the balance of the account associated with a mandate
   * @param {string} reference_number
   * @returns { Promise<GetMandateAccountBalanceResponse>}
   */
  async getMandateAccountBalance(
    reference_number: string
  ): Promise<GetMandateAccountBalanceResponse> {
    const path = `/direct-debit/banks/balance-lookup`;

    const payload = {
      reference_number,
    };

    return this.request<GetMandateAccountBalanceResponse>(
      "POST",
      path,
      undefined,
      payload
    );
  }

  /**
   * Retrieve the transactions related to the mandates associated
   * @param {number} limit
   * @param {number} page
   * @returns {Promise<GetAllMandateTransactionResponse>}
   */
  async getAllMandateTransactions(
    limit: number = 10,
    page: number = 1
  ): Promise<GetAllMandateTransactionResponse> {
    const path = `/direct-debit/transactions`;

    const params = {
      limit,
      page,
    };

    return this.request<GetAllMandateTransactionResponse>("GET", path, params);
  }

  /**
   * Retrieves the details of a specific transaction
   * @param {string} reference
   * @returns {Promise<GetMandateTransactionDetailsResponse>}
   */
  async getMandateTransactionDetails(
    reference: string
  ): Promise<GetMandateTransactionDetailsResponse> {
    const path = `/direct-debit/transactions`;

    const params = {
      reference,
    };

    return this.request<GetMandateTransactionDetailsResponse>(
      "GET",
      path,
      params
    );
  }

  /**
   * Retrieves the status of transactions
   * @returns {Promise<GetMandateTranscationStatsResponse>}
   */
  async getMandateTransactionStats(): Promise<GetMandateTranscationStatsResponse> {
    const path = `/direct-debit/transactions/stats`;

    return this.request<GetMandateTranscationStatsResponse>("GET", path);
  }
}
