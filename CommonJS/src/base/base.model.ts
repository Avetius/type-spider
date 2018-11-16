// import * as knex from 'knex';
// import { BrokerUtil } from "../messaging/BrokerUtil";
// import { IMessageBroker } from "../messaging/IMessageBroker";
// import { CleanObject, NormalizeLimit, NormalizeOffset } from "../utils/utils";
// import { merge } from "lodash";
// import { IBase } from "./base.interface";
// import { map } from 'bluebird';

// // tslint:disable-next-line:variable-name
// export const QueryBuilder = knex({ dialect: 'pg' });
// export const broker: IMessageBroker = BrokerUtil.getBroker();

// // tslint:disable-next-line:variable-name
// export const Transaction = function (trx) {
//     return BaseModel.Transaction(trx);
// };
// // tslint:disable-next-line:variable-name
// export const Transacting = function (trx) {
//     return BaseModel.Transacting(trx);
// };

// type RangeType = string | number | boolean | Date | Array<string> | Array<number> | Array<Date> | Array<boolean> | Buffer | knex.Raw;

// export type GenericModel<T> = {
//     // tslint:disable-next-line:no-any
//     new(...args: any[]): T;
//     tableName: string;
//     id?: number;
//     // tslint:disable-next-line:no-any
//     [value: string]: any
// };

// export class BaseModel implements IBase {
//     // tslint:disable-next-line:no-any
//     public static db: any;
//     public static tableName = '';
//     private static knex;

//     public static set db_config(value) {
//         if (BaseModel.knex) return;
//         BaseModel.knex = knex({ dialect: 'pg', connection: value });
//     }

//     public static get Transaction() {
//         return BaseModel.knex.transaction;
//     }

//     public static get Transacting() {
//         return BaseModel.knex.transacting;
//     }

//     public get tableName(): string {
//         // tslint:disable-next-line:no-any
//         return (<any>this.constructor).tableName;
//     }
//     public id?: number;

//     // tslint:disable-next-line:no-any
//     public static async manyOrNone<T>(this: GenericModel<T> | typeof BaseModel, query, params?: any, model?: GenericModel<T>): Promise<T[]> {
//         try {
//             query = query.toString();
//             const result = await BaseModel.db.manyOrNone(query, params).catch(err => {
//                 console.error(`error on query: ${query}, params: ${params}`);
//                 console.log(err);
//                 throw err;
//             });
//             if (!result.length) return result;
//             return map(result, async r => new (model || this as GenericModel<T>)(r));
//         } catch (err) {
//             console.error(err);
//             throw err;
//         }
//     }

//     // tslint:disable-next-line:no-any
//     public static async oneOrNone<T>(this: GenericModel<T> | typeof BaseModel, query, params?: any): Promise<T | undefined> {
//         try {
//             query = query.toString();
//             const result: T | undefined = await BaseModel.db.oneOrNone(query, params).catch(err => {
//                 console.error(`error on query: ${query}, params: ${params}`);
//                 console.log(err);
//                 throw err;
//             });
//             return result ? new (this as GenericModel<T>)(result) : undefined;
//         } catch (err) {
//             console.error(err);
//             throw err;
//         }
//     }

//     // tslint:disable-next-line:no-any
//     public static async any<T>(this: GenericModel<T> | typeof BaseModel, query, params?: any): Promise<T[]> {
//         try {
//             query = query.toString();
//             const result = await BaseModel.db.any(query, params).catch(err => {
//                 console.error(`error on query: ${query}, params: ${params}`);
//                 console.log(err);
//                 throw err;
//             });
//             return map(result, async r => new (this as GenericModel<T>)(r));
//         } catch (err) {
//             console.error(err);
//             throw err;
//         }
//     }

//     // tslint:disable-next-line:no-any
//     public static async one<T>(this: GenericModel<T> | typeof BaseModel, query, params?: any): Promise<T> {
//         try {
//             query = query.toString();
//             const result = await BaseModel.db.one(query, params).catch(err => {
//                 console.error(`error on query: ${query}, params: ${params}`);
//                 console.log(err);
//                 throw err;
//             });
//             return new (this as GenericModel<T>)(result);
//         } catch (err) {
//             console.error(err);
//             throw err;
//         }
//     }

