import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Mocion } from 'src/entities/Mocion.entity';
import { ResultadosMocion } from 'src/entities/ResultadosMocion.entity';

@WebSocketGateway(
  {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    }
  }
)
export class MocionGateway {
  @WebSocketServer()
  server: Server;

  emitMocionCreada(mocion: Mocion) {
    this.server.emit('mocionCreada', mocion);
  }

  emitMocionInactiva(idMocion: string) {
    this.server.emit('mocionInactiva', idMocion);
  }

  emitResultadosMocion(resultados: ResultadosMocion) {
    this.server.emit('resultadosMocion', resultados);
  }
}
