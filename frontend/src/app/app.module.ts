import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
const routes:Routes =[
  {path:'' , component : HomeComponent},
  {path:'search/:searchTerm' , component : HomeComponent},
  {path:'tag/:tag',component : HomeComponent},
  {path:'food/:id',component : FoodPageComponent},
  {path:'cart-page',component : CartPageComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FoodPageComponent,
    SearchComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
