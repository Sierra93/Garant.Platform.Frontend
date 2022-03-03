import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Injectable({
  providedIn: 'root'
})

/**
 * Сервис оповещений.
 */
export class NotifyService {
  connection!: signalR.HubConnection;  

  constructor(private messageService: MessageService) { };

  public initiateSignalrConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(API_URL.apiUrl.concat("/notify"), {
          skipNegotiation: false,
          transport: signalR.HttpTransportType.LongPolling
        })
        .build();

      this.setSignalrClientMethods();

      this.connection
        .start()
        .then((response: any) => {
          resolve(response);
        })
        .catch((error) => {
          reject();
        });
    });
  };

  /**
   * Функция регистрирует все функции фронта, которые может вызвать бэк.
   */
  private setSignalrClientMethods() {
    // Функция отображит уведомление, если пользователь не заполнил данные о себе.
    this.connection.on('SendNotifyEmptyUserInfo', (message: string) => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Внимание',
        detail: message
      });
    });

    // Функция отображит уведомление, когда карточка создана и отправлена на модерацию.
    this.connection.on('SendCardModeration', (message: string) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Успешно',
        detail: message
      });
    });
  };
}