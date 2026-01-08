import { ApiResponse } from "./ApiResponse";

export const asyncHandler = (fn:Function) => async (req: Request,...args: any) => {
  try {
    return await fn(req,...args)
  } catch (error: any) {
    return ApiResponse(
      false,
      error.message || "something went wrong",
      error.status || 500
    );
  }
};
