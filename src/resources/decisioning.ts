import { BaseResource } from "./base";
import {
  GetDecisionModelDetails,
  GetDecisionModelResponse,
  OraculiBorrowerPayload,
  OraculiBorrowerScoringResponse,
} from "../interfaces";

export class Decisioning extends BaseResource {
  /**
   * Fetches all the decision models that have been configured for your profile
   * @returns {Promise<GetDecisionModelResponse>}
   */
  async getDecisionModel(): Promise<GetDecisionModelResponse> {
    const path = `/decisioning/models`;

    return this.request<GetDecisionModelResponse>("GET", path);
  }

  /**
   *  Obtain the details of a Decision Model
   * @param {number} id
   * @returns {Promise<GetDecisionModelDetails>}
   */
  async getDecisionModelDetails(id: number): Promise<GetDecisionModelDetails> {
    const path = `/decisioning/models/${id}/settings`;

    return this.request<GetDecisionModelDetails>("GET", path);
  }

  /**
   * Allows for scoring based on the parameters passed
   * @param {number} id
   * @param { OraculiBorrowerPayload} data
   * @returns { Promise<OraculiBorrowerScoringResponse>}
   */
  async oraculiBorrowerScoring(
    id: number,
    data: OraculiBorrowerPayload
  ): Promise<OraculiBorrowerScoringResponse> {
    const path = `/decisioning/models/${id}`;

    return this.request<OraculiBorrowerScoringResponse>(
      "POST",
      path,
      undefined,
      data
    );
  }
}
