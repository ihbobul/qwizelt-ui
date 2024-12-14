import ApiService from "./api.service";
import { RegisterParams } from "./types";

export default class UserService {
  static async register(params: RegisterParams) {
    return ApiService.post("/auth/register", params, true);
  }
}
