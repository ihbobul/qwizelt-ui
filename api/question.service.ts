/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewVariant, Question, Variant } from "@/api/types";

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

  static async getQuestions() {
    const endpoint = "/questions";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ApiService.get<any>(endpoint);
  }

  static async regenerateQuestion(questionId: number, promptId: number) {
    const endpoint = "/questions/regenerate";
    const data = { questionId, promptId };
    return ApiService.put<Question>(endpoint, data);
  }

  static async editQuestion(questionId: number, newQuestionText: string) {
    return ApiService.put<Question>(`/questions/edit/${questionId}`, {
      newQuestionText,
    });
  }

  static async editVariant(variantId: number, newVariantText: string) {
    return ApiService.put<Variant>(`/questions/variants/edit/${variantId}`, {
      newVariantText,
    });
  }

  static async addVariant(questionId: number, newVariantText: string) {
    return ApiService.post<NewVariant>(
      "/questions/variants/add",
      { questionId, newVariantText },
      true,
    );
  }

  static async removeVariant(variantId: number) {
    return ApiService.delete<any>(`/questions/variants/remove/${variantId}`);
  }

  static async removeQuestion(questionId: number) {
    return ApiService.delete<any>(`/questions/remove/${questionId}`);
  }
}
