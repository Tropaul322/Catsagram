/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
__webpack_require__("dotenv/config");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const config_1 = __webpack_require__("@nestjs/config");
const cat_module_1 = __webpack_require__("./src/app/cats/cat.module.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const apollo_1 = __webpack_require__("@nestjs/apollo");
const comments_module_1 = __webpack_require__("./src/app/comments/comments.module.ts");
const users_module_1 = __webpack_require__("./src/app/users/users.module.ts");
const cat_entity_1 = __webpack_require__("./src/app/cats/entities/cat.entity.ts");
const comment_entity_1 = __webpack_require__("./src/app/comments/entities/comment.entity.ts");
const user_entity_1 = __webpack_require__("./src/app/users/entities/user.entity.ts");
const auth_module_1 = __webpack_require__("./src/app/auth/auth.module.ts");
const dataloader_service_1 = __webpack_require__("./src/app/dataloader/dataloader.service.ts");
const dataloader_module_1 = __webpack_require__("./src/app/dataloader/dataloader.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            graphql_1.GraphQLModule.forRootAsync({
                imports: [dataloader_module_1.DataloaderModule],
                driver: apollo_1.ApolloDriver,
                useFactory: (dataloaderService) => {
                    return {
                        autoSchemaFile: './apps/api/schema.gql',
                        cors: {
                            origin: 'http://35.179.74.235:4200',
                            credentials: true,
                        },
                        sortSchema: true,
                        playground: true,
                        installSubscriptionHandlers: true,
                        context: ({ req, res }) => ({
                            loaders: dataloaderService.getLoaders(),
                            req,
                            res,
                        }),
                    };
                },
                inject: [dataloader_service_1.DataloaderService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        type: process.env.TYPEORM_CONNECTION,
                        username: process.env.TYPEORM_USERNAME,
                        password: process.env.TYPEORM_PASSWORD,
                        host: process.env.TYPEORM_HOST,
                        port: process.env.TYPEORM_PORT,
                        database: process.env.TYPEORM_DATABASE,
                        entities: [cat_entity_1.CatEntity, user_entity_1.User, comment_entity_1.CommentEntity],
                        synchronize: true,
                    });
                }),
            }),
            cat_module_1.CatsModule,
            comments_module_1.CommentsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const jwt_strategy_1 = __webpack_require__("./src/app/auth/jwt.strategy.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const users_module_1 = __webpack_require__("./src/app/users/users.module.ts");
const local_stategy_1 = __webpack_require__("./src/app/auth/local.stategy.ts");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
const auth_resolver_1 = __webpack_require__("./src/app/auth/auth.resolver.ts");
const passport_1 = __webpack_require__("@nestjs/passport");
const config_1 = __webpack_require__("@nestjs/config");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            passport_1.PassportModule,
            users_module_1.UsersModule,
            jwt_1.JwtModule.register({
                signOptions: { expiresIn: '40m' },
                secret: process.env.JWT_SECRET,
            }),
        ],
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver, local_stategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./src/app/auth/auth.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const jwt_auth_guard_1 = __webpack_require__("./src/app/auth/jwt-auth.guard.ts");
const gql_auth_guard_1 = __webpack_require__("./src/app/auth/gql-auth.guard.ts");
const auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const login_response_1 = __webpack_require__("./src/app/auth/dto/login-response.ts");
const login_user_input_1 = __webpack_require__("./src/app/auth/dto/login-user.input.ts");
const common_1 = __webpack_require__("@nestjs/common");
const user_entity_1 = __webpack_require__("./src/app/users/entities/user.entity.ts");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    login(res, loginUserInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.authService.login(loginUserInput);
            res.cookie('access_token', data.access_token);
            res.cookie('refresh_token', data.refresh_token);
            return data;
        });
    }
    singUp(loginUserInput) {
        return this.authService.signUp(loginUserInput);
    }
    refresh(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.authService.refresh(req.cookies['refresh_token']);
            res.cookie('access_token', data.access_token);
            res.cookie('refresh_token', data.refresh_token);
            return data;
        });
    }
    checkAuth(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(req.user);
            return req.user;
        });
    }
};
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => login_response_1.LoginResponse),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Context)('res')),
    tslib_1.__param(1, (0, graphql_1.Args)('loginUserInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof login_user_input_1.LoginUserInput !== "undefined" && login_user_input_1.LoginUserInput) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => login_response_1.LoginResponse),
    tslib_1.__param(0, (0, graphql_1.Args)('loginUserInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof login_user_input_1.LoginUserInput !== "undefined" && login_user_input_1.LoginUserInput) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthResolver.prototype, "singUp", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => login_response_1.LoginResponse),
    tslib_1.__param(0, (0, graphql_1.Context)('req')),
    tslib_1.__param(1, (0, graphql_1.Context)('res')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "refresh", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Context)('req')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "checkAuth", null);
AuthResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthResolver);
exports.AuthResolver = AuthResolver;


/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const users_service_1 = __webpack_require__("./src/app/users/users.service.ts");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const bcrypt = tslib_1.__importStar(__webpack_require__("bcryptjs"));
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateUser(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne(email);
            const valid = bcrypt.compareSync(password, user.password);
            if (user && valid) {
                const { password } = user, result = tslib_1.__rest(user, ["password"]);
                return result;
            }
            return null;
        });
    }
    login(loginUserInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne(loginUserInput.email);
            console.log(loginUserInput);
            const { password } = user, result = tslib_1.__rest(user, ["password"]);
            return {
                access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
                refresh_token: this.jwtService.sign({ email: user.email, sub: user.id }, { expiresIn: '50m' }),
                user: Object.assign(Object.assign({}, result), { id: user.id }),
            };
        });
    }
    refresh(refresh_token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const _a = this.jwtService.verify(refresh_token), { email, sub } = _a, rest = tslib_1.__rest(_a, ["email", "sub"]);
            return {
                access_token: this.jwtService.sign({ email, sub }),
                refresh_token: this.jwtService.sign({ email, sub }, { expiresIn: '50m' }),
                user: {
                    email,
                    id: sub,
                },
            };
        });
    }
    signUp(loginUserInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne(loginUserInput.email);
            if (user) {
                throw new Error('User already exists!');
            }
            const password = yield bcrypt.hashSync(loginUserInput.password, 10);
            return this.usersService.create(Object.assign(Object.assign({}, loginUserInput), { password }));
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/auth/dto/login-response.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginResponse = void 0;
const tslib_1 = __webpack_require__("tslib");
const user_entity_1 = __webpack_require__("./src/app/users/entities/user.entity.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let LoginResponse = class LoginResponse {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], LoginResponse.prototype, "user", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LoginResponse.prototype, "access_token", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LoginResponse.prototype, "refresh_token", void 0);
LoginResponse = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], LoginResponse);
exports.LoginResponse = LoginResponse;


