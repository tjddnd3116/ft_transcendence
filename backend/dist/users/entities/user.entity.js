"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const game_session_entity_1 = require("../../game/entities/game-session.entity");
const typeorm_1 = require("typeorm");
const friendship_entity_1 = require("./friendship.entity");
let UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], UserEntity.prototype, "signupVerifyToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avatar_image_url' }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatarImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_date' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "registrationDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => game_session_entity_1.GameSessionEntity, (gameSession) => gameSession.winner),
    __metadata("design:type", Array)
], UserEntity.prototype, "wonGames", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friendship_entity_1.FriendShipEntity, (friendship) => friendship.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "friendships", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friendship_entity_1.FriendShipEntity, (friendship) => friendship.friend),
    __metadata("design:type", Array)
], UserEntity.prototype, "friendOf", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('User')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map