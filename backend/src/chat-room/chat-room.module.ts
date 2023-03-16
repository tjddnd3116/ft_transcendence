import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ChatRoomController } from './chat-room.controller';
import { ChatRoomRepository } from './chat-room.repository';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomEntity } from './entities/chatRoom.entity';
import { ChatRoomGateway } from './chat-room.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomEntity]), AuthModule],
  controllers: [ChatRoomController],
  providers: [ChatRoomService, ChatRoomRepository, ChatRoomGateway],
})
export class ChatRoomModule {}