/***/ }),

/***/ "./src/app/auth/dto/login-user.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUserInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let LoginUserInput = class LoginUserInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LoginUserInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LoginUserInput.prototype, "password", void 0);
LoginUserInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], LoginUserInput);
exports.LoginUserInput = LoginUserInput;


/***/ }),

/***/ "./src/app/auth/gql-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const passport_1 = __webpack_require__("@nestjs/passport");
let GqlAuthGuard = class GqlAuthGuard extends (0, passport_1.AuthGuard)('local') {
    constructor() {
        super();
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext();
        request.body = ctx.getArgs().loginUserInput;
        console.log(ctx.getArgs().loginUserInput);
        return request;
    }
};
GqlAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;


/***/ }),

/***/ "./src/app/auth/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./src/app/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
};
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { id: payload.sub, email: payload.email };
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./src/app/auth/local.stategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_local_1 = __webpack_require__("passport-local");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: 'email',
        });
        this.authService = authService;
    }
    validate(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(email, password);
            const user = yield this.authService.validateUser(email, password);
            if (!user) {
                console.log('Error');
                throw new common_1.UnauthorizedException();
            }
            return user;
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./src/app/cats/cat.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const cat_service_1 = __webpack_require__("./src/app/cats/cat.service.ts");
let CatController = class CatController {
    constructor(catService) {
        this.catService = catService;
    }
    sse() {
        return this.catService.subscribe();
    }
};
tslib_1.__decorate([
    (0, common_1.Sse)('notifications'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CatController.prototype, "sse", null);
CatController = tslib_1.__decorate([
    (0, common_1.Controller)('cat'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cat_service_1.CatService !== "undefined" && cat_service_1.CatService) === "function" ? _a : Object])
], CatController);
exports.CatController = CatController;


/***/ }),

