import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PipesModule } from "app/pipes/pipes.module";
import { LearnComponent } from "./learn.component";
import { LearnRoutes } from "./learn.routing";


@NgModule({
  declarations: [LearnComponent],
  imports: [
    FormsModule,
    CommonModule,
    PipesModule,
    RouterModule.forChild(LearnRoutes),
  ]
})
export class LearnModule { }