//     // tslint:disable-next-line:no-any
//     public static async none(query, params?: any): Promise<void> {
//         try {
//             query = query.toString();
//             return BaseModel.db.none(query, params).catch(err => {
//                 console.error(`error on query: ${query}, params: ${params}`);
//                 console.log(err);
//                 throw err;
//             });
//         } catch (err) {
//             console.error(err);
//             throw err;
//         }
//     }

//     public async save(conflictRule?: string): Promise<this> {
//         const saved = await BaseModel.save<this>(this, conflictRule, this.constructor as GenericModel<this>);
//         merge(this, saved);
//         return this;
//     }

//     // tslint:disable-next-line:no-any
//     public static async save<T>(this: GenericModel<T> | typeof BaseModel, data: any, conflictRule?: string, model?: GenericModel<T>): Promise<T> {
//         try {
//             let query = QueryBuilder.table((model || this).tableName).insert(data).toString();
//             if (conflictRule) {
//                 query += " " + conflictRule;
//             }
//             query += " returning *;";
//             const returnData = await BaseModel.db.one(query);
//             return new (model || this as GenericModel<T>)(returnData);
//         } catch (ex) {
//             console.error(ex);
//             throw ex;
//         }
//     }

//     public async saveWithID(conflictRule?: string): Promise<this> {
//         const saved = await BaseModel.saveWithID<this>(this, conflictRule, this.constructor as GenericModel<this>);
//         merge(this, saved);
//         return this;
//     }

//     // tslint:disable-next-line:no-any
//     public static async saveWithID<T>(this: GenericModel<T> | typeof BaseModel, data: any, conflictRule?: string, model?: GenericModel<T>): Promise<T> {
//         delete data.id;
//         delete data.sourceInfo;
//         delete data.autoSendLog;
//         CleanObject(data);
//         let query = QueryBuilder.table((model || this).tableName).insert(data).toString();
//         if (conflictRule) {
//             query += " " + conflictRule;
//         }
//         query += " returning *;";
//         try {
//             const returnData = await BaseModel.db.one(query);
//             return new (model || this as GenericModel<T>)(returnData);
//         } catch (ex) {
//             console.error(ex);
//             throw ex;
//         }
//     }

//     // tslint:disable-next-line:no-any
//     public static async update<T>(this: GenericModel<T> | typeof BaseModel, data: any, byFields: object = { "id": data.id }, conflictRule?: string, model?: GenericModel<T>): Promise<T> {
//         const fields = Object.assign({}, data);
//         delete fields.autoSendLog;
//         Object.keys(byFields).forEach(key => delete fields[key]);
//         CleanObject(fields);
//         if (Object.keys(fields).length == 0) new (model || this as GenericModel<T>)(this);
//         let query = QueryBuilder.table((model || this).tableName).update(fields).where(byFields).toString();

//         if (conflictRule) {
//             query += " " + conflictRule;
//         }
//         query += " returning *;";

//         const result = await BaseModel.db.oneOrNone(query).catch(err => {
//             console.log(err);
//             throw err;
//         });
//         return new (model || this as GenericModel<T>)(result);
//     }

//     // tslint:disable-next-line:no-any
//     public async update(data: any = this, byFields: any = { id: this.id }, conflictRule?: string): Promise<this> {
//         // merge(this, data);
//         Object.assign(this, data);
//         return BaseModel.update<this>(this, byFields, conflictRule, this.constructor as GenericModel<this>);
//     }

//     // tslint:disable-next-line:no-any
//     public static async delete<T>(this: GenericModel<T> | typeof BaseModel, byFields: any, model?: GenericModel<T>): Promise<T[]> {
//         CleanObject(byFields);
//         const returning = Object.keys(byFields);
//         if (returning.length == 0) return [];
//         const query = QueryBuilder.table((model || this).tableName).where(byFields).delete().returning(returning);
//         const result = BaseModel.db.manyOrNone(query.toString());
//         return map(result, async r => new (model || this as GenericModel<T>)(r));
//     }

//     // tslint:disable-next-line:no-any
//     public async delete(byFields: any = { id: this.id }): Promise<this[]> {
//         return BaseModel.delete<this>(byFields, this.constructor as GenericModel<this>);
//     }

