import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlickModule } from 'ngx-slick';
import { IonRangeSliderModule } from "ng2-ion-range-slider";


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
import { EditPropertyComponent } from './property/edit-property.component';
import { MyPropertyListComponent } from './property/my-property.component';
import { LoginComponent } from './login/login.component';

import { ApiHandlerService } from './shared/api-handler.service';
import { ConfiguratorService } from './shared/configurator.service';
import { LoaderService } from './shared/loader.service';
import { GooglePlacesDirective } from './shared/googleplaces.directive';
import { RecentPropertyComponent } from './recent-property/recent-property.component';
import { DynamicpageComponent } from './dynamicpage/dynamicpage.component';


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
      path: 'property-detail/:id',
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
    },
    {
      path: 'my-property',
      component: MyPropertyListComponent
    },
    {
      path: 'edit-property/:id',
      component: EditPropertyComponent
    },
    {
      path: 'page/:slug',
      component: DynamicpageComponent
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
    LoginComponent,
    MyPropertyListComponent,
    EditPropertyComponent,
    GooglePlacesDirective,
    DynamicpageComponent
  ],
  imports: [
    BrowserModule,
    rootRouting,
    FormsModule,
    HttpClientModule,
    SlickModule.forRoot(),
    IonRangeSliderModule
  ],
  providers: [
    ApiHandlerService,
    ConfiguratorService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
