import { CorsOptions } from "./wares/cors";
import { ExpressJSON, ExpressUrlEncoding } from "./wares/express";
import { session } from "./wares/iron";

export const Wares = [CorsOptions, ExpressJSON, ExpressUrlEncoding, session];