/***/ "./src/app/cats/cat.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const comments_module_1 = __webpack_require__("./src/app/comments/comments.module.ts");
const comment_entity_1 = __webpack_require__("./src/app/comments/entities/comment.entity.ts");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const microservices_1 = __webpack_require__("@nestjs/microservices");
const cat_entity_1 = __webpack_require__("./src/app/cats/entities/cat.entity.ts");
const cat_service_1 = __webpack_require__("./src/app/cats/cat.service.ts");
const cat_resolver_1 = __webpack_require__("./src/app/cats/cat.resolver.ts");
const cat_controller_1 = __webpack_require__("./src/app/cats/cat.controller.ts");
let CatsModule = class CatsModule {
};
CatsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => comments_module_1.CommentsModule),
            typeorm_1.TypeOrmModule.forFeature([cat_entity_1.CatEntity, comment_entity_1.CommentEntity]),
            microservices_1.ClientsModule.register([
                {
                    name: 'CAT_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://rmqM:5672'],
                        queue: 'cats_queue',
                        queueOptions: {
                            durable: false,
                        },
                    },
                },
            ]),
        ],
        providers: [cat_service_1.CatService, cat_resolver_1.CatResolver],
        controllers: [cat_controller_1.CatController],
        exports: [cat_service_1.CatService],
    })
], CatsModule);
exports.CatsModule = CatsModule;


/***/ }),

/***/ "./src/app/cats/cat.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const comments_service_1 = __webpack_require__("./src/app/comments/comments.service.ts");
const create_cat_input_1 = __webpack_require__("./src/app/cats/inputs/create-cat.input.ts");
const cat_entity_1 = __webpack_require__("./src/app/cats/entities/cat.entity.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const cat_service_1 = __webpack_require__("./src/app/cats/cat.service.ts");
const graphql_subscriptions_1 = __webpack_require__("graphql-subscriptions");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__("./src/app/auth/jwt-auth.guard.ts");
const pubSub = new graphql_subscriptions_1.PubSub();
let CatResolver = class CatResolver {
    constructor(catService, commentsService) {
        this.catService = catService;
        this.commentsService = commentsService;
    }
    catLiked() {
        return pubSub.asyncIterator('catLiked');
    }
    createCat(cat) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.catService.createCat(cat);
        });
    }
    cats() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('first');
            return yield this.catService.findAll();
        });
    }
    cat(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cat = yield this.catService.findOne(id);
            return Object.assign({}, cat);
        });
    }
    likeCat(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cat = yield this.catService.findOne(id);
            pubSub.publish('catLiked', { catLiked: cat });
            return yield this.catService.like(id);
        });
    }
    deleteCat(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedCat = yield this.catService.delete(id);
            return deletedCat;
        });
    }
    //--------Comments--------//
    comments(cat, { loaders }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = cat;
            console.log(id);
            return loaders.commentsLoader.load(id);
        });
    }
};
tslib_1.__decorate([
    (0, graphql_1.Subscription)(() => cat_entity_1.CatEntity, {
        name: 'catLiked',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CatResolver.prototype, "catLiked", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => cat_entity_1.CatEntity),
    tslib_1.__param(0, (0, graphql_1.Args)('createCat')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof create_cat_input_1.CreateCatInput !== "undefined" && create_cat_input_1.CreateCatInput) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CatResolver.prototype, "createCat", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [cat_entity_1.CatEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CatResolver.prototype, "cats", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => cat_entity_1.CatEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CatResolver.prototype, "cat", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => cat_entity_1.CatEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CatResolver.prototype, "likeCat", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => Number)
    // @UseGuards(JwtAuthGuard)
    ,
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CatResolver.prototype, "deleteCat", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveProperty)(),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__param(1, (0, graphql_1.Context)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof PromiseOfPropType !== "undefined" && PromiseOfPropType) === "function" ? _j : Object)
], CatResolver.prototype, "comments", null);
CatResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => cat_entity_1.CatEntity),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cat_service_1.CatService !== "undefined" && cat_service_1.CatService) === "function" ? _a : Object, typeof (_b = typeof comments_service_1.CommentsService !== "undefined" && comments_service_1.CommentsService) === "function" ? _b : Object])
], CatResolver);
exports.CatResolver = CatResolver;


/***/ }),

