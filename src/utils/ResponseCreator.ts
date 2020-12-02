export enum ResponseTypes {
  ERROR = "error",
  SUCCESS = "success",
}

type ResponseObjectType = {
  type: ResponseTypes;
  message: string;
  payload?: Record<string, unknown>;
};

export class ResponseCreator {
  private static createResponse = (
    type: ResponseTypes,
    message: string,
    payload?: any
  ): ResponseObjectType => {
    return {
      type,
      message,
      payload,
    };
  };

  public static createSuccessResponse = (
    payload?: Record<string, any>,
    message: string = "success"
  ) => {
    return ResponseCreator.createResponse(
      ResponseTypes.SUCCESS,
      message,
      payload
    );
  };

  public static createErrorResponse = (
    message: string,
    payload?: Record<string, any>
  ) => {
    return ResponseCreator.createResponse(
      ResponseTypes.ERROR,
      message,
      payload
    );
  };
}
