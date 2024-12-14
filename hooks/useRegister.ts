import { useMutation } from "@tanstack/react-query";

import { RegisterParams } from "@/api/types";
import UserService from "@/api/user.service";

export const useRegister = () =>
  useMutation({
    mutationFn: (params: RegisterParams) => UserService.register(params),
    onSuccess: () => {
      console.log("Successfully registered.");
    },
  });
