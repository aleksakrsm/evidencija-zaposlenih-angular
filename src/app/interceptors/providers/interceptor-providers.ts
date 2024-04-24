import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { BearerTokenInterceptor } from "../bearer-token-interceptor.service";

export const bearerTokenInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: BearerTokenInterceptor, multi: true };
