import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatRoomInfo } from './chat-room-info';
import { ChatRoomService } from './chat-room.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { EnterChatRoomDto } from './dto/enter-chat-room.dto';
import { ChatRoomEntity } from './entities/chatRoom.entity';
import { ChatRoomValidationPipe } from './pipes/chat-room-validation.pipe';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';

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

  @Post(':id')
  async enterChatRoom(@Body() enterChatRoomDto: EnterChatRoomDto) {
    const chatRoom = await this.chatRoomService.getChatRoom(
      enterChatRoomDto.id,
    );

    if (
      chatRoom.isPrivate === true &&
      chatRoom.password !== enterChatRoomDto.password
    ) {
      throw new ForbiddenException('password가 틀렸습니다.');
    }
    return chatRoom;
  }

  @Get()
  async getAllChatRooms(): Promise<ChatRoomInfo[]> {
    return await this.chatRoomService.getAllChatRooms();
  }

  @Get(':id')
  async getChatRoom(@Param('id') chatRoomId: number): Promise<ChatRoomEntity> {
    return await this.chatRoomService.getChatRoom(chatRoomId);
  }

  // @Patch(':id')
  // async updateChatRoom(
  //   @Param('id') roomId: number,
  //   @Body() updateChatRoomDto: UpdateChatRoomDto,
  //   @getUser() userInfo: UserEntity,) {
  // ) {
  // }
}
