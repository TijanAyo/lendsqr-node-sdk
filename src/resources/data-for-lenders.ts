import { BaseResource } from "./base";
import { GetOptionsResponse } from "../interfaces";

export class DataForLenders extends BaseResource {
  async getOptions(): Promise<GetOptionsResponse> {
    const path = `/data/options`;

    return this.request<GetOptionsResponse>("GET", path);
  }
}
