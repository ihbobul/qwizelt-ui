/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ApiService {
  static baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}`;

  static async post<T>(
    endpoint: string,
    data: any,
    isJson: boolean,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method: "POST",
      headers: isJson ? { "Content-Type": "application/json" } : undefined,
      body: isJson ? JSON.stringify(data) : data,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Request to ${endpoint} failed.`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error(`[ApiService] Error in POST ${url}:`, error);
      throw error;
    }
  }

  static async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Request to ${endpoint} failed.`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error(`[ApiService] Error in GET ${url}:`, error);
      throw error;
    }
  }

  static async put<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Request to ${endpoint} failed.`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error(`[ApiService] Error in PUT ${url}:`, error);
      throw error;
    }
  }

  static async delete<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Request to ${endpoint} failed.`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error(`[ApiService] Error in DELETE ${url}:`, error);
      throw error;
    }
  }
}
