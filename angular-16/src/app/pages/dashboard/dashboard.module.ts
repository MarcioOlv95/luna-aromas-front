import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../../demo-flexy-module'
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BillingComponent } from './components/billing/billing.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    DashboardComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    DashboardComponent,
    BillingComponent
  ]
})
export class DashboardModule { }
