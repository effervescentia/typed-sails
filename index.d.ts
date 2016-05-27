import {
  CookieOptions,
  MediaType,
  Request as ExprRequest,
  Response as ExprResponse
} from 'express';
import { EventEmitter } from 'events';
import { Readable, Writable } from 'stream';
import { Collection } from 'mongodb';

declare var sails: sails.Sails;

declare namespace sails {

  interface Sails extends EventEmitter {
    constructor(config?: any): void;
    log: Logger;
    models: any;
    config: any & {
      explicitHost?: string,
      proxyHost?: string,
      proxyPort?: number,
      port: number,
      environment: string,
      hookTimeout: number,
      keepResponseErrors: boolean,
      ssl: boolean | { key: string, cert: string } | { pfx: string },
      bootstrap(cb: Function): void,
      csrf: Config.CSRF,
      globals: Config.Globals | boolean,
      http: Config.HTTP,
      i18n: Config.i18n,
      log: Config.Log,
      models: Config.Models,
      session: Config.Session,
      sockets: Config.Sockets,
      views: Config.Views
    };
    sockets: any;
    io: SocketIO.Server;
    hooks: any & {
      blueprints: Hooks.Blueprints & any,
      controllers: Hooks.Controllers & any,
      cors: Hooks.CORS & any,
      csrf: Hooks.CSRF & any,
      grunt: Hooks.Grunt & any,
      http: Hooks.HTTP & any,
      i18n: Hooks.i18n & any,
      logger: Hooks.Logger & any,
      moduleloader: Hooks.ModuleLoader & any,
      policies: Hooks.Policies & any,
      pubsub: Hooks.PubSub & any,
      request: Hooks.Request & any,
      responses: Hooks.Responses & any,
      services: Hooks.Services & any,
      session: Hooks.Session & any,
      userconfig: Hooks.UserConfig & any,
      userhooks: Hooks.UserHooks & any,
      views: Hooks.Views & any
    };

    load(options?: any, cb?: (err: Error, sails: Sails) => void): void;
    lift(options?: any, cb?: (err: Error, sails: Sails) => void): void;
    lower(cb?: (err: Error) => void): void;

    request(url: string | Request, cb?: (err: Error, response: any, body: any) => void): Readable;
    request(url: string, body: any, cb?: (err: Error, response: any, body: any) => void): Readable;

    getBaseUrl(): string;
    getRouteFor(target: string): Route;
    getUrlFor(target: string): string;
    after(event: string, listener: Function): this;
  }

  type ApplicationLifecycle = 'ready' | 'lifted' | 'lowered';

  interface Request extends ExprRequest {
    /**
     * @http
     * @websocket
     */
    options: any & RouteTarget & {
      values?: any,
      where?: any
    };
    /**
     * @http
     * @websocket
     */
    body: any;
    /**
     * @http
     * @websocket
     */
    headers: any;
    /**
     * @http
     * @websocket
     */
    query: any;
    /**
     * @http
     */
    file(field: string): void;
    /**
     * @http
     * @websocket
     */
    param(name: string, defaultValue?: any): any;
    /**
     * @http
     */
    cookies: any;
    /**
     * @http
     */
    signedCookies: any;
    /**
     * @http
     */
    get(field: string): any;
    /**
     * @http
     */
    accepts(type: string | string[]): any;
    /**
     * @http
     */
    accepted: MediaType[];
    /**
     * @http
     */
    is(type: string): boolean;
    /**
     * @http
     * @websocket
     */
    ip: string;
    /**
     * @http
     */
    ips: string[];
    /**
     * @http
     */
    path: string;
    /**
     * @http
     */
    host: string;
    /**
     * @http
     */
    fresh: boolean;
    /**
     * @http
     */
    stale: boolean;
    /**
     * @http
     */
    xhr: boolean;
    /**
     * @http
     * @websocket
     */
    protocol: string;
    /**
     * @http
     */
    secure: boolean;
    /**
     * @http
     * @websocket
     */
    session: string;
    /**
     * @http
     */
    subdomains: string[];
    /**
     * @http
     * @websocket
     */
    method: string;
    /**
     * @http
     */
    originalUrl: string;
    /**
     * @http
     */
    acceptedLanguages: string[];
    /**
     * @http
     */
    acceptedCharsets: string[];
    /**
     * @http
     */
    acceptsCharset(charset: string): boolean;
    /**
     * @http
     */
    acceptsLanguage(charset: string): boolean;
    /**
     * @http
     * @websocket
     */
    isSocket: boolean;
    /**
     * @http
     * @websocket
     */
    params: (any & { all: any }) | string[];
    /**
     * @websocket
     */
    // socket: {
    //   id: string,
    //   join(room: string, cb?: (err?: Error) => void): void,
    //   leave(room: string, cb?: Function): void,
    //   broadcast(roomNames: string | string[], opts?: any): void
    // };
    /**
     * @websocket
     */
    transport: string;
    /**
     * @http
     * @websocket
     */
    url: string;
    /**
     * @http
     * @websocket
     */
    wantsJSON: boolean;
  }

