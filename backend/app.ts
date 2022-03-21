import express, { Router } from "express";
import { Application } from "express";

interface Controller {
  route: string;
  router: Router;
}

type Ware = any;

interface AppOptions {
  port: number;
  middlewares: Ware[];
  routes: Controller[];
}

class App {
  public app: Application;
  public port: number;

  constructor(appInit: AppOptions) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middlewares);
    this.routes(appInit.routes);
    this.listen();
  }

  private middlewares(middlewares: Ware[]): void {
    middlewares.forEach((ware) => {
      this.app.use(ware);
    });
  }

  private routes(controllers: Controller[]): void {
    controllers.forEach((route) => {
      this.app.use(route.route, route.router);
    });
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`app listening on http://localhost:${this.port}`);
    });
  }
}

export default App;
