import { NgModule } from "@angular/core";
import {ProductsComponent } from "./products.component";
import { CommonModule } from "@angular/common";
import { DemoFlexyModule } from "src/app/demo-flexy-module";

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { ProductsFormComponents } from "./components/form/form.component";
import { ProductsTableComponents } from "./components/table/table.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path: '', component: ProductsComponent}
]

@NgModule({
    declarations: [
        ProductsComponent,
        ProductsFormComponents,
        ProductsTableComponents
    ],
    imports: [
        CommonModule,
        DemoFlexyModule,
        FormsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        FeatherModule.pick(allIcons),
        RouterModule.forChild(routes)
    ],
    exports: [
        ProductsComponent
    ]
})
export class ProductsModule { }