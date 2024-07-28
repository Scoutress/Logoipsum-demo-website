declare module "swagger-ui-express" {
  import { RequestHandler } from "express";

  interface SwaggerUiOptions {
    explorer?: boolean;
    swaggerOptions?: Record<string, any>;
    customCss?: string;
    customJs?: string;
    customfavIcon?: string;
    customSiteTitle?: string;
    isExplorer?: boolean;
  }

  export function setup(
    swaggerDoc: any,
    options?: SwaggerUiOptions,
    customCss?: string,
    customfavIcon?: string,
    customJs?: string
  ): RequestHandler;
  export function serve(req: any, res: any, next: any): void;
  export const serveFiles: RequestHandler;
}
