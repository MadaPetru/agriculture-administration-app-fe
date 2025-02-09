import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MenuDataFieldPageProvider} from './shared/provider/menu/menu-data-field-page-provider';
import {FormSharedService} from './shared/components/form/form-shared-service';
import {CardSharedService} from './shared/components/card/card-shared-service';
import {ConfirmationModalSharedService} from './shared/components/confirmation-modal/confirmation-modal-shared.service';
import {FieldService} from './domains/field/field-service';
import {FieldOperationHistoryService} from './domains/field-operation-history/field-operation-history-service';
import {NavbarSearchSharedService} from "./shared/components/navbar-search/navbar-search-shared.service";
import {GallerySharedService} from "./shared/components/gallery/gallery-shared.service";
import {HttpTokenInterceptor} from "./shared/interceptor/http-token.interceptor";
import {UserService} from "./domains/user/user-service";

// export function keycloakFactory(keycloakService: KeycloakService) {
//   return () => keycloakService.init();
// }

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), importProvidersFrom(HttpClientModule), FieldService, MenuDataFieldPageProvider, FormSharedService,
    CardSharedService, ConfirmationModalSharedService, FieldOperationHistoryService, NavbarSearchSharedService, GallerySharedService,
    // {
    //   provide: APP_INITIALIZER,
    //   deps: [KeycloakService],
    //   useFactory: keycloakFactory,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }, UserService]
};
