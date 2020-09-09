import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectronicsListingComponent } from './electronics-listing/electronics-listing.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/user-access/app.state';
import { ProductsEffects } from './store/products/effects/products.effects';
import { AccessEffects } from './store/user-access/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    ElectronicsListingComponent
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
