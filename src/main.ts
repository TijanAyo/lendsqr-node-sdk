import axios, { AxiosInstance } from "axios";

import { LendSqrAPIError } from "./utils";
import {
  CreditBureaus,
  DataForLenders,
  Decisioning,
  DirectDebit,
  EmbeddedLoansAndPayments,
  Validation,
} from "./resources";

export class Lendsqr {
  private axiosInstance: AxiosInstance;
  public creditBureaus: CreditBureaus;
  public dataForLenders: DataForLenders;
  public decisioning: Decisioning;
  public directDebit: DirectDebit;
  public embeddedLoansAndPayment: EmbeddedLoansAndPayments;
  public validation: Validation;

  constructor(
    private token: string,
    private baseURL: string = `https://adjutor.lendsqr.com/v2`
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
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
      throw new LendSqrAPIError(error);
    }
  }
}
