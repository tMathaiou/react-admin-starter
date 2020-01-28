import socketIo from 'socket.io-client';
import {Observable, Subscriber} from 'rxjs';
import {DefaultConfig} from "../defaultConfig";

const SERVER_URL = DefaultConfig.socketsUrl;

export class SocketService {
  public static socket: any;

  public static initSocket(): void {
    let token: any;
    try {
      token = localStorage.getItem('tokenValidation');
    } catch (e) {
      throw new Error(e);
    }

    if (token) {
      this.socket = socketIo(SERVER_URL, {query: `token=${token}`});
    }
  }


  public static getSocket(): any {
    if (!SocketService.socket) {
      SocketService.initSocket();
    }
    return this;
  }

  public static send(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  public static onEvent(event: any): Observable<any> {
    return new Observable<any>((observer: Subscriber<any>): void =>
      this.socket.on(event, (data: any) => observer.next(data)));
  }
}
