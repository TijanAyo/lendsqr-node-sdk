import { injectable } from "tsyringe";

import { BaseResource } from "./base";
import {
  GetDecisionModelDetails,
  GetDecisionModelResponse,
  OraculiBorrowerPayload,
  OraculiBorrowerScoringResponse,
} from "../interfaces";

@injectable()
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

    const payload = {
      gender: data.gender,
      marital_status: data.marital_status,
      age: data.age,
      location: data.location,
      no_of_dependent: data.no_of_dependent,
      type_of_residence: data.type_of_residence,
      educational_attainment: data.educational_attainment,
      employment_status: data.employment_status,
      sector_of_employment: data.sector_of_employment,
      monthly_net_income: data.monthly_net_income,
      employer_category: data.employer_category,
      bvn: data.bvn,
      phone_number: data.phone_number,
      total_years_of_experience: data.total_years_of_experience,
      time_with_current_employer: data.time_with_current_employer,
      previous_lendsqr_loans: data.previous_lendsqr_loans,
      phone: data.phone,
      bvn_phone: data.bvn_phone,
      office_email: data.office_email,
      personal_email: data.personal_email,
      amount: data.amount,
    };

    return this.request<OraculiBorrowerScoringResponse>(
      "POST",
      path,
      undefined,
      payload
    );
  }
}
