import { CorsOptions } from "./wares/cors";
import { ExpressJSON, ExpressUrlEncoding } from "./wares/express";
import { TrpcWare } from "./wares/trpc";

export const Wares = [CorsOptions, ExpressJSON, ExpressUrlEncoding];
