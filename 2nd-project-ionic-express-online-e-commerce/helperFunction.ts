import { Request } from "express";
import "./session";

export class HTTPError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function checkRole(req: Request) {
  let role = req.session.user?.role;
  if (!role) {
    throw new HTTPError(400, "You DO NOT have permission to do this");
  }
  return role;
}
