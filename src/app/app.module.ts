import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LandingModule } from './landing/landing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { SearchPropertyComponent } from './search/search-property.component';
import { HomeComponent } from './home/home.component';
import { PropertyComponent } from './property/property.component';
import { PropertyDetailComponent } from './property/property-detail.component';
import { AddPropertyComponent } from './property/add-property.component';
import { LoginComponent } from './login/login.component';

import { ApiHandlerService } from './shared/api-handler.service';
import { RecentPropertyComponent } from './recent-property/recent-property.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'property',
      component: PropertyComponent
    },
    {
      path: 'property-detail',
      component: PropertyDetailComponent
    },
    {
      path: 'search-property',
      component: SearchPropertyComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'add-property',
      component: AddPropertyComponent
    }
  ], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    SearchPropertyComponent,
    HomeComponent,
    PropertyComponent,
    PropertyDetailComponent,
    AddPropertyComponent,
    RecentPropertyComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    rootRouting,
    FormsModule
  ],
  providers: [
    ApiHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
