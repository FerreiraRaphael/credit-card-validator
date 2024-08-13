import {
  Body,
  Controller,
  Post,
  Res,
  Response,
  Route,
  SuccessResponse,
  TsoaResponse
} from "tsoa";
import { InvalidInput, ValidatorDomain } from "./validatorDomain";

interface IsValidBody {
  /**
   * @example "5011054488597827"
   */
  creditCard: string
}

interface InvalidInputJSON {
  message: "Credit card input invalid.";
}

@Route("creditCard")
export class UsersController extends Controller {
  @Response<InvalidInputJSON>(400)
  @SuccessResponse("200", "Success")
  @Post("isValid")
  public async isValid(
    @Body() requestBody: IsValidBody,
  ) {
    this.setStatus(200);
    return new ValidatorDomain().isValid(requestBody.creditCard);
  }
}
