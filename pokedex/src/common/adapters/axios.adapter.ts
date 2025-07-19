import axios, { AxiosInstance } from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements AxiosAdapter {

  private axios: AxiosInstance = axios

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url)
      return data
    } catch (err) {
      throw new Error('Check Logs')
    }
  }

}
