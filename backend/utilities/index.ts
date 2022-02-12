import { Router } from "express";

export const RouteBuilder = (path: string, rr: Router) => {
  return { route: path, router: rr };
};
