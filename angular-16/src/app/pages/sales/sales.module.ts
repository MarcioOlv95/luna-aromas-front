import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FeatherModule } from "angular-feather";
import { allIcons } from "angular-feather/icons";
import { DemoFlexyModule } from "src/app/demo-flexy-module";
import { SalesComponent } from "./sales.component";
import { RouterModule, Routes } from "@angular/router";
import { MatDatepickerModule } from "@angular/material/datepicker";

const routes: Routes = [
    {path: '', component: SalesComponent}
]

@NgModule({
    declarations: [
        SalesComponent
    ],
    imports: [
        CommonModule,
        DemoFlexyModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatDatepickerModule,
        FeatherModule.pick(allIcons),
        RouterModule.forChild(routes)
    ],
    exports: [
        SalesComponent
    ]
})
export class SalesModule { }