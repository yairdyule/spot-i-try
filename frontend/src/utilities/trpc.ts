import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../backend/routes/trpc";

export const trpc = createReactQueryHooks<AppRouter>();