//     // tslint:disable-next-line:no-any
//     public static async deleteMany<T>(this: GenericModel<T> | typeof BaseModel, filterInField: string, filterIn: any[], model?: GenericModel<T>, returning: string = `id`): Promise<T[]> {
//         const query = QueryBuilder.table((model || this).tableName).whereIn(filterInField, filterIn).delete().returning(returning);
//         const result = BaseModel.db.manyOrNone(query);
//         return map(result, async r => new (model || this as GenericModel<T>)(r));
//     }

//     // tslint:disable-next-line:no-any
//     public async deleteMany(filterInField: string, filterIn: any[], returning: string = `id`): Promise<this[]> {
//         return BaseModel.deleteMany<this>(filterInField, filterIn, this.constructor as GenericModel<this>, returning);
//     }

//     public async findOne(fields: this): Promise<this | undefined> {
//         return BaseModel.findOne<this>(fields, this.constructor as GenericModel<this>);
//     }

//     public static async findOne<T>(this: GenericModel<T> | typeof BaseModel, fields: Partial<T>, model?: GenericModel<T>): Promise<T | undefined> {
//         CleanObject(fields);
//         if (Object.keys(fields).length === 0) return;
//         const query = QueryBuilder.table((model || this).tableName).select("*").where(fields).limit(1).toString();
//         const result = await BaseModel.db.oneOrNone(query);
//         if (!result) return;
//         return new (model || this as GenericModel<T>)(result);
//     }

//     public async find(fields: this): Promise<this[]> {
//         return BaseModel.find<this>(fields, this.constructor as GenericModel<this>);
//     }

//     // tslint:disable-next-line:no-any
//     public static async find<T>(this: GenericModel<T> | typeof BaseModel, fields: any, model?: GenericModel<T>): Promise<T[]> {
//         CleanObject(fields);
//         if (Object.keys(fields).length === 0) return [];
//         const query = QueryBuilder.table((model || this).tableName).select("*").where(fields).toString();
//         const result = await BaseModel.db.manyOrNone(query);
//         return map(result, async r => new (model || this as GenericModel<T>)(r));
//     }

//     // tslint:disable-next-line:no-any
//     public async findMany(filter: any, filterInField: string | undefined = undefined, filterIn: any[] | undefined = undefined, page: number = 1, limit: number = 100, disableLimit: boolean = false, orderBy = "id"): Promise<this[]> {
//         return BaseModel.findMany<this>(filter, filterInField, filterIn, page, limit, disableLimit, orderBy, this.constructor as GenericModel<this>, );
//     }

//     // tslint:disable-next-line:no-any
//     public static async findMany<T>(this: GenericModel<T> | typeof BaseModel, filter: any, filterInField: string | undefined = undefined, filterIn: any[] | undefined = undefined, page: number = 1, limit: number = 100, disableLimit: boolean = false, orderBy = "id", model?: GenericModel<T>): Promise<T[]> {
//         CleanObject(filter);
//         let query = QueryBuilder.table((model || this).tableName);
//         if (filterIn && filterInField) {
//             query.whereIn(filterInField, filterIn)
//                 .andWhere(filter);
//         } else {
//             query.where(filter);
//         }

//         query.orderBy(orderBy, 'desc');

//         if (!disableLimit) {
//             query.limit(NormalizeLimit(limit))
//                 .offset(NormalizeOffset(page - 1) * NormalizeLimit(limit));
//         }

//         const result = await BaseModel.db.manyOrNone(query.toString());
//         return map(result, async r => new (model || this as GenericModel<T>)(r));
//     }

//     // tslint:disable-next-line:no-any
//     public async findManyBetween(filter: any, dateField: string, range: [RangeType, RangeType], page: number = 1, limit: number = 100, disableLimit: boolean = false, orderBy = "id"): Promise<this[]> {
//         return BaseModel.findMany<this>(filter, dateField, range, page, limit, disableLimit, orderBy, this.constructor as GenericModel<this>);
//     }

//     // tslint:disable-next-line:no-any
//     public static async findManyBetween<T>(this: GenericModel<T> | typeof BaseModel, filter: any, dateField: string, range: [RangeType, RangeType], page: number = 1, limit: number = 100, disableLimit: boolean = false, model?: GenericModel<T>): Promise<T[]> {
//         CleanObject(filter);
//         const filterCopy = Object.assign({}, filter);
//         delete filterCopy.range;
//         delete filterCopy.page;
//         delete filterCopy.limit;
//         delete filterCopy.date_from;
//         delete filterCopy.date_to;
//         delete filterCopy.lang_id;

