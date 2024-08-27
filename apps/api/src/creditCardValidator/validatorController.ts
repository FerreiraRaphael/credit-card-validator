import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse
} from "tsoa";
import { ValidatorDomain } from "./validatorDomain";

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
export class ValidatorController extends Controller {
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
