import App from "./app";
import { Routes } from "./routes/index";
import { Wares } from "./middlewares/index";

new App({
  port: 8000,
  middlewares: [...Wares],
  routes: [...Routes],
});
