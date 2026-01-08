export function ApiResponse(
  success: boolean,
  message: string,
  status: number = 200,
  data?: any
) {
  return Response.json(
    {
      success,
      message,
      data,
    },
    { status }
  );
}
