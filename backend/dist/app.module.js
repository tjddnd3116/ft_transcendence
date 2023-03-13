"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const emailConfig_1 = require("./config/emailConfig");
const validationSchema_1 = require("./config/validationSchema");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const game_module_1 = require("./game/game.module");
const chat_room_module_1 = require("./chat-room/chat-room.module");
const authConfig_1 = require("./config/authConfig");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot({
                envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
                load: [emailConfig_1.default, authConfig_1.default],
                isGlobal: true,
                validationSchema: validationSchema_1.validationSchema,
            }),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig),
            chat_room_module_1.ChatRoomModule,
            game_module_1.GameModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map