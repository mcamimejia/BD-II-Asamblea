import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MocionGateway {
  @WebSocketServer()
  server: Server;

  emitMocionCreada(mocion: any) {
    this.server.emit('mocionCreada', mocion);
  }

  emitMocionInactiva(idMocion: string) {
    this.server.emit('mocionInactiva', { id: idMocion });
  }

  emitResultadosMocion(idMocion: string) {
    this.server.emit('resultadosMocion', { id: idMocion });
  }
}
