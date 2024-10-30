import axios, { AxiosInstance, AxiosError } from "axios";

import { LendSqrAPIError, LendSqrSDKError } from "./utils";
import {
  CreditBureaus,
  DataForLenders,
  Decisioning,
  DirectDebit,
  EmbeddedLoansAndPayments,
  Validation,
} from "./resources";

interface LendsqrOptions {
  token: string;
  version?: string;
}

export class Lendsqr {
  private axiosInstance: AxiosInstance;
  public creditBureaus: CreditBureaus;
  public dataForLenders: DataForLenders;
  public decisioning: Decisioning;
  public directDebit: DirectDebit;
  public embeddedLoansAndPayment: EmbeddedLoansAndPayments;
  public validation: Validation;

  constructor(options: LendsqrOptions) {
    const { token, version = "v2" } = options;
    const baseURL = `https://adjutor.lendsqr.com/${version}`;

    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    this.creditBureaus = new CreditBureaus(this);
    this.dataForLenders = new DataForLenders(this);
    this.decisioning = new Decisioning(this);
    this.directDebit = new DirectDebit(this);
    this.embeddedLoansAndPayment = new EmbeddedLoansAndPayments(this);
    this.validation = new Validation(this);
  }

  async apiRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    params?: Record<string, any>,
    data?: Record<string, any>
  ): Promise<T> {
    try {
      const config = { method, url: path, params, data };
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 404) {
          return error.response.data;
        }
        throw new LendSqrAPIError(error);
      }
      throw new LendSqrSDKError(error);
    }
  }
}
