import "reflect-metadata";

import axios, { AxiosInstance } from "axios";
import { injectable } from "tsyringe";

@injectable()
export class Lendsqr {
  private axiosInstance: AxiosInstance;

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
      throw error;
    }
  }
}
