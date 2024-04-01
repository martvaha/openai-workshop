import { Injectable } from "@angular/core";

const OPEN_AI_AUTH_KEY_NAME = "openai-key";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor() {}

  setAuthKey(value: string | undefined) {
    localStorage.setItem(OPEN_AI_AUTH_KEY_NAME, value ?? "");
  }

  getAuthKey() {
    return localStorage.getItem(OPEN_AI_AUTH_KEY_NAME);
  }
}
