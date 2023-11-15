import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth/auth.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Observable } from "rxjs";
import { Message } from "./openai.schema";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app",
  standalone: true,
  imports: [
    CommonModule,
    AuthComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
