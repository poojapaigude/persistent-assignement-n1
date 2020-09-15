import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectronicsListingComponent } from './product/electronics-listing/electronics-listing.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/app.state';
import { AddProductComponent } from './product/add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductsEffects } from './store/products/products.effects';
import { AccessEffects } from './store/user-access/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    ElectronicsListingComponent,
    AddProductComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([ProductsEffects, AccessEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