  interface Response extends ExprResponse {
    /**
     * @http
     * @websocket
     */
    status(statusCode: number): Response;
    /**
     * @http
     */
    set(headers: any): Response;
    set(header: string, value: string): Response;
    /**
     * @http
     */
    get(header: string): string;
    /**
     * @http
     */
    cookie(name: string, value: string, opts?: CookieOptions): Response;
    /**
     * @http
     */
    clearCookie(name: string, opts?: CookieOptions): Response;
    /**
     * @http
     */
    location(url: string): Response;
    /**
     * @http
     * @websocket
     */
    send(body: any): Response;
    send(httpStatus: number, body: any): Response;
    /**
     * @http
     * @websocket
     */
    json(body: any): Response;
    json(httpStatus: number, body: any): Response;
    /**
     * @http
     * @websocket
     */
    jsonp(body: any): Response;
    jsonp(httpStatus: number, body: any): Response;
    /**
     * @http
     */
    type(type: string): Response;
    /**
     * @http
     */
    attachment(filename?: string): Response;
    /**
     * @http
     */
    view(pathToView: string, locals?: any): void;
    view(locals?: any): void;
    /**
     * @http
     * @websocket
     */
    forbidden(data?: any, pathToView?: string): void;
    /**
     * @http
     * @websocket
     */
    badRequest(data?: any, pathToView?: string): void;
    /**
     * @http
     * @websocket
     */
    ok(data?: any, pathToView?: string): void;
    /**
     * @http
     * @websocket
     */
    negotiate(err: Error): void;
    /**
     * @http
     * @websocket
     */
    notFound(data?: any, pathToView?: string): void;
    /**
     * @http
     * @websocket
     */
    serverError(data?: any, pathToView?: string): void;
  }

  interface RouteTarget {
    skipAssets: boolean;
    skipRegex: RegExp;
    locals: any;
    cors: boolean | string | any;
    populate: boolean;
    skip: any;
    limit: any;
    sort: any;
    where: any;
  }

  interface Route {
    method: string;
    url: string;
  }

  interface Socket {
    blast(data: any, socketToOmit?: Request): void;
    blast(eventName: string, data: any, socketToOmit?: Request): void;

    broadcast(roomNames: string | string[], data: any, socketToOmit?: Request): void;
    broadcast(roomNames: string | string[], eventName: string, data: any, socketToOmit?: Request): void;

    getId(req: Request): string;

    leave(socket: string | Request, roomName: string, cb?: (err?: Error) => void): void;

    leaveAll(roomName: string, cb?: (err?: Error) => void): void;

    join(socket: string | Request, roomName: string, cb?: (err?: Error) => void): void;

    removeRoomMembersFromRooms(sourceRoom: string, destRooms: string | string[], cb?: (err?: Error) => void): void;

    /**
     * @deprecated
     */
    emit(ids: string | string[], event: string, data: any): void;
    /**
     * @deprecated
     */
    id(req: Request): string;
    /**
     * @deprecated
     */
    subscribers(roomName: string, cb?: (err: Error, socketIds: string[]) => void): void;
    /**
     * @deprecated
     */
    rooms(): string[];
    /**
     * @deprecated
     */
    socketRooms(socket: Socket): string[];
  }

