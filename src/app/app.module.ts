import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OncostsAdminComponent } from './oncosts-admin/oncosts-admin.component';
import { OncostsItemComponent } from './oncosts-admin/oncosts-item/oncosts-item.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

registerLocaleData(uk);

@NgModule({
  declarations: [
    AppComponent,
    OncostsAdminComponent,
    OncostsItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
