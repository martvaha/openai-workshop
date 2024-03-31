import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth/auth.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ChatCompletionRequest, ChatCompletionResponse, ChatModel, Message } from "./openai.schema";
import { AuthService } from "./auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { TERMS } from "./database/terms";

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
  messages = signal<Message[]>([]);

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {}

  sendMessage(el: HTMLInputElement) {
    console.log("sending", el.value);
    const model: ChatModel = "gpt-3.5-turbo-0301";
    const key = this.auth.getAuthKey();
    if (!key) return alert("Lisa key");
    const messages: Message[] = [];

    const message: Message = { role: "user", content: el.value };
    this.messages.update((value) => [...value, message]);

    const defs: string[] = [];
    for (const [term, value] of Object.entries(TERMS)) {
      if (message.content.toLowerCase().includes(term.toLowerCase())) {
        defs.push(value);
      }
    }

    messages.push(message);

    const body: ChatCompletionRequest = { model, messages };
    el.value = "";
    this.http
      .post<ChatCompletionResponse>(`https://api.openai.com/v1/chat/completions`, body, {
        headers: { "api-key": key, Authorization: `Bearer ${key}` },
      })
      .subscribe((response) => {
        const reply = response.choices[0].message;
        this.messages.update((value) => [...value, reply]);
      });
  }
}
