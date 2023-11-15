import { Component } from "@angular/core";
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
  messageSubject = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {}

  sendMessage(el: HTMLInputElement) {
    const deployment: ChatModel = "gpt-35-turbo-0613";
    const key = this.auth.getAuthKey();
    if (!key) return alert("Lisa key");
    const messages: Message[] = [];

    const message: Message = { role: "user", content: el.value };
    this.messageSubject.next([...this.messageSubject.value, message]);

    const defs: string[] = [];
    for (const [term, value] of Object.entries(TERMS)) {
      if (message.content.toLowerCase().includes(term.toLowerCase())) {
        defs.push(value);
      }
    }
    messages.push({
      role: "system",
      content:
        "You are a chatbot that explains word meaning to the user. If you are provided word definitions then use them.",
    });

    if (defs.length) {
      messages.push({ role: "system", content: "# Definitions\n" + defs.join("\n") });
    }

    messages.push(message);

    const body: ChatCompletionRequest = { messages };
    el.value = "";
    this.http
      .post<ChatCompletionResponse>(
        `https://ee-elisa-openai-france-central.openai.azure.com/openai/deployments/${deployment}/chat/completions?api-version=2023-07-01-preview`,
        body,
        { headers: { "api-key": key } }
      )
      .subscribe((response) => {
        this.messageSubject.next([...this.messageSubject.value, response.choices[0].message]);
      });
  }
}
