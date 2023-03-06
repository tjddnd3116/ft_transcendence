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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid = require("uuid");
const email_service_1 = require("../email/email.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const ulid_1 = require("ulid");
const auth_service_1 = require("../auth/auth.service");
let UsersService = class UsersService {
    constructor(emailService, userRepository, authService) {
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async createUser(name, email, password) {
        const userExist = await this.checkUserExists(email);
        if (userExist) {
            throw new common_1.UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.');
        }
        const signupVerifyToken = uuid.v1();
        await this.saveUser(name, email, password, signupVerifyToken);
        await this.sendMemberJoinEmail(email, signupVerifyToken);
    }
    async checkUserExists(emailAddress) {
        const user = await this.userRepository.findOne({
            where: { email: emailAddress },
        });
        return user != undefined;
    }
    async saveUser(name, email, password, signupVerifyToken) {
        const user = new user_entity_1.UserEntity();
        user.id = (0, ulid_1.ulid)();
        user.name = name;
        user.email = email;
        user.password = password;
        user.signupVerifyToken = signupVerifyToken;
        await this.userRepository.save(user);
    }
    async sendMemberJoinEmail(email, signupVerifyToken) {
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }
    async verifyEmail(signupVerifyToken) {
        const user = await this.userRepository.findOne({
            where: { signupVerifyToken },
        });
        if (!user) {
            throw new common_1.NotFoundException('유저가 존재하지 않습니다');
        }
        return this.authService.login({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({
            where: { email, password },
        });
        if (!user) {
            throw new common_1.NotFoundException('유저가 조재하지 않습니다');
        }
        return this.authService.login({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
    async getUserInfo(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('유저가 존재하지 않습니다');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
    findOne(id) {
        return id;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        typeorm_2.Repository,
        auth_service_1.AuthService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map