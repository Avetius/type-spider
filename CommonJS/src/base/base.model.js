"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const utils_1 = require("../utils/utils");
const lodash_1 = require("lodash");
const bluebird_1 = require("bluebird");
exports.QueryBuilder = knex({ dialect: 'pg' });
exports.Transaction = function (trx) {
    return BaseModel.Transaction(trx);
};
exports.Transacting = function (trx) {
    return BaseModel.Transacting(trx);
};
class BaseModel {
    static set db_config(value) {
        if (BaseModel.knex)
            return;
        BaseModel.knex = knex({ dialect: 'pg', connection: value });
    }
    static get Transaction() {
        return BaseModel.knex.transaction;
    }
    static get Transacting() {
        return BaseModel.knex.transacting;
    }
    get tableName() {
        return this.constructor.tableName;
    }
    static async manyOrNone(query, params, model) {
        try {
            query = query.toString();
            const result = await BaseModel.db.manyOrNone(query, params).catch(err => {
                console.error(`error on query: ${query}, params: ${params}`);
                console.log(err);
                throw err;
            });
            if (!result.length)
                return result;
            return bluebird_1.map(result, async (r) => new (model || this)(r));
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    static async oneOrNone(query, params) {
        try {
            query = query.toString();
            const result = await BaseModel.db.oneOrNone(query, params).catch(err => {
                console.error(`error on query: ${query}, params: ${params}`);
                console.log(err);
                throw err;
            });
            return result ? new this(result) : undefined;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    static async any(query, params) {
        try {
            query = query.toString();
            const result = await BaseModel.db.any(query, params).catch(err => {
                console.error(`error on query: ${query}, params: ${params}`);
                console.log(err);
                throw err;
            });
            return bluebird_1.map(result, async (r) => new this(r));
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    static async one(query, params) {
        try {
            query = query.toString();
            const result = await BaseModel.db.one(query, params).catch(err => {
                console.error(`error on query: ${query}, params: ${params}`);
                console.log(err);
                throw err;
            });
            return new this(result);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    static async none(query, params) {
        try {
            query = query.toString();
            return BaseModel.db.none(query, params).catch(err => {
                console.error(`error on query: ${query}, params: ${params}`);
                console.log(err);
                throw err;
            });
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async save(conflictRule) {
        const saved = await BaseModel.save(this, conflictRule, this.constructor);
        lodash_1.merge(this, saved);
        return this;
    }
    static async save(data, conflictRule, model) {
        try {
            let query = exports.QueryBuilder.table((model || this).tableName).insert(data).toString();
            if (conflictRule) {
                query += " " + conflictRule;
            }
            query += " returning *;";
            const returnData = await BaseModel.db.one(query);
            return new (model || this)(returnData);
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
    async saveWithID(conflictRule) {
        const saved = await BaseModel.saveWithID(this, conflictRule, this.constructor);
        lodash_1.merge(this, saved);
        return this;
    }
    static async saveWithID(data, conflictRule, model) {
        delete data.id;
        delete data.sourceInfo;
        delete data.autoSendLog;
        utils_1.CleanObject(data);
        let query = exports.QueryBuilder.table((model || this).tableName).insert(data).toString();
        if (conflictRule) {
            query += " " + conflictRule;
        }
        query += " returning *;";
        try {
            const returnData = await BaseModel.db.one(query);
            return new (model || this)(returnData);
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
    static async update(data, byFields = { "id": data.id }, conflictRule, model) {
        const fields = Object.assign({}, data);
        delete fields.autoSendLog;
        Object.keys(byFields).forEach(key => delete fields[key]);
        utils_1.CleanObject(fields);
        if (Object.keys(fields).length == 0)
            new (model || this)(this);
        let query = exports.QueryBuilder.table((model || this).tableName).update(fields).where(byFields).toString();
        if (conflictRule) {
            query += " " + conflictRule;
        }
        query += " returning *;";
        const result = await BaseModel.db.oneOrNone(query).catch(err => {
            console.log(err);
            throw err;
        });
        return new (model || this)(result);
    }
    async update(data = this, byFields = { id: this.id }, conflictRule) {
        Object.assign(this, data);
        return BaseModel.update(this, byFields, conflictRule, this.constructor);
    }
    static async delete(byFields, model) {
        utils_1.CleanObject(byFields);
        const returning = Object.keys(byFields);
        if (returning.length == 0)
            return [];
        const query = exports.QueryBuilder.table((model || this).tableName).where(byFields).delete().returning(returning);
        const result = BaseModel.db.manyOrNone(query.toString());
        return bluebird_1.map(result, async (r) => new (model || this)(r));
    }
    async delete(byFields = { id: this.id }) {
        return BaseModel.delete(byFields, this.constructor);
    }
    static async deleteMany(filterInField, filterIn, model, returning = `id`) {
        const query = exports.QueryBuilder.table((model || this).tableName).whereIn(filterInField, filterIn).delete().returning(returning);
        const result = BaseModel.db.manyOrNone(query);
        return bluebird_1.map(result, async (r) => new (model || this)(r));
    }
    async deleteMany(filterInField, filterIn, returning = `id`) {
        return BaseModel.deleteMany(filterInField, filterIn, this.constructor, returning);
    }
    async findOne(fields) {
        return BaseModel.findOne(fields, this.constructor);
    }
    static async findOne(fields, model) {
        utils_1.CleanObject(fields);
        if (Object.keys(fields).length === 0)
            return;
        const query = exports.QueryBuilder.table((model || this).tableName).select("*").where(fields).limit(1).toString();
        const result = await BaseModel.db.oneOrNone(query);
        if (!result)
            return;
        return new (model || this)(result);
    }
    async find(fields) {
        return BaseModel.find(fields, this.constructor);
    }
    static async find(fields, model) {
        utils_1.CleanObject(fields);
        if (Object.keys(fields).length === 0)
            return [];
        const query = exports.QueryBuilder.table((model || this).tableName).select("*").where(fields).toString();
        const result = await BaseModel.db.manyOrNone(query);
        return bluebird_1.map(result, async (r) => new (model || this)(r));
    }
    async findMany(filter, filterInField = undefined, filterIn = undefined, page = 1, limit = 100, disableLimit = false, orderBy = "id") {
        return BaseModel.findMany(filter, filterInField, filterIn, page, limit, disableLimit, orderBy, this.constructor);
    }
    static async findMany(filter, filterInField = undefined, filterIn = undefined, page = 1, limit = 100, disableLimit = false, orderBy = "id", model) {
        utils_1.CleanObject(filter);
        let query = exports.QueryBuilder.table((model || this).tableName);
        if (filterIn && filterInField) {
            query.whereIn(filterInField, filterIn)
                .andWhere(filter);
        }
        else {
            query.where(filter);
        }
        query.orderBy(orderBy, 'desc');
        if (!disableLimit) {
            query.limit(utils_1.NormalizeLimit(limit))
                .offset(utils_1.NormalizeOffset(page - 1) * utils_1.NormalizeLimit(limit));
        }
        const result = await BaseModel.db.manyOrNone(query.toString());
        return bluebird_1.map(result, async (r) => new (model || this)(r));
    }
    async findManyBetween(filter, dateField, range, page = 1, limit = 100, disableLimit = false, orderBy = "id") {
        return BaseModel.findMany(filter, dateField, range, page, limit, disableLimit, orderBy, this.constructor);
    }
    static async findManyBetween(filter, dateField, range, page = 1, limit = 100, disableLimit = false, model) {
        utils_1.CleanObject(filter);
        const filterCopy = Object.assign({}, filter);
        delete filterCopy.range;
        delete filterCopy.page;
        delete filterCopy.limit;
        delete filterCopy.date_from;
        delete filterCopy.date_to;
        delete filterCopy.lang_id;
        let query = exports.QueryBuilder.table((model || this).tableName);
        if (range && range.length > 0) {
            query.whereBetween(dateField, range)
                .andWhere(filterCopy);
        }
        else {
            query.where(filterCopy);
        }
        query.orderBy('id', 'desc');
        if (!disableLimit) {
            query.limit(utils_1.NormalizeLimit(limit))
                .offset(utils_1.NormalizeOffset(page - 1) * utils_1.NormalizeLimit(limit));
        }
        const result = await BaseModel.db.manyOrNone(query);
        return bluebird_1.map(result, async (r) => new (model || this)(r));
    }
    async list(page = 1, limit = 100, disableLimit = false) {
        return BaseModel.list(page, limit, disableLimit);
    }
    static async list(page = 1, limit = 100, disableLimit = false, model) {
        const query = exports.QueryBuilder.table((model || this).tableName)
            .orderBy('id', 'asc')
            .select('*');
        if (!disableLimit) {
            query.limit(utils_1.NormalizeLimit(limit))
                .offset(utils_1.NormalizeOffset(page - 1) * utils_1.NormalizeLimit(limit));
        }
        const result = await BaseModel.db.manyOrNone(query);
        return bluebird_1.map(result, async (r) => new (model || this)(r));
    }
    async addToArray(value, data_type = 'id', column, search_case = 'id', search_value, distinct = true, returning = '*') {
        return BaseModel.addToArray(this, value, data_type, column, search_case, search_value, this.tableName, distinct, returning);
    }
    static async addToArray(model, value, data_type, column, search_case = 'id', search_value, tableName, distinct = true, returning = '*') {
        await AddToArray(tableName, column, search_case, search_value, value, data_type, distinct, returning);
        if (!model[column])
            model[column] = [];
        if (distinct) {
            if (!model[column].includes(search_value))
                model[column].push(search_value);
        }
        else
            model[column].push(search_value);
        return model;
    }
    async removeFromArray(value, data_type, column, search_case = 'id', search_value, returning = '*') {
        return BaseModel.removeFromArray(this, value, data_type, column, search_case, search_value, this.tableName, returning);
    }
    static async removeFromArray(model, value, data_type = 'id', column, search_case = 'id', search_value, tableName, returning = '*') {
        await RemoveFromArray(tableName, column, search_case, search_value, value, data_type, returning);
        let arr = model[column];
        if (arr) {
            arr = arr.filter((e) => e !== value);
            model[column] = arr;
        }
        return model;
    }
}
BaseModel.tableName = '';
exports.BaseModel = BaseModel;
function AddToArrayQueryString(table_name, column, search_case, search_value, value, data_type, distinct = true, returning = '*') {
    const uniq = distinct ? exports.QueryBuilder.raw(`array_remove(${column}, ?::${data_type})`, value) : exports.QueryBuilder.raw(column);
    const str = exports.QueryBuilder.raw(`
            UPDATE ??
            SET ?? = array_append(?, ?::${data_type}) 
            WHERE ??.?? = ?
            RETURNING ??;
            `, [table_name, column, uniq, value, table_name, search_case, search_value, returning]).toString();
    return str;
}
exports.AddToArrayQueryString = AddToArrayQueryString;
async function AddToArray(tableName, column, search_case, search_value, value, data_type, distinct = true, returning = '*') {
    return BaseModel.manyOrNone(AddToArrayQueryString(tableName, column, search_case, search_value, value, data_type, distinct, returning));
}
exports.AddToArray = AddToArray;
function RemoveFromArrayQueryString(tableName, column, search_case, search_value, value, data_type, returning = '*') {
    const str = exports.QueryBuilder.raw(`
            UPDATE ??
            SET ?? = array_remove(??, ?::${data_type}) 
            WHERE ??.?? = ?
            RETURNING ??;
    `, [tableName, column, column, value, tableName, search_case, search_value, returning]).toString();
    return str;
}
exports.RemoveFromArrayQueryString = RemoveFromArrayQueryString;
async function RemoveFromArray(tableName, column, search_case, search_value, value, data_type, returning = '*') {
    return BaseModel.manyOrNone(RemoveFromArrayQueryString(tableName, column, search_case, search_value, value, data_type, returning));
}
exports.RemoveFromArray = RemoveFromArray;
//# sourceMappingURL=base.model.js.map