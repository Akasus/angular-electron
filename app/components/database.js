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
exports.LogRepository = void 0;
const typeorm_1 = require("typeorm");
const log_1 = require("../Entities/log");
const logger_1 = require("./logger");
const AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: './database/app.sqlite',
    synchronize: true,
    logging: true,
    logger: '',
    entities: [log_1.LogEntryModel],
    migrations: [],
    subscribers: []
});
AppDataSource.initialize()
    .then(() => {
    logger_1.default.warn("Data Source has been initialized!");
})
    .catch((err) => {
    logger_1.default.SwitchMode('local');
    logger_1.default.error("Error during Data Source initialization:", err);
});
class LogRepo {
    constructor(repo) {
        this.repo = repo;
    }
    create(logEntry) {
        return __awaiter(this, void 0, void 0, function* () {
            var res = this.repo.save(logEntry);
            return res;
        });
    }
    getPage(request, query) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            var where = {
                time: (0, typeorm_1.Between)((_a = query.timefrom) !== null && _a !== void 0 ? _a : 0, (_b = query.timeto) !== null && _b !== void 0 ? _b : Date.now() + 10000)
            };
            if (query.level)
                where.level = (0, typeorm_1.In)([...query.level]);
            var res = yield this.repo.find({
                where,
                order: request.sort,
                skip: request.page * request.size,
                take: request.size,
                cache: true,
            });
            return res;
        });
    }
    count(query) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            var res = this.repo.count({
                where: {
                    time: (0, typeorm_1.Between)((_a = query.timefrom) !== null && _a !== void 0 ? _a : 0, (_b = query.timeto) !== null && _b !== void 0 ? _b : Date.now() + 10000),
                    level: query.level ? (0, typeorm_1.In)(query.level) : undefined,
                },
            });
            return res;
        });
    }
}
LogRepo.usefallbackarray = false;
exports.LogRepository = new LogRepo(AppDataSource.getRepository(log_1.LogEntryModel));
//# sourceMappingURL=database.js.map