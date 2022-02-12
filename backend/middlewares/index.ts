import { CorsOptions } from "./wares/cors";
import { ExpressJSON, ExpressUrlEncoding } from "./wares/express";

export const Wares = [CorsOptions, ExpressJSON, ExpressUrlEncoding];
