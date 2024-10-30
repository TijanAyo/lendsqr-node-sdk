import { AxiosError } from "axios";

export class LendSqrAPIError extends Error {
  status?: number;
  data?: any;

  constructor(error: AxiosError) {
    super(error.message);

    this.status = error.response?.status;
    this.data = error.response?.data;
    this.name = "LendSqrAPIError";

    // Manully ensure prototype is set properly
    Object.setPrototypeOf(this, LendSqrAPIError.prototype);
  }
}

export class LendSqrSDKError extends Error {
  status: number;
  data: { message: string };

  constructor(error: unknown) {
    super(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );

    this.status = 500;
    this.data = {
      message: "An error occurred while processing your request in the SDK",
    };
    this.name = "LendSqrSDKError ";

    // Manully ensure prototype is set properly
    Object.setPrototypeOf(this, LendSqrSDKError.prototype);
  }
}
