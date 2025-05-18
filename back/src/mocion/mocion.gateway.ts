import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MocionGateway {
  @WebSocketServer()
  server: Server;

  emitMocionCreada(mocion: any) {
    this.server.emit('mocionCreada', mocion);
  }

  emitMocionEliminada(idMocion: string) {
    this.server.emit('mocionEliminada', { id: idMocion });
  }
}
