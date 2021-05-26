import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankListComponent } from './bank-list/bank-list.component';

// for http requests
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//material input
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';
//inteceptor
import { CacheInterceptor } from './interceptor/cache.interceptor'
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './models/filter.pipe';
import { BankComponent } from './bank/bank.component';
@NgModule({
  declarations: [
    AppComponent,
    BankListComponent,
    FilterPipe,
    BankComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
