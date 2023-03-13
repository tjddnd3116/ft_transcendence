import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatRoomService } from './chat-room.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoomEntity } from './entities/chatRoom.entity';
import { ChatRoomValidationPipe } from './pipes/chat-room-validation.pipe';

@Controller('chat-room')
@UseGuards(AuthGuard())
export class ChatRoomController {
  constructor(private chatRoomService: ChatRoomService) {}

  @Post()
  async createChatRoom(
    @Body(ChatRoomValidationPipe) createChatRoomDto: CreateChatRoomDto,
  ): Promise<ChatRoomEntity> {
    const { name, description, isPrivate } = createChatRoomDto;
    return await this.chatRoomService.createChatRoom(
      name,
      description,
      isPrivate,
    );
  }

  @Post(':chatRoomId/:userId/')
  async sendMessage(): Promise<void> {}

  @Get()
  async getAllChatRoom(): Promise<ChatRoomEntity[]> {
    return await this.chatRoomService.getAllChatRoom();
  }
}
