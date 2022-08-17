import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, scan } from 'rxjs';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}
@Injectable({
  providedIn: 'root',
})
export class NotificationsServiceService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>(); //before calling method we need our subject to be ready to go
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Command[], value: Command) => {
        if (value.type === 'clear') {
          return acc.filter((message) => message.id !== value.id);
        } else {
          return [...acc, value];
        }
      }, [])
    );
  }
  //Without creating Subject each time we will create variable and assign it Subject

  addSuccess(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id: this.randomId(),
      text: message,
      type: 'success',
    });

    this.clearMessage(id);
  }
  addError(message: string) {
    const id = this.randomId();

    this.messagesInput.next({
      id,
      text: message,
      type: 'error',
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }
  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }
  private randomId() {
    return Math.round(Math.random() * 1000);
  }
}