  interface SocketClient {
    off(identity: string, handler: Function): void;
    post(url: string, data?: any, handler?: (data: any, jwres: SocketResponse) => void): void;
    on(identity: string, handler: Function): void;
    get(url: string, data?: any, handler?: (data: any, jwres: SocketResponse) => void): void;
    put(url: string, data?: any, handler?: (data: any, jwres: SocketResponse) => void): void;
    delete(url: string, data?: any, handler?: (data: any, jwres: SocketResponse) => void): void;
    request(options: SocketRequest, handler?: (data: any, jwres: SocketResponse) => void): void;
  }

  interface SocketRequest {
    method: string;
    url: string;
    data?: any;
    headers?: any;
  }

  interface SocketResponse {
    headers: any;
    body: any;
    statusCode: number;
  }

  interface Logger {
    (...args: any[]): void;
    silly(...args: any[]): void;
    verbose(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
  }

  interface Model {
    save(cb: (err?: Error) => void): WaterlinePromise<Result> | void;

    count(criteria?: number | string | any, cb?: (err: Error, count: number) => void): WaterlinePromise<number>;

    create(params: any, cb?: (err: Error, created: Result) => void): WaterlinePromise<Result>;
    create(params: any[], cb?: (err: Error, created: Result[]) => void): WaterlinePromise<Result[]>;

    destroy(criteria: any, cb?: (err?: Error) => void): WaterlinePromise<Record[]>;

    find(criteria: any, cb?: (err: Error, found: Result[]) => void): WaterlinePromise<Result>;

    findOne(criteria: any, cb?: (err: Error, found?: Result) => void): WaterlinePromise<Result>;

    findOrCreate(criteria: any | any[], params: any | any[], cb?: (err: Error, createdOrFound?: Result | Result[]) => void): WaterlinePromise<Result | Result[]>;

    /**
     * @mongo
     */
    native(cb: (err: Error, mongoCollection: Collection) => void): WaterlinePromise<Collection>;

    /**
     * @sql
     */
    query(criteria: string, cb?: (err: Error, found: Result[]) => void): WaterlinePromise<Result[]>;

    stream(criteria: any, overrides?: { end: Function, write: Function }): Writable;

    update(criteria: any | any[], updates: any | any[], cb?: (err: Error, updated: any[]) => void): WaterlinePromise<Result[]>;

    find(): QueryBuilder;

    // Resourceful Pub / Sub
    message(id: string | number, data: any, req?: Request): void;

    publishAdd(id: string | number, association: string, added: string | number | ({ id: string | number } & any), req?: Request, options?: PublishOptions.Add): void;

    publishCreate(data: any, req?: Request): void;

    publishDestroy(id: string | number, req?: Request, options?: PublishOptions.Destroy): void;

    publishRemove(id: string | number, association: string, foreignKey: string, req?: Request, options?: PublishOptions.Remove): void;

    publishUpdate(id: string | number, changes: any, req?: Request, options?: PublishOptions.Update): void;

    subscribe(req: Request, ids: string[] | number[]): void;

    unwatch(req: Request): void;

    unsubscribe(req: Request, ids: string[] | number[]): void;

    watch(req: Request): void;

    /**
     * @deprecated
     */
    subscribers(record: string | number | ({ ids: string | number } & any), contexts?: string | string[]): void;
  }

  namespace PublishOptions {
    interface Add {
      noReverse: boolean;
    }
    interface Destroy {
      previous: any;
    }
    interface Remove {
      noReverse: boolean;
    }
    interface Update {
      noReverse: boolean;
      previous: any;
    }
  }

  interface QueryBuilder extends Promise<Result | Result[]> {
    exec(cb: (err: Error, result: Result | Result[]) => void): void;

    limit(limit: number): this;
    skip(offset: number): this;
    sort(criteria: string): this;
    where(criteria: any): this;
    populate(association: string, criteria?: any): this;
  }

  interface WaterlinePromise<T> extends Promise<T> {
    exec(cb: (err: Error, results: Result[]) => void): void;
    exec(cb: (err: Error, result: Result) => void): void;
  }

  interface Record {
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }

