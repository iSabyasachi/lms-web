import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';
import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';

const routes: Routes = [
  {path: 'category/:type', component: BookListComponent},
  {path: 'category', component: BookListComponent},
  {path: 'books', component: BookListComponent},
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: '**', redirectTo: '/books', pathMatch: 'full'},
  
  {path: 'login/callback',component: OktaCallbackComponent},
  {path: 'login',component: LoginComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [BookService,
    {
      provide: OKTA_CONFIG,
      useFactory: () => {
        const oktaAuth = new OktaAuth(myAppConfig.oidc);
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
            const router = injector.get(Router);
            // Redirect the user to your custom login page
            router.navigate(['/login']);
          }
        }
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
