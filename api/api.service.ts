export default class ApiService {
  static baseUrl: string = "http://localhost:8080";

  static async post<T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
}