  interface QueryResult extends Record {
    toJSON(): any;
    save(cb?: (err: Error, savedRecord: any) => void): WaterlinePromise<any>;
    destroy(): Promise<QueryResult[]>;
    toObject(): any;
  }

  type Result = QueryResult & any;

  namespace Config {
    interface Blueprints {
      /**
       * Optional mount path prefix for blueprints (the automatically
       * bound routes in your controllers) e.g. '/api/v2'
       * @type {string}
       */
      prefix: string;
      /**
       * Optional mount path prefix for RESTful blueprints (the automatically
       * bound RESTful routes for your controllers and models) e.g. '/api/v2'.
       * Will be joined to your prefix config. e.g. prefix: '/api' and
       * restPrefix: '/rest', RESTful actions will be available under /api/rest
       * @type {string}
       */
      restPrefix: string;
      /**
       * Automatic REST blueprints enabled? e.g. 'get /:controller/:id?'
       * 'post /:controller' 'put /:controller/:id' 'delete /:controller/:id'
       * @type {boolean}
       */
      rest: boolean;
      /**
       * Whether routes are automatically generated for every action in your
       * controllers (also maps index to /:controller) '/:controller',
       * '/:controller/index', and '/:controller/:action'
       * @type {boolean}
       */
      actions: boolean;
      /**
       * These CRUD shortcuts exist for your convenience during development,
       * but you'll want to disable them in production.: '/:controller/find/:id?',
       * '/:controller/create', '/:controller/update/:id', and '/:controller/destroy/:id'
       * @type {boolean}
       */
      shortcuts: boolean;
      /**
       * Forces the blueprint actions to send messages to all sockets,
       * including the requesting socket
       * @type {boolean}
       */
      mirror: boolean;
      /**
       * Optionally use plural controller names in blueprint routes, e.g.
       * /users for api/controllers/UserController.js.
       * @type {boolean}
       */
      pluralize: boolean;
      /**
       * Whether the blueprint controllers should populate model fetches with
       * data from other models which are linked by associations. If you have a
       * lot of data in one-to-many associations, leaving this on may result in
       * very heavy api calls.
       * @type {boolean}
       */
      populate: boolean;
      /**
       * The default number of records to show in the response from a "find"
       * action. Doubles as the default size of populated arrays if populate is true.
       * @type {boolean}
       */
      defaultLimit: boolean;
      /**
       * Whether to run Model.watch() in the
       * find and findOne blueprint actions. Can be overridden on a per-model basis.
       * @type {boolean}
       */
      autoWatch: boolean;
      /**
       * Optionally wrap blueprint JSON responses in a JSONP callback using
       * res.jsonp() from Express 3.
       * @type {boolean}
       */
      jsonp: boolean;
    }
    interface CORS {
      /**
       * Indicates whether the other CORS configuration settings should apply
       * to every route in the app by default.
       * @type {boolean}
       */
      allRoutes: boolean;
      /**
       * Comma-delimited list of default hosts (beginning with http:// or https://)
       * to give access to, or * to allow all domains CORS access. If allRoutes
       * is true and origin is *, then your app will be fully accessible to sites
       * hosted on foreign domains (except for routes which have their own CORS settings).
       * @type {string}
       */
      origin: string;
      /**
       * Comma-delimited list of methods that are allowed to be used in CORS requests.
       * This is only used in response to preflight requests, so the inclusion of
       * GET, POST, OPTIONS and HEAD, although customary, is not necessary.
       * @type {string}
       */
      methods: string;
      /**
       * Comma-delimited list of headers that are allowed to be sent with CORS
       * requests. This is only used in response to preflight requests.
       * @type {string}
       */
      headers: string;
      /**
       * List of headers that browsers will be allowed to access.
       * @type {string}
       */
      exposeHeaders: string;
      /**
       * Indicates whether cookies can be shared in CORS requests.
       * @type {boolean}
       */
      credentials: boolean;
      /**
       * Indicates how Sails should respond to requests from disallowed origins.
       * In normal mode (0), Sails processes all requests normally, simply setting
       * the appropriate CORS headers and leaving it to the client to determine
       * how to handle the response. In high mode (1), Sails will send back a 403
       * response to requests from disallowed origins, if the origin starts with
       * http or https. In very high mode (2), Sails will send back a 403 response
       * to requests from disallowed origins, regardless of the origin protocol.
       * @type {number}
       */
      securityLevel: number;
    }
    interface CSRF {
      /**
       * CSRF protection is disabled by default to facilitate development.
       * To turn it on, just set sails.config.csrf to true, or for more
       * flexibility, specify a dictionary with any of the properties described below.
       * @type {boolean | any}
       */
      csrf: boolean | {
        /**
         * Whether to activate the /csrfToken route, which will return the
         * current CSRF token value which can then be used in AJAX requests.
         * @type {boolean}
         */
        grantTokenViaAjax: boolean,
        /**
         * Comma-delimited list of origins that are allowed to access the CSRF
         * token via the /csrfToken shadow route. This is separate from the
         * other CORS settings, which do not apply to /csrfToken.
         * @type {string}
         */
        origin: string,
        /**
         * Comma-delimited list of routes where CSRF protection is disabled.
         * @type {string}
         */
        routesDisabled: string
      };
    }
    interface Globals {
      /**
       * Expose the sails instance representing your app.
       * If this is disabled, you can still get access via req._sails.
       * @type {boolean}
       */
      sails: boolean;
      /**
       * Expose each of your app's models as global variables (using their "globalId").
       * E.g. a model defined in api/models/User.js would have a globalId of
       * User by default. If this is disabled, you can still access your
       * models via sails.models.*.
       * @type {boolean}
       */
      models: boolean;
      /**
       * Expose each of your app's services as global variables (using their "globalId").
       * E.g. a service defined in api/services/NaturalLanguage.js would have a
       * globalId of NaturalLanguage by default. If this is disabled, you can
       * still access your services via sails.services.*.
       * @type {boolean}
       */
      services: boolean;
      /**
       * Expose the lodash installed in Sails core as a global variable.
       * If this is disabled, like any other node module you can always run
       * npm install lodash --save, then var _ = require('lodash') at the top of any file.
       * @type {boolean}
       */
      _: boolean;
      /**
       * this is disabled, like any other node module you can always run
       * npm install async --save, then var async = require('async') at the top of any file.
       * @type {boolean}
       */
      async: boolean;
    }
    interface HTTP {
      /**
       * A dictionary of all HTTP middleware functions your app will run on
       * every incoming HTTP request.
       * @type {any}
       */
      middleware: any | {
        /**
         * An array of middleware names (strings) indicating the order in
         * which middleware should be run for all incoming HTTP requests.
         * @type {string[]}
         */
        order: string[]
      };
      /**
       * The number of milliseconds to cache static assets when your app is
       * running in a 'production' environment. These are any flat files like
       * images, scripts, stylesheets, etc. that are served by Express' static
       * middleware (by default, these files are served from .tmp/public,
       * a hidden folder compiled by Grunt).
       * @type {number}
       */
      cache: number;
      /**
       * SSL only: options to send directly to the Node https module when creating the server.
       * These will be merged with your SSL settings, if any.
       * @type {any}
       */
      serverOptions: any;
    }
    interface i18n {
      /**
       * List of supported locale codes
       * @type {string[]}
       */
      locales: string[];
      /**
       * The project-relative path to the folder containing your locale translations (i.e. stringfiles)
       * @type {string}
       */
      localesDirectory: string;
      /**
       * The default locale for the site. Note that this setting will be overridden
       * for any request that sends an "Accept-Language" header (i.e. most browsers),
       * but it's still useful if you need to localize the response for requests
       * made by non-browser clients (e.g. cURL).
       * @type {string}
       */
      defaultLocale: string;
      /**
       * Whether to automatically add new keys to locale (translation) files
       * when they are encountered during a request.
       * @type {boolean}
       */
      updateFiles: boolean;
    }
    interface Log {
      /**
       * Set the level of detail to be shown in your app's log
       * @type {string}
       */
      level: string;
      /**
       * Set to false to disable captain's log's handling of logging, logs will
       * instead be passed to the configured custom logger
       * @type {string}
       */
      inspect: string;
      /**
       * Set to the instance of a custom logger (such as winston) logs will
       * be passed through to the custom logger
       * @type {any}
       */
      custom: any;
    }
    interface Models {
      /**
       * The basic pieces of information to store about a model.
       * @type {any}
       */
      attributes: any;
      /**
       * How & whether Sails will attempt to automatically rebuild the tables/collections/etc. in your schema
       * @type {string}
       */
      migrate: string;
      /**
       * The default database connection any given model will use without a configured override
       * @type {string}
       */
      connection: string;
      /**
       * Toggle the automatic definition of a primary key in your model
       * @type {boolean}
       */
      autoPK: boolean;
      /**
       * Toggle the automatic definition of a property createdAt in your model
       * @type {boolean}
       */
      autoCreatedAt: boolean;
      /**
       * Toggle the automatic definition of a property updatedAt in your model
       * @type {boolean}
       */
      autoUpdatedAt: boolean;
      /**
       * Used to specify database table name for the model
       * @type {string}
       */
      tableName: string;
      /**
       * Toggle the automatic creation of Dynamic Finders
       * @type {boolean}
       */
      dynamicFinders: boolean;
    }
    interface Session {
      /**
       * If left unspecified, Sails will use the default memory store bundled in
       * the underlying session middleware. In production, you should specify the
       * package name of a scalable session store instead (e.g. connect-redis).
       * @type {string}
       */
      adapter: string;
      /**
       * Session key is set as sails.sid by default. This is the name of the key
       * which is added to the cookie of visitors to your site when sessions are
       * enabled (which is the case by default for Sails apps). If you are
       * running multiple different Sails apps from the same shared cookie
       * namespace (i.e. the top-level DNS domain, like frog-enthusiasts.net),
       * you must be especially careful to configure separate unique keys for each
       * separate app, otherwise the wrong cookie could be used (like crossing streams)
       * @type {string}
       */
      key: string;
      /**
       * This session secret is automatically generated when your new app is
       * created. Care should be taken any time this secret is changed in
       * production-- doing so will invalidate the sesssion cookies of your users,
       * forcing them to log in again. Note that this is also used as
       * the "cookie secret" for signed cookies.
       * @type {string}
       */
      secret: string;
    }
    interface Sockets {
      /**
       * The queue socket.io will use to deliver messages. Can be set to either
       * 'memory' or 'socket.io-redis'. If 'socket.io-redis' is specified, you
       * should run npm install socket.io-redis@~1.0.0 --save --save-exact.
       * @type {string}
       */
      adapter: string;
      /**
       * An array of allowed transport strategies. This should always match your
       * configuration in your socket client (i.e. sails.io.js).
       * @type {string[]}
       */
      transports: string[];
      /**
       * A function to run when a client-side socket disconnects from the server.
       * @type {Function}
       */
      afterDisconnect(session: any, socket: any, cb: Function): void;
      /**
       * This is a raw configuration option exposed from Engine.io. It indicates
       * whether to allow Socket.io clients to upgrade the transport that they
       * are using (e.g. start with polling, then upgrade to a true WebSocket connection).
       * @type {boolean}
       */
      allowUpgrades: boolean;
      /**
       * A function to run every time a new client-side socket attempts to connect
       * to the server which can be used to reject or allow the incoming connection.
       * Useful for tweaking your production environment to prevent DoS attacks,
       * or reject socket.io connections based on business-specific heuristics
       * (e.g. if stooges from a competing business create bots to post spam links
       * about their commercial product in your chat room). To define your own
       * custom logic, specify a function. As of Sails v0.11, Sails no longer
       * blocks incoming socket connections without cookies-- instead, cookies
       * (and by corollary- sessions) are granted automatically. If a requesting
       * socket.io client cannot receive a cookie (i.e. making a cross-origin
       * socket.io connection) the sails.io.js socket client will automatically
       * send a CORS+JSONP request to try and obtain one BEFORE CONNECTING (refer
       * to the grant3rdPartyCookie option above for details). In the antagonistic
       * scenario where even this fails, Sails will still grant a new cookie upon
       * connection, which allows for a one-time session.
       * @type {boolean}
       */
      beforeConnect: (handshake: any, cb: Function) => void | boolean;
      /**
       * This is a raw configuration option exposed from Engine.io. It indicates
       * the name of the HTTP cookie that contains the connecting socket.io
       * client's socket id. The cookie will be set when responding to the
       * initial Socket.io "handshake". Alternatively, may be set to false to
       * disable the cookie altogether. Note that the sails.io.js client does not
       * rely on this cookie, so it is disabled (set to false) by default for
       * enhanced security. If you are using socket.io directly and need to re-enable
       * this cookie, keep in mind that the conventional setting is "io".
       * @type {[type]}
       */
      cookie: boolean | string;
      /**
       * This is a raw configuration option exposed from Engine.io. It reflects
       * the maximum number of bytes or characters in a message when polling
       * before automatically closing the socket (to avoid DoS).
       * @type {number}
       */
      maxBufferSize: number;
      /**
       * Path that client-side sockets should connect to on the server
       * @type {string}
       */
      path: string;
      /**
       * This is a raw configuration option exposed from Engine.io. It reflects
       * the number of miliseconds to wait between "ping packets" (i.e. this is
       * what "heartbeats" has become, more or less)
       * @type {number}
       */
      pingInterval: number;
      /**
       * This is a raw configuration option exposed from Engine.io.
       * It reflects how many ms without a pong packet to wait before
       * considering a socket.io connection closed
       * @type {number}
       */
      pingTimeout: number;
      /**
       * When using the socket.io-redis adapter, this option allows you to specify
       * a custom Redis client (typically created with Redis.createClient) used
       * for publishing on channels used by Socket.io. If unspecified,
       * Sails will create a client for you.
       * @type {any}
       */
      pubClient: any;
      /**
       * Whether to include response headers in the JWR (JSON WebSocket Response)
       * originated for each socket request (e.g. io.socket.get() in the browser)
       * This doesn't affect direct socket.io usage-- only if you're communicating
       * with Sails via the request interpreter (e.g. making normal calls with the
       * sails.io.js browser SDK). This can be useful for squeezing out more performance
       * when tuning high-traffic apps, since it reduces total bandwidth usage.
       * However, since Sails v0.10, response headers are trimmed whenever possible,
       * so this option should almost never need to be used, even in extremely
       * high-scale applications.
       * @type {boolean}
       */
      sendResponseHeaders: boolean;
      /**
       * Whether to serve the default Socket.io client at /socket.io/socket.io.js.
       * Occasionally useful for advanced debugging.
       * @type {boolean}
       */
      serveClient: boolean;
      /**
       * When using the socket.io-redis adapter, this option allows you to specify
       * a custom Redis client (typically created with Redis.createClient) used
       * for subscribing to channels used by Socket.io.
       * If unspecified, Sails will create a client for you.
       * @type {any}
       */
      subClient: any;
    }
    interface Views {
      /**
       * Set the default layout for your app by specifying the relative path to
       * the desired layout file from your views folder (i.e. views/.) Or disable
       * layout support altogether with false. Built-in support for layouts is
       * only relevant when using ejs
       * @type {[type]}
       */
      layout: boolean | string;
      /**
       * The view engine your app will use to compile server-side markup into HTML.
       * @type {string}
       */
      engine: string;
      /**
       * The file extension for view files.
       * @type {string}
       */
      extension: string;
      /**
       * Default data to be included as view locals every time a server-side view
       * is compiled anywhere in this app. If an optional locals argument was passed
       * in directly via res.view(), its properties take precedence when both
       * dictionaries are merged and provided to the view (more on that below)
       * @type {any}
       */
      locals: any;
    }
  }

  namespace Hooks {
    interface Blueprints { }
    interface Controllers { }
    interface CORS { }
    interface CSRF { }
    interface Grunt { }
    interface HTTP { }
    interface i18n { }
    interface Logger { }
    interface ModuleLoader { }
    interface Policies { }
    interface PubSub { }
    interface Request { }
    interface Responses { }
    interface Services { }
    interface Session { }
    interface UserConfig { }
    interface UserHooks { }
    interface Views { }
  }

  interface Controller {
    _config?: {
      actions?: boolean,
      shortcuts?: boolean,
      rest?: boolean
    };
  }

}

export = sails;
