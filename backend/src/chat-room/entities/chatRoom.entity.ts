import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity({ name: 'chat_rooms' })
export class ChatRoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'is_private' })
  isPrivate: boolean;

  @OneToMany(() => MessageEntity, (message) => message.chatRoom)
  messages: MessageEntity[];
}
