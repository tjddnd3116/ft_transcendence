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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const authConfig_1 = require("../config/authConfig");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(config, jwtService) {
        this.config = config;
        this.jwtService = jwtService;
    }
    login(user) {
        const payload = Object.assign({}, user);
        return this.jwtService.sign(payload);
    }
    isVerifiedToken(socket) {
        const auth = socket.handshake.headers.authorization;
        const token = auth.split(' ')[1];
        console.log(token);
        const payload = this.jwtService.verify(token);
        console.log(payload);
        if (!payload) {
            return false;
        }
        return true;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(authConfig_1.default.KEY)),
    __metadata("design:paramtypes", [void 0, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map