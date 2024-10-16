import { AxiosError } from "axios";

export class LendSqrAPIError extends Error {
  status?: number;
  data?: any;

  constructor(error: AxiosError) {
    super(error.message);

    this.name = "LendsqrAPIError";
    this.status = error.response?.status;
    this.data = error.response?.data;

    // Manully ensure prototype is set properly
    Object.setPrototypeOf(this, LendSqrAPIError.prototype);
  }
}
