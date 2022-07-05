import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnChanges {
  constructor(private snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      const message = changes['message'].currentValue;
      if (message !== '') {
        this.snackBarRef = this.snackBar.open(message, 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.snackBarRef.onAction().subscribe(() => this.read.emit());
      }
    }
  }

  @Input() message: string = '';

  @Output() read: EventEmitter<any> = new EventEmitter<any>();

  snackBarRef: MatSnackBarRef<TextOnlySnackBar> | null = null;
}
