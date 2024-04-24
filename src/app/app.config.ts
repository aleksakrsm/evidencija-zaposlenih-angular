import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { bearerTokenInterceptorProvider } from './interceptors/providers/interceptor-providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient(),
    importProvidersFrom(HttpClientModule),//ovo mora zbog interceptora
    // provideAnimationsAsync(),
    bearerTokenInterceptorProvider
  ],
};
