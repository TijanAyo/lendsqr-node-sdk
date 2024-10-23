import { BaseResource } from "./base";
import { GetOptionsResponse } from "../interfaces";

export class DataForLenders extends BaseResource {
  /**
   * Allows to get the data options or sources available for a lender
   * @returns {Promise<GetOptionsResponse>}
   */
  async getOptions(): Promise<GetOptionsResponse> {
    const path = `/data/options`;

    return this.request<GetOptionsResponse>("GET", path);
  }
}
