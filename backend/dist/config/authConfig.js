"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('auth', () => ({
    jwtSecret: process.env.JWT_SECRET,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUri: process.env.CALLBACK_URI,
    authorizationURL: process.env.AUTHORIZATION_URI,
}));
//# sourceMappingURL=authConfig.js.map