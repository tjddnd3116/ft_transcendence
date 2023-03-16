import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatRoomInfo } from './chat-room-info';
import { ChatRoomRepository } from './chat-room.repository';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoomEntity } from './entities/chatRoom.entity';

@Injectable()
export class ChatRoomService {
  constructor(private chatRoomRepository: ChatRoomRepository) {}

  async createChatRoom(
    createChatRoomDto: CreateChatRoomDto,
    user: UserEntity,
  ): Promise<void> {
    await this.chatRoomRepository.createNewChatRoom(createChatRoomDto, user);
  }

  async getAllChatRooms(): Promise<ChatRoomInfo[]> {
    const found = await this.chatRoomRepository.getAllChatRooms();
    const chatRoomArr: ChatRoomInfo[] = new Array<ChatRoomInfo>();
    found.forEach((value) => {
      chatRoomArr.push({
        name: value.name,
        owner: value.owner.name,
        isPrivate: value.isPrivate,
      });
    });
    return chatRoomArr;
  }

  async getChatRoom(chatRoomId: number): Promise<ChatRoomEntity> {
    return await this.chatRoomRepository.getChatRoom(chatRoomId);
  }
}
