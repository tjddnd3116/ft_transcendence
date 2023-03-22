declare const _default: (() => {
    jwtSecret: string;
    clientId: string;
    clientSecret: string;
    callbackUri: string;
    authorizationURL: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwtSecret: string;
    clientId: string;
    clientSecret: string;
    callbackUri: string;
    authorizationURL: string;
}>;
export default _default;
