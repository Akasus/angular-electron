"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
class DBLogger {
    logQuery(query, parameters, queryRunner) {
        throw new Error("Method not implemented.");
    }
    logQueryError(error, query, parameters, queryRunner) {
        throw new Error("Method not implemented.");
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        throw new Error("Method not implemented.");
    }
    logSchemaBuild(message, queryRunner) {
        throw new Error("Method not implemented.");
    }
    logMigration(message, queryRunner) {
        throw new Error("Method not implemented.");
    }
    log(level, message, queryRunner) {
        throw new Error("Method not implemented.");
    }
}
class Logger {
    constructor(toStdOut) {
        this.toStdOut = toStdOut;
        this.getLog = Logger.UseLocalLog ? this.getLocalLog : this.getDBLog;
        this.log("Logger Initialized");
    }
    SwitchMode(mode) {
        Logger.UseLocalLog = mode === 'local';
    }
    get logSet() {
        var _a;
        (_a = this.m_logSet) !== null && _a !== void 0 ? _a : (this.m_logSet = []);
        return this.m_logSet;
    }
    log(...message) {
        this._log(message, 'info');
    }
    warn(...message) {
        this._log(message, 'warning');
    }
    error(...message) {
        this._log(message, 'error');
    }
    getDBLog(request, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = request.page * request.size;
            const end = start + request.size;
            // const pageLogs = filtered.slice(start, end);
            const logs = yield database_1.LogRepository.getPage(request, query);
            const matches = yield database_1.LogRepository.count(query);
            const page = {
                content: logs,
                num: request.page,
                size: logs.length,
                totalElements: matches,
            };
            return page;
        });
    }
    getLocalLog(request, query) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(`\\b(?:${(_b = (_a = query.level) === null || _a === void 0 ? void 0 : _a.join('|')) !== null && _b !== void 0 ? _b : ''})\\b`);
            const filtered = this.m_logSet.filter(e => {
                var _a, _b;
                let valid = regex.test(e.level);
                valid && (valid = e.time >= ((_a = query.timefrom) !== null && _a !== void 0 ? _a : 0));
                valid && (valid = e.time <= ((_b = query.timeto) !== null && _b !== void 0 ? _b : Date.now() + 1000));
                return valid;
            })
                // .filter(e => e.time > query.timefrom)
                // .filter(e => e.time < query.timeto)
                .sort((a, b) => {
                let res = 0;
                for (const [k, v] of Object.entries(request.sort)) {
                    const propA = a[k];
                    const propB = b[k];
                    let result;
                    if (typeof propA === 'string') {
                        result = propA.toLowerCase().localeCompare(propB.toString().toLowerCase());
                    }
                    else {
                        result = propA - propB;
                    }
                    const factor = v === 'ASC' ? 1 : -1;
                    res *= result * factor;
                }
                return res;
            });
            const start = request.page * request.size;
            const end = start + request.size;
            const pageUsers = filtered.slice(start, end);
            const page = {
                content: pageUsers,
                num: request.page,
                size: pageUsers.length,
                totalElements: filtered.length
            };
            return Promise.resolve(page);
        });
    }
    _log(message, level) {
        var _a;
        const data = { message, time: Date.now(), level, stack: (_a = new Error().stack) !== null && _a !== void 0 ? _a : '' };
        Logger.UseLocalLog ? this.m_logSet.push(data) : database_1.LogRepository.create(data);
        if (!this.toStdOut)
            return;
        console.log(data);
    }
}
Logger.UseLocalLog = false;
const logger = new Logger(true);
exports.default = logger;
//# sourceMappingURL=logger.js.map