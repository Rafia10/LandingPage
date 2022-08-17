import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Command,
  NotificationsServiceService,
} from '../notifications-service.service';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  messages: Observable<Command[]>;

  constructor(private notificationsService: NotificationsServiceService) {
    this.messages = this.notificationsService.messagesOutput;
  }

  clearMessage(id: number) {
    this.notificationsService.clearMessage(id);
  }

  ngOnInit(): void {}
}