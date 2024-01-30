import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapVisualizerComponent } from './map-visualizer/map-visualizer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LoginManagersComponent } from './login-register/managers/login-managers/login-managers.component';
import { RegisterManagersComponent } from './login-register/managers/register-managers/register-managers.component';
import { LoginCustomersComponent } from './login-register/customers/login-customers/login-customers.component';
import { RegisterCustomersComponent } from './login-register/customers/register-customers/register-customers.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomersRegisterInformationComponent } from './login-register/customers/customers-register-information/customers-register-information.component';
import { ManagersRegisterInformationComponent } from './login-register/managers/managers-register-information/managers-register-information.component';
import { MatSelectModule } from '@angular/material/select';
import { LoginRegisterService } from './login-register/services/login-register.service';
import { ManagersPanelComponent } from './managers-panel/managers-panel.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './managers-panel/profile/profile.component';
import { AddFoodComponent } from './managers-panel/add-food/add-food.component';
import { ManagersSerivce } from './managers-panel/services/managers.service';
import { ShowFoodsComponent } from './managers-panel/show-foods/show-foods.component';
import { FoodComponent } from './managers-panel/show-foods/food/food.component';
import { FoodDetailComponent } from './managers-panel/show-foods/food-detail/food-detail.component';
import { OrdersPanelComponent } from './managers-panel/orders-panel/orders-panel.component';
import { OrderComponent } from './managers-panel/orders-panel/order/order.component';
import { OrderDetailComponent } from './managers-panel/orders-panel/order-detail/order-detail.component';
import { PanelSelectorService } from './services/panel-selector.service';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';
import { FoodsCustomerPanelComponent } from './customer-panel/foods-customer-panel/foods-customer-panel.component';
import { OrdersCustomerPanelComponent } from './customer-panel/orders-customer-panel/orders-customer-panel.component';
import { FoodCustomerComponent } from './customer-panel/foods-customer-panel/food-customer/food-customer.component';
import { OrderPanelService } from './managers-panel/orders-panel/services/order-panel.service';
import { CustomersSerivce } from './customer-panel/services/customers.service';
import { OrderCustomerComponent } from './customer-panel/orders-customer-panel/order-customer/order-customer.component';
import { ProfileCustomerPanelComponent } from './customer-panel/profile-customer-panel/profile-customer-panel.component';
import { SearchFoodComponent } from './customer-panel/search-food/search-food.component';

@NgModule({
  declarations: [
    AppComponent,
    MapVisualizerComponent,
    LoginRegisterComponent,
    LoginManagersComponent,
    RegisterManagersComponent,
    LoginCustomersComponent,
    RegisterCustomersComponent,
    CustomersRegisterInformationComponent,
    ManagersRegisterInformationComponent,
    ManagersPanelComponent,
    ProfileComponent,
    AddFoodComponent,
    ShowFoodsComponent,
    FoodComponent,
    FoodDetailComponent,
    OrdersPanelComponent,
    OrderComponent,
    OrderDetailComponent,
    CustomerPanelComponent,
    FoodsCustomerPanelComponent,
    OrdersCustomerPanelComponent,
    FoodCustomerComponent,
    OrderCustomerComponent,
    ProfileCustomerPanelComponent,
    SearchFoodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatToolbarModule,
    HttpClientModule,
  ],
  providers: [
    LoginRegisterService,
    HttpService,
    ManagersSerivce,
    PanelSelectorService,
    OrderPanelService,
    CustomersSerivce
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