/***/ "./src/app/cats/cat.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const cat_entity_1 = __webpack_require__("./src/app/cats/entities/cat.entity.ts");
const microservices_1 = __webpack_require__("@nestjs/microservices");
const events_1 = __webpack_require__("events");
const rxjs_1 = __webpack_require__("rxjs");
let CatService = class CatService {
    constructor(client, catRepository) {
        this.client = client;
        this.catRepository = catRepository;
        this.emitter = new events_1.EventEmitter();
    }
    subscribe() {
        return (0, rxjs_1.fromEvent)(this.emitter, 'notification');
    }
    emit(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.emitter.emit('notification', { data });
        });
    }
    createCat(cat) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newCat = this.catRepository.create(cat);
            const createdCat = yield this.catRepository.save(newCat);
            yield this.client.emit('cat-created', createdCat);
            yield this.emit({ message: 'Cat created', key: ['GetCats'] });
            return createdCat;
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cats = yield this.catRepository.find();
            console.log(cats);
            return cats;
        });
    }
    like(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cat = yield this.catRepository.findOne(id);
            cat.likes++;
            yield this.catRepository.save(cat);
            yield this.emit({ message: `Cat liked: ${id}`, key: ['GetCats'] });
            return cat;
        });
    }
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cat = yield this.catRepository.findOne(id);
            return cat;
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cat = yield this.catRepository.findOne(id);
            yield this.catRepository.remove(cat);
            yield this.client.emit('cat-deleted', cat);
            yield this.emit({ message: `Cat deleted: ${id}`, key: ['GetCats'] });
            return id;
        });
    }
};
CatService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)('CAT_SERVICE')),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(cat_entity_1.CatEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], CatService);
exports.CatService = CatService;


/***/ }),

/***/ "./src/app/cats/entities/cat.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const typeorm_1 = __webpack_require__("typeorm");
const comment_entity_1 = __webpack_require__("./src/app/comments/entities/comment.entity.ts");
let CatEntity = class CatEntity {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CatEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CatEntity.prototype, "url", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CatEntity.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (comment) => comment.cat),
    (0, graphql_1.Field)(() => [comment_entity_1.CommentEntity]),
    tslib_1.__metadata("design:type", Array)
], CatEntity.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CatEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CatEntity.prototype, "updatedAt", void 0);
CatEntity = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('cats', { orderBy: { id: "DESC" } })
], CatEntity);
exports.CatEntity = CatEntity;


/***/ }),

/***/ "./src/app/cats/inputs/create-cat.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCatInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreateCatInput = class CreateCatInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], CreateCatInput.prototype, "url", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], CreateCatInput.prototype, "likes", void 0);
CreateCatInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateCatInput);
exports.CreateCatInput = CreateCatInput;


/***/ }),

/***/ "./src/app/comments/comments.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const comments_service_1 = __webpack_require__("./src/app/comments/comments.service.ts");
const comments_resolver_1 = __webpack_require__("./src/app/comments/comments.resolver.ts");
const cat_module_1 = __webpack_require__("./src/app/cats/cat.module.ts");
const cat_entity_1 = __webpack_require__("./src/app/cats/entities/cat.entity.ts");
const comment_entity_1 = __webpack_require__("./src/app/comments/entities/comment.entity.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
let CommentsModule = class CommentsModule {
};
CommentsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => cat_module_1.CatsModule),
            typeorm_1.TypeOrmModule.forFeature([cat_entity_1.CatEntity, comment_entity_1.CommentEntity]),
        ],
        providers: [comments_service_1.CommentsService, comments_resolver_1.CommentsResolver],
        exports: [comments_service_1.CommentsService],
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;


/***/ }),

