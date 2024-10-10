import { injectable } from "tsyringe";
import { Lendsqr } from "../main";

@injectable()
export class BaseResource {
  constructor(protected client: Lendsqr) {}

  async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    params?: Record<string, any>,
    data?: Record<string, any>
  ): Promise<T> {
    return this.client.apiRequest<T>(method, path, params, data);
  }
}
