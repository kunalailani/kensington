import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlickModule } from 'ngx-slick';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { PopoverModule } from "ngx-popover";

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
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './modal/modal.component';
import { ResetPasswordComponent } from './login/reset-password.component';
import { AddOwnerPropertyComponent } from './property/add-owner-property.component';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'property/:property_type/:property_by_role/:is_onRent/:residential',
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
      path: 'page/:parent/:slug',
      component: DynamicpageComponent
    },
    {
      path: 'my-profile',
      component: ProfileComponent      
    },
    {
      path: 'reset-password/:id',
      component: ResetPasswordComponent
    },
    {
      path: 'rent-an-apartment',
      component: AddOwnerPropertyComponent
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
    DynamicpageComponent,
    ProfileComponent,
    ModalComponent,
    ResetPasswordComponent,
    AddOwnerPropertyComponent
  ],
  imports: [
    BrowserModule,
    rootRouting,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    SlickModule.forRoot(),
    IonRangeSliderModule,
    PopoverModule
  ],
  providers: [
    ApiHandlerService,
    ConfiguratorService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
