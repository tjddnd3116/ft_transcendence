import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatRoomInfo } from './chat-room-info';
import { ChatRoomService } from './chat-room.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoomValidationPipe } from './pipes/chat-room-validation.pipe';

@Controller('chat-room')
@UseGuards(AuthGuard())
export class ChatRoomController {
  constructor(private chatRoomService: ChatRoomService) {}

  @Post()
  async createChatRoom(
    @Body(ChatRoomValidationPipe) createChatRoomDto: CreateChatRoomDto,
    @getUser() user: UserEntity,
  ): Promise<void> {
    await this.chatRoomService.createChatRoom(createChatRoomDto, user);
  }

  @Post(':id/private')
  async enterPrivateChatRoom(
    @Body('password') password: string,
    @Param('id') chatRoomId: number,
  ): Promise<boolean> {
    const found = await this.chatRoomService.getChatRoom(chatRoomId);

    if (found.password === password) return true;
    return false;
  }

  // @Post(':chatRoomId/:userId/')
  // async sendMessage(): Promise<void> {}

  @Get()
  async getAllChatRooms(): Promise<ChatRoomInfo[]> {
    return await this.chatRoomService.getAllChatRooms();
  }

  // @Get(':id')
  // async getChatRoom(@Param('id') chatRoomId: number): Promise<ChatRoomInfo> {
  //   const found = await this.chatRoomService.getChatRoom(chatRoomId);
  //
  //   if (!found) {
  //     throw new NotFoundException(`${chatRoomId}는 없는 방입니다.`);
  //   }
  //
  //   if (found.isPrivate && await this.enterPrivateChatRoom(, chatRoomId)) {
  //   }
  // }
}
