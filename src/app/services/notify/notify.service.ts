import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Injectable({
  providedIn: 'root'
})

/**
 * Сервис оповещений.
 */
export class NotifyService {
  connection!: signalR.HubConnection;
  hubHelloMessage: BehaviorSubject<any>;

  constructor() { 
    this.hubHelloMessage = new BehaviorSubject<any>(null);
  };

  public initiateSignalrConnection(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(API_URL.apiUrl.concat("/notify")) 
        .build();

        this.setSignalrClientMethods();
  
      this.connection
        .start()
        .then((response: any) => {
          console.log(`SignalR connection success! connectionId: ${this.hubHelloMessage} `);
          resolve(response);
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
          reject();
        });
    });
  };

  private setSignalrClientMethods() {
    this.connection.on('SendNotifyEmptyUserInfo', (message: any) => {
      // this.hubHelloMessage.next(message);
      console.log(message);
    });
  };
}