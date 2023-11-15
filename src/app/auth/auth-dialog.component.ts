import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-auth-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  template: `
    <h1 mat-dialog-title>OpenAI API key</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Key</mat-label>
        <input matInput [(ngModel)]="data" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
    </div>
  `,
})
export class AuthDialogComponent {
  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
