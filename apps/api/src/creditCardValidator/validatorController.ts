import {
  Body,
  Controller,
  Post,
  Route
} from "tsoa";
import { ValidatorDomain } from "./validatorDomain";

interface IsValidBody {
  /**
   * @example "5011054488597827"
   */
  creditCard: string
}

@Route("creditCard")
export class UsersController extends Controller {
  @Post("isValid")
  public async isValid(
    @Body() requestBody: IsValidBody,
  ) {
    this.setStatus(200);
    return new ValidatorDomain().isValid(requestBody.creditCard);
  }
}
