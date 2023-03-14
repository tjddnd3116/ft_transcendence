import { GameSessionEntity } from 'src/game/entities/game-session.entity';
import { FriendShipEntity } from './friendship.entity';
export declare class UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    signupVerifyToken: string;
    avatarImageUrl: string;
    registrationDate: Date;
    isVerified: boolean;
    wonGames: GameSessionEntity[];
    friendships: FriendShipEntity[];
    friendOf: FriendShipEntity[];
}