/***/ "./src/app/comments/comments.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const comments_service_1 = __webpack_require__("./src/app/comments/comments.service.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const comment_entity_1 = __webpack_require__("./src/app/comments/entities/comment.entity.ts");
const create_comment_input_1 = __webpack_require__("./src/app/comments/inputs/create-comment.input.ts");
const cat_service_1 = __webpack_require__("./src/app/cats/cat.service.ts");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__("./src/app/auth/jwt-auth.guard.ts");
let CommentsResolver = class CommentsResolver {
    constructor(commentsService, CatsService) {
        this.commentsService = commentsService;
        this.CatsService = CatsService;
    }
    comments(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commentsService.findComments(id);
        });
    }
    createComment(comment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commentsService.createComment(comment);
        });
    }
    cat(comments) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { catId } = comments;
            return yield this.CatsService.findOne(catId);
        });
    }
};
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [comment_entity_1.CommentEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CommentsResolver.prototype, "comments", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => comment_entity_1.CommentEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('comment')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof create_comment_input_1.CreateCommentInput !== "undefined" && create_comment_input_1.CreateCommentInput) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CommentsResolver.prototype, "createComment", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveProperty)(),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof comment_entity_1.CommentEntity !== "undefined" && comment_entity_1.CommentEntity) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommentsResolver.prototype, "cat", null);
CommentsResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => comment_entity_1.CommentEntity),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof comments_service_1.CommentsService !== "undefined" && comments_service_1.CommentsService) === "function" ? _a : Object, typeof (_b = typeof cat_service_1.CatService !== "undefined" && cat_service_1.CatService) === "function" ? _b : Object])
], CommentsResolver);
exports.CommentsResolver = CommentsResolver;


/***/ }),

/***/ "./src/app/comments/comments.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const cat_service_1 = __webpack_require__("./src/app/cats/cat.service.ts");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const comment_entity_1 = __webpack_require__("./src/app/comments/entities/comment.entity.ts");
const typeorm_2 = __webpack_require__("typeorm");
let CommentsService = class CommentsService {
    constructor(commentsRepository, catsService) {
        this.commentsRepository = commentsRepository;
        this.catsService = catsService;
    }
    findComments(catId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commentsRepository.find({
                where: { cat: catId },
                order: { createdAt: -1 },
            });
        });
    }
    createComment(comment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { text, catId } = comment;
            console.log(comment);
            const newComment = this.commentsRepository.create({ text, catId });
            const createdComment = yield this.commentsRepository.save(newComment);
            yield this.catsService.emit({
                message: `CommentCreated`,
                key: ['getById'],
            });
            return createdComment;
        });
    }
    getCatsComments(catId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.findComments(catId);
        });
    }
    getAllFriendsByStudentIds(catsIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`SELECT * FROM friends WHERE studentId IN (${catsIds.join(',')})`);
            return this.commentsRepository.find({
                where: { catId: (0, typeorm_2.In)(catsIds) },
                loadRelationIds: true,
            });
        });
    }
    getCatsCommentsByBatch(catsIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const comments = yield this.getAllFriendsByStudentIds(catsIds);
            const mappedResults = this._mapResultToIds(catsIds, comments);
            return mappedResults;
        });
    }
    _mapResultToIds(catsId, comments) {
        return catsId.map((id) => comments.filter((comm) => comm.catId === id));
    }
};
CommentsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof cat_service_1.CatService !== "undefined" && cat_service_1.CatService) === "function" ? _b : Object])
], CommentsService);
exports.CommentsService = CommentsService;


/***/ }),

/***/ "./src/app/comments/entities/comment.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const typeorm_1 = __webpack_require__("typeorm");
const cat_entity_1 = __webpack_require__("./src/app/cats/entities/cat.entity.ts");
let CommentEntity = class CommentEntity {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CommentEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CommentEntity.prototype, "text", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CommentEntity.prototype, "catId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => cat_entity_1.CatEntity, (cat) => cat.comments, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'catId' }),
    (0, graphql_1.Field)(() => cat_entity_1.CatEntity),
    tslib_1.__metadata("design:type", typeof (_a = typeof cat_entity_1.CatEntity !== "undefined" && cat_entity_1.CatEntity) === "function" ? _a : Object)
], CommentEntity.prototype, "cat", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CommentEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], CommentEntity.prototype, "updatedAt", void 0);
CommentEntity = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('comments', { orderBy: { createdAt: "DESC" } })
], CommentEntity);
exports.CommentEntity = CommentEntity;


/***/ }),

/***/ "./src/app/comments/inputs/create-comment.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCommentInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreateCommentInput = class CreateCommentInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], CreateCommentInput.prototype, "text", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], CreateCommentInput.prototype, "catId", void 0);
CreateCommentInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateCommentInput);
exports.CreateCommentInput = CreateCommentInput;


/***/ }),

