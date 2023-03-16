import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway()
export class ChatRoomGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private authService: AuthService) {}

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): string {
    client.to(client.rooms[1]).emit('message', payload);
    return payload;
  }

  @SubscribeMessage('enterChatRoom')
  enterChatRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomName: string,
  ) {
    client.join(roomName);
  }

  async handleConnection(socket: Socket): Promise<void> {
    const bool = this.authService.isVerifiedToken(socket);
    console.log(bool);
    console.log('connected', socket.id);
  }

  async handleDisconnect(client: Socket) {
    // console.log(client);
  }
}
