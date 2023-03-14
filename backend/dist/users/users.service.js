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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid = require("uuid");
const email_service_1 = require("../email/email.service");
const rxjs_1 = require("rxjs");
const auth_service_1 = require("../auth/auth.service");
const bcrypt = require("bcryptjs");
const user_repository_1 = require("./user.repository");
let UsersService = class UsersService {
    constructor(emailService, authService, userRepository) {
        this.emailService = emailService;
        this.authService = authService;
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        const { email, name, password } = createUserDto;
        await this.checkUserExists(email);
        const signupVerifyToken = uuid.v1();
        await this.userRepository.saveUser(email, name, password, signupVerifyToken);
        await this.sendMemberJoinEmail(email, signupVerifyToken);
    }
    async checkUserExists(emailAddress) {
        const user = await this.userRepository.findUserByEmail(emailAddress);
        if (user)
            throw new Error('이미 같은 이메일을 사용중입니다.');
    }
    async sendMemberJoinEmail(email, signupVerifyToken) {
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }
    async verifyEmail(signupVerifyToken) {
        const user = await this.userRepository.findUserByToken(signupVerifyToken);
        if (!user)
            throw new rxjs_1.NotFoundError('유저가 존재하지 않습니다.');
        user.isVerified = true;
        this.userRepository.save(user);
        return this.authService.login({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
    async login(email, password) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('유저가 존재하지 않습니다.');
        }
        if (user.isVerified === false) {
            throw new common_1.UnauthorizedException('email 인증이 필요합니다.');
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.authService.login({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        }
        else {
            throw new common_1.UnauthorizedException('비밀번호가 틀렸습니다.');
        }
    }
    async getUserInfo(userId) {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new rxjs_1.NotFoundError('유저가 존재하지 않습니다.');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
    async updateUserInfo(userId, updateUserDto) {
        const { password, avatarImageUrl } = updateUserDto;
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new rxjs_1.NotFoundError('유저가 존재하지 않습니다.');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.avatarImageUrl = avatarImageUrl;
        await this.userRepository.save(user);
        return await this.getUserInfo(userId);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        auth_service_1.AuthService,
        user_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map