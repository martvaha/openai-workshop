import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { AuthDialogComponent } from "./auth-dialog.component";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button (click)="setAuth()">
      @if (authKey) {
      <mat-icon>lock</mat-icon>
      } @else {
      <mat-icon>lock_open</mat-icon>
      }
    </button>
  `,
})
export class AuthComponent implements OnInit {
  authKey: string | null = "";
  constructor(private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit() {
    this.authKey = this.auth.getAuthKey();
  }
  setAuth() {
    const dialogRef = this.dialog.open(AuthDialogComponent, { data: this.authKey });
    dialogRef.afterClosed().subscribe((data) => {
      this.auth.setAuthKey(data);
      this.authKey = data;
    });
  }
}
