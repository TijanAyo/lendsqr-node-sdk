import { injectable } from "tsyringe";
import { BaseResource } from "./base";
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
} from "../interfaces";

@injectable()
export class Validation extends BaseResource {
  /**
   * Allows for real-time verification of an individual's Bank Verification Number (BVN)
   * through the comparison of their photograph and facial features with their BVN record.
   *
   * @param {string} bvn
   * @param {string} imageUrl
   * @returns {Promise<MatchCustomerBVNImageResponse>}
   */
  async matchCustomerBVNImage(
    bvn: string,
    imageUrl: string
  ): Promise<MatchCustomerBVNImageResponse> {
    const path = `/verification/bvn/${bvn}/selfies`;

    const payload = {
      image: imageUrl,
    };

    return this.request<MatchCustomerBVNImageResponse>(
      "POST",
      path,
      undefined,
      payload
    );
  }

  /**
   * Allows for verification of a customer's bank account.
   *
   * @param {string} accountNumber
   * @param {string} bankCode
   * @returns {Promise<VerifyCustomerBankAccountResponse>}
   */
  async verifyCustomerBankAccount(
    accountNumber: string,
    bankCode: string
  ): Promise<VerifyCustomerBankAccountResponse> {
    const path = `/verification/bankaccount`;

    const payload = {
      account_number: accountNumber,
      bank_code: bankCode,
    };

    return this.request<VerifyCustomerBankAccountResponse>(
      "POST",
      path,
      undefined,
      payload
    );
  }

  /**
   * Check if a customer is on the blacklist of bad actors
   * @param {string} identity
   * @returns {Promise<CheckCustomerKarmaResponse>}
   */
  async checkCustomerKarma(
    identity: string
  ): Promise<CheckCustomerKarmaResponse> {
    const path = `/verification/karma/${identity}`;

    return this.request<CheckCustomerKarmaResponse>("GET", path);
  }

  /**
   * Verify if a borrower exists on the Lendsqr ecosystem
   * @param {string} bvn
   * @returns {Promise<checkCustomerInEcosystemResponse>}
   */
  async checkCustomerInEcosystem(
    bvn: string
  ): Promise<CheckCustomerInEcosystemResponse> {
    const path = `/verification/ecosystem/${bvn}`;

    return this.request<CheckCustomerInEcosystemResponse>("GET", path);
  }

  /**
   *  Allows for real-time verification of an individual's National Identification Number (NIN)
   * @param {string} nin
   * @returns {Promise<VerifyCustomerNINResponse>}
   */
  async verifyCustomerNIN(nin: string): Promise<VerifyCustomerNINResponse> {
    const path = `/verification/nin/${nin}`;

    return this.request<VerifyCustomerNINResponse>("GET", path);
  }

  /**
   * Allows to initiate the process for getting the customer's consent to get customer BVN details
   * @param {string} bvn
   * @param {string} contact - This can be the phone number or email of the customer
   * @returns
   */
  async initializeBVNConsent(
    bvn: string,
    contact: string
  ): Promise<InitializeBVNConsentResponse> {
    const path = `/verification/bvn/${bvn}`;

    const payload = {
      contact,
    };

    return this.request<InitializeBVNConsentResponse>(
      "POST",
      path,
      undefined,
      payload
    );
  }

  /**
   * Allows to get the BVN data after the customer's consent has been approved
   * @param {string} bvn
   * @param {string} otp
   * @returns {Promise<CompleteConsentAndGetBVNDetailsResponse>}
   */
  async completeConsentAndGetBVNDetails(
    bvn: string,
    otp: string
  ): Promise<CompleteConsentAndGetBVNDetailsResponse> {
    const path = `/verification/bvn/${bvn}`;

    const payload = {
      otp,
    };

    return this.request<CompleteConsentAndGetBVNDetailsResponse>(
      "PUT",
      path,
      undefined,
      payload
    );
  }

  /**
   * Allows to initiate the process for getting the customer's consent to get accounts associated with customer
   * @param {string} bvn
   * @param {string} contact
   * @returns {Promise<InitializeBVNAccountConsentResponse>}
   */
  async initializeBVNAccountConsent(
    bvn: string,
    contact: string
  ): Promise<InitializeBVNAccountConsentResponse> {
    const path = `/verification/bvn/${bvn}/accounts`;

    const payload = {
      contact,
    };

    return this.request<InitializeBVNAccountConsentResponse>(
      "POST",
      path,
      undefined,
      payload
    );
  }

  /**
   * Allows to get the customer account/accounts data after the customer's consent has been approved
   * @param {string} bvn
   * @param {string} otp
   * @returns {Promise<CompleteConsentAndGetBVNAccountDetailsResponse>}
   */
  async completeConsentAndGetBVNAccountDetails(
    bvn: string,
    otp: string
  ): Promise<CompleteConsentAndGetBVNAccountDetailsResponse> {
    const path = `/verification/bvn/${bvn}/accounts`;

    const payload = {
      otp,
    };

    return this.request<CompleteConsentAndGetBVNAccountDetailsResponse>(
      "PUT",
      path,
      undefined,
      payload
    );
  }
}
