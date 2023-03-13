import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoomEntity } from './entities/chatRoom.entity';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private chatRoomRepository: Repository<ChatRoomEntity>,
  ) {}

  async createChatRoom(
    name: string,
    description: string,
    isPrivate: boolean,
  ): Promise<ChatRoomEntity> {
    const chatRoom = await this.createNewChat(name, description, isPrivate);

    return chatRoom;
  }

  async createNewChat(
    name: string,
    description: string,
    isPrivate: boolean,
  ): Promise<ChatRoomEntity> {
    const newChatRoom = new ChatRoomEntity();

    newChatRoom.name = name;
    newChatRoom.description = description;
    newChatRoom.isPrivate = isPrivate;
    await this.chatRoomRepository.save(newChatRoom);
    return newChatRoom;
  }

  async getAllChatRoom(): Promise<ChatRoomEntity[]> {
    const found = await this.chatRoomRepository.find();
    return found;
  }
}