//         let query = QueryBuilder.table((model || this).tableName);
//         if (range && range.length > 0) {
//             query.whereBetween(dateField, range)
//                 .andWhere(filterCopy);
//         } else {
//             query.where(filterCopy);
//         }
//         query.orderBy('id', 'desc');

//         if (!disableLimit) {
//             query.limit(NormalizeLimit(limit))
//                 .offset(NormalizeOffset(page - 1) * NormalizeLimit(limit));
//         }

//         const result = await BaseModel.db.manyOrNone(query);
//         return map(result, async r => new (model || this as GenericModel<T>)(r));
//     }

//     public async list(page: number = 1, limit: number = 100, disableLimit: boolean = false): Promise<this[]> {
//         return BaseModel.list<this>(page, limit, disableLimit);
//     }

//     public static async list<T>(this: GenericModel<T> | typeof BaseModel, page: number = 1, limit: number = 100, disableLimit: boolean = false, model?: GenericModel<T>) {
//         const query = QueryBuilder.table((model || this).tableName)
//             .orderBy('id', 'asc')
//             .select('*');

//         if (!disableLimit) {
//             query.limit(NormalizeLimit(limit))
//                 .offset(NormalizeOffset(page - 1) * NormalizeLimit(limit));
//         }

//         const result = await BaseModel.db.manyOrNone(query);
//         return map(result, async r => new (model || this as GenericModel<T>)(r));
//     }


//     /**
//      * Async Adds an element to an Array
//      * 
//      * @param {(string | number)} value 
//      * @param {string} [data_type='id'] 
//      * @param {string} column 
//      * @param {string} [search_case='id'] 
//      * @param {(string|number)} search_value 
//      * @param {boolean} [distinct=true] 
//      * @param {string} [returning='*'] 
//      * @returns {Promise<this>} 
//      * @memberof BaseModel
//      */
//     public async addToArray(value: string | number, data_type: string = 'id', column: string, search_case: string = 'id', search_value: string | number, distinct: boolean = true, returning = '*'): Promise<this> {
//         // tslint:disable-next-line:no-any
//         return BaseModel.addToArray<this>(this as any, value, data_type, column, search_case, search_value, this.tableName, distinct, returning);
//     }
//     /**
//      * Async Adds an element to an Array
//      * 
//      * @static
//      * @template T 
//      * @param {T} model 
//      * @param {(string|number)} value 
//      * @param {string} data_type 
//      * @param {string} column 
//      * @param {string} [search_case='id'] 
//      * @param {(string|number)} search_value 
//      * @param {string} tableName 
//      * @param {boolean} [distinct=true] 
//      * @param {string} [returning='*'] 
//      * @returns {Promise<T>} 
//      * @memberof BaseModel
//      */
//     public static async addToArray<T>(model: T, value: string | number, data_type: string, column: string, search_case: string = 'id', search_value: string | number, tableName: string, distinct: boolean = true, returning = '*'): Promise<T> {
//         await AddToArray(tableName, column, search_case, search_value, value, data_type, distinct, returning);
//         // tslint:disable-next-line:no-any
//         if (!(model as any)[column]) (model as any)[column] = [];
//         if (distinct) {
//             // tslint:disable-next-line:no-any
//             if (!(model as any)[column].includes(search_value)) (model as any)[column].push(search_value);
//         }
//         // tslint:disable-next-line:no-any
//         else (model as any)[column].push(search_value);
//         return model;
//     }
//     /**
//      * Async Deletes an element from an Array
//      * 
//      * @param {(string | number)} value 
//      * @param {string} data_type 
//      * @param {string} column 
//      * @param {string} [search_case='id'] 
//      * @param {string} search_value 
//      * @param {string} [returning='*'] 
//      * @returns {Promise<this>} 
//      * @memberof BaseModel
//      */
//     public async removeFromArray(value: string | number, data_type: string, column: string, search_case: string = 'id', search_value: string | number, returning = '*'): Promise<this> {
//         // tslint:disable-next-line:no-any
//         return BaseModel.removeFromArray<this>(this as any, value, data_type, column, search_case, search_value, this.tableName, returning);
//     }

