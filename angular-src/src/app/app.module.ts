import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { ShoppingCartService } from './services/shoppingCart.service';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { Post } from './components/post.model';

import { HeaderComponent } from './components/header/header.component';
import { PostListComponent } from './components/post-list/post-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadProductComponent } from './components/upload-product/upload-product.component';
import { AboutComponent } from './components/about/about.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './guards/auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  {
    path: 'upload',
    component: UploadProductComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];

declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    HeaderComponent,
    NavbarComponent,
    MapComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProductDetailsComponent,
    ProfileComponent,
    ShoppingCartComponent,
    UploadProductComponent,
    AboutComponent,
    CheckoutComponent,
    AdminComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MDBBootstrapModule.forRoot(),
    MatSnackBarModule,
  ],

  providers: [ValidateService, AuthService, ShoppingCartService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
  storedPosts: Post[] = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
