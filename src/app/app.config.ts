import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MenuDataFieldPageProvider} from './shared/provider/menu/menu-data-field-page-provider';
import {FormSharedService} from './shared/components/form/form-shared-service';
import {CardSharedService} from './shared/components/card/card-shared-service';
import {
  DeleteConfirmationModalSharedService
} from './shared/components/delete-confirmation-modal/delete-confirmation-modal-shared-service';
import {FieldService} from './domains/field/field-service';
import {FieldOperationHistoryService} from './domains/field-operation-history/field-operation-history-service';
import {NavbarSearchSharedService} from "./shared/components/navbar-search/navbar-search-shared.service";
import {GallerySharedService} from "./shared/components/gallery/gallery-shared.service";
import {KeycloakService} from "./shared/service/keycloak.service";
import {HttpTokenInterceptor} from "./shared/interceptor/http-token.interceptor";

export function keycloakFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), importProvidersFrom(HttpClientModule), FieldService, MenuDataFieldPageProvider, FormSharedService,
    CardSharedService, DeleteConfirmationModalSharedService, FieldOperationHistoryService, NavbarSearchSharedService, GallerySharedService,
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: keycloakFactory,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }]
};