//     /**
//      * Async Deletes an element from an Array
//      * 
//      * @static
//      * @template T 
//      * @param {T} model 
//      * @param {(string|number)} value 
//      * @param {string} [data_type='id'] 
//      * @param {string} column 
//      * @param {string} [search_case='id'] 
//      * @param {(string|number)} search_value 
//      * @param {string} tableName 
//      * @param {string} [returning='*'] 
//      * @returns {Promise<T>} 
//      * @memberof BaseModel
//      */
//     public static async removeFromArray<T>(model: T, value: string | number, data_type: string = 'id', column: string, search_case: string = 'id', search_value: string | number, tableName: string, returning = '*'): Promise<T> {
//         await RemoveFromArray(tableName, column, search_case, search_value, value, data_type, returning);
//         // tslint:disable-next-line:no-any
//         let arr: any[] = (model as any)[column];
//         if (arr) {
//             // tslint:disable-next-line:no-any
//             arr = arr.filter((e: any) => e !== value);
//             // tslint:disable-next-line:no-any
//             (model as any)[column] = arr;
//         }
//         return model;
//     }
// }

// /**
//  * Sync Query string Builder for Adding elements to an Array
//  * 
//  * @export
//  * @param {string} table_name 
//  * @param {string} column 
//  * @param {string} search_case 
//  * @param {(string|number)} search_value 
//  * @param {(string|number)} value 
//  * @param {string} data_type 
//  * @param {boolean} [distinct=true] 
//  * @param {string} [returning='*'] 
//  * @returns {string} 
//  */
// export function AddToArrayQueryString(table_name: string, column: string, search_case: string, search_value: string | number, value: string | number, data_type: string, distinct: boolean = true, returning = '*'): string {
//     const uniq = distinct ? QueryBuilder.raw(`array_remove(${column}, ?::${data_type})`, value) : QueryBuilder.raw(column);
//     const str = QueryBuilder.raw(`
//             UPDATE ??
//             SET ?? = array_append(?, ?::${data_type}) 
//             WHERE ??.?? = ?
//             RETURNING ??;
//             `, [table_name, column, uniq, value, table_name, search_case, search_value, returning]).toString();
//     return str;
// }
// /**
//  * Async Helper for Adding elements to an Array
//  * 
//  * @export
//  * @param {string} tableName 
//  * @param {string} column 
//  * @param {string} search_case 
//  * @param {(string|number)} search_value 
//  * @param {(string|number)} value 
//  * @param {string} data_type 
//  * @param {boolean} [distinct=true] 
//  * @param {string} [returning='*'] 
//  * @returns {Promise<any[]>} 
//  */
// // tslint:disable-next-line:no-any
// export async function AddToArray(tableName: string, column: string, search_case: string, search_value: string | number, value: string | number, data_type: string, distinct: boolean = true, returning = '*'): Promise<any[]> {
//     return BaseModel.manyOrNone(AddToArrayQueryString(tableName, column, search_case, search_value, value, data_type, distinct, returning));
// }
// /**
//  * Sync Query string Builder for Removing elements from an Array
//  * 
//  * @param tableName 
//  * @param column 
//  * @param search_case 
//  * @param search_value 
//  * @param value 
//  * @param data_type 
//  * @param returning 
//  */
// export function RemoveFromArrayQueryString(tableName: string, column: string, search_case: string, search_value: string | number, value: string | number, data_type: string, returning = '*'): string {
//     const str = QueryBuilder.raw(`
//             UPDATE ??
//             SET ?? = array_remove(??, ?::${data_type}) 
//             WHERE ??.?? = ?
//             RETURNING ??;
//     `, [tableName, column, column, value, tableName, search_case, search_value, returning]).toString();
//     return str;
// }
// /**
//  * Async Helper for Removing elements from an Array
//  * 
//  * @export
//  * @param {string} tableName 
//  * @param {string} column 
//  * @param {string} search_case 
//  * @param {(string|number)} value 
//  * @param {string} data_type 
//  * @param {string} [returning='*'] 
//  * @returns 
//  */
// // tslint:disable-next-line:no-any
// export async function RemoveFromArray(tableName: string, column: string, search_case: string, search_value: string | number, value: string | number, data_type: string, returning = '*'): Promise<any[]> {
//     return BaseModel.manyOrNone(RemoveFromArrayQueryString(tableName, column, search_case, search_value, value, data_type, returning));
// }