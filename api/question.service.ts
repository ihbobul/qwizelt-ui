import ApiService from "./api.service";

export default class QuestionService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async generateQuestions(data: any, isJson: boolean) {
    const endpoint = isJson
      ? "/questions/generate"
      : "/questions/generate-from-file";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ApiService.post<any>(endpoint, data, isJson);
  }
}
