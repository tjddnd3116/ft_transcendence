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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const verify_email_dto_1 = require("./dto/verify-email.dto");
const user_login_dto_1 = require("./dto/user-login.dto");
const passport_1 = require("@nestjs/passport");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(createUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    async verifyEmail(dto) {
        const { signupVerifyToken } = dto;
        return await this.usersService.verifyEmail(signupVerifyToken);
    }
    async login(dto) {
        const { email, password } = dto;
        return await this.usersService.login(email, password);
    }
    async getUserInfo(userId) {
        return this.usersService.getUserInfo(userId);
    }
    async updateUserInfo(userId, updateUserDto) {
        return this.usersService.updateUserInfo(userId, updateUserDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '?????? ?????? API', description: '????????? ????????????.' }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/email-verify'),
    (0, swagger_1.ApiOperation)({
        summary: '?????? email ?????? API',
        description: '??????????????? ????????? email ????????? ?????? ????????? ????????????.',
    }),
    (0, swagger_1.ApiBody)({ type: verify_email_dto_1.VerifyEmailDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({
        summary: '?????? ????????? API',
        description: '?????? email, password??? ???????????????.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '?????? ?????? API',
        description: '????????? ????????? ?????????.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: '?????? ?????? ???????????? API',
        description: '????????? ??????(password, img)??? ??????????????????.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserInfo", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('User API'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map