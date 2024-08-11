import express, {
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";
import { RegisterRoutes } from "../generated/routes";
import schema from '../generated/openapi.json'
import { ApiError } from "./creditCardValidator/validatorDomain";

export const api = express();

api.use(
  urlencoded({
    extended: true,
  })
);
api.use(json());

api.get('/schema.json', (_, res) => {
  return res.send(schema)
})

RegisterRoutes(api);

api.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

api.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});