/***/ "./src/app/dataloader/dataloader.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataloaderModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const comments_module_1 = __webpack_require__("./src/app/comments/comments.module.ts");
const dataloader_service_1 = __webpack_require__("./src/app/dataloader/dataloader.service.ts");
let DataloaderModule = class DataloaderModule {
};
DataloaderModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [comments_module_1.CommentsModule],
        providers: [dataloader_service_1.DataloaderService],
        exports: [dataloader_service_1.DataloaderService],
    })
], DataloaderModule);
exports.DataloaderModule = DataloaderModule;


/***/ }),

/***/ "./src/app/dataloader/dataloader.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataloaderService = void 0;
const tslib_1 = __webpack_require__("tslib");
const comments_service_1 = __webpack_require__("./src/app/comments/comments.service.ts");
const common_1 = __webpack_require__("@nestjs/common");
const dataloader_1 = tslib_1.__importDefault(__webpack_require__("dataloader"));
let DataloaderService = class DataloaderService {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    getLoaders() {
        const commentsLoader = this._createFriendsLoader();
        return {
            commentsLoader,
        };
    }
    _createFriendsLoader() {
        return new dataloader_1.default((keys) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.commentsService.getCatsCommentsByBatch(keys); }));
    }
};
DataloaderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof comments_service_1.CommentsService !== "undefined" && comments_service_1.CommentsService) === "function" ? _a : Object])
], DataloaderService);
exports.DataloaderService = DataloaderService;


/***/ }),

/***/ "./src/app/users/dto/create-user.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreateUserInput = class CreateUserInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
CreateUserInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;


/***/ }),

/***/ "./src/app/users/entities/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const typeorm_1 = __webpack_require__("typeorm");
let User = class User {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
User = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('users')
], User);
exports.User = User;


/***/ }),

/***/ "./src/app/users/users.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const users_service_1 = __webpack_require__("./src/app/users/users.service.ts");
const users_resolver_1 = __webpack_require__("./src/app/users/users.resolver.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const user_entity_1 = __webpack_require__("./src/app/users/entities/user.entity.ts");
let UsersModule = class UsersModule {
};
UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        providers: [users_resolver_1.UsersResolver, users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./src/app/users/users.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const jwt_auth_guard_1 = __webpack_require__("./src/app/auth/jwt-auth.guard.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const users_service_1 = __webpack_require__("./src/app/users/users.service.ts");
const user_entity_1 = __webpack_require__("./src/app/users/entities/user.entity.ts");
const create_user_input_1 = __webpack_require__("./src/app/users/dto/create-user.input.ts");
const common_1 = __webpack_require__("@nestjs/common");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(createUserInput) {
        return this.usersService.create(createUserInput);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(email) {
        return this.usersService.findOne(email);
    }
};
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    tslib_1.__param(0, (0, graphql_1.Args)('createUserInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_user_input_1.CreateUserInput !== "undefined" && create_user_input_1.CreateUserInput) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersResolver.prototype, "createUser", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'users' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UsersResolver.prototype, "findAll", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'user' }),
    tslib_1.__param(0, (0, graphql_1.Args)('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersResolver.prototype, "findOne", null);
UsersResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersResolver);
exports.UsersResolver = UsersResolver;


/***/ }),

/***/ "./src/app/users/users.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__("tslib");
const user_entity_1 = __webpack_require__("./src/app/users/entities/user.entity.ts");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(createUserInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = this.userRepository.create(createUserInput);
            const createdUser = yield this.userRepository.save(newUser);
            return createdUser;
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find({});
        });
    }
    findOne(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ email });
        });
    }
};
UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "@nestjs/apollo":
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcryptjs":
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "cookie-parser":
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "dataloader":
/***/ ((module) => {

module.exports = require("dataloader");

/***/ }),

/***/ "dotenv/config":
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "events":
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "graphql-subscriptions":
/***/ ((module) => {

module.exports = require("graphql-subscriptions");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const config_1 = __webpack_require__("@nestjs/config");
const core_1 = __webpack_require__("@nestjs/core");
const cookie_parser_1 = tslib_1.__importDefault(__webpack_require__("cookie-parser"));
const app_module_1 = __webpack_require__("./src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            credentials: true,
        });
        app.use((0, cookie_parser_1.default)());
        const config = yield app.get(config_1.ConfigService);
        const port = config.get('PORT');
        yield app.listen(port, () => console.log(`Listening on port ${port}`));
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map