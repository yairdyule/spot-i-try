import { Router } from "express";

export const RouteBuilder = (r: string, rr: Router) => {
  return { route: r, router: rr };
};
