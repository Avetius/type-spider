// import { BaseModel, broker, GenericModel } from './base.model';
// import { IUser } from "../../../CoreService/src/components/users/interfaces/user.interface";
// import { isNotNumber } from "../utils/validators";
// import { merge, cloneDeep } from "lodash";
// import { each } from 'bluebird';
// import { HistoryActionType } from "../../../HistoryService/src/common/enums/history_action_type.enum";
// import { User } from "../../../CoreService/src/components/users/models/user.model";
// import { CommunicationCodes } from "../messaging/CommunicationCodes";
// import { QueueType } from "../messaging/QueueType";
// import { LoggerDataInterface } from "./base.interface";
// import { SourceType } from "../enums/source_type.enum";
// import { isEqual } from 'lodash';

// export class BaseModelWithLogger extends BaseModel {
//     protected sourceInfo: IUser;
//     protected modelId?: number;
//     public autoSendLog: boolean = true;

//     constructor(source?: IUser) {
//         super();
//         if (source) this.sourceData = source;
//     }

//     public set model_id(id: number) {
//         this.modelId = id;
//     }

//     /**
//      * setter method + set default value
//      *
//      * @param {IUser} source
//      */
//     public set sourceData(source: IUser) {
//         if (isNotNumber(source.id)) source.id = 0;
//         if (!source.user_roles) source.user_roles = [];
//         this.sourceInfo = source;
//     }

//     /**
//      * get info about source user
//      *
//      * @returns {IUser}
//      */
//     public get sourceData(): IUser {
//         return this.sourceInfo;
//     }

//     /**
//      * save instance to db
//      * and send message to HistoryService about this
//      *
//      * @param {string} conflictRule
//      * @returns {Promise<this>}
//      */
//     public async saveWithID(conflictRule?: string): Promise<this> {
//         const savedData = this.cleanThis;
//         const saved = await BaseModel.saveWithID<this>(savedData, conflictRule, this.constructor as GenericModel<this>);
//         merge(this, saved);
//         if (this.autoSendLog) {
//             this.sendLog({
//                 model_id: !isNotNumber(this.modelId) ? this.modelId : <number>saved.id,
//                 object_before: null,
//                 object_after: saved
//             }, HistoryActionType.CREATE);
//         }
//         delete this.sourceInfo;
//         return this;
//     }

//     /**
//      * save instance to db
//      * and send message to HistoryService about this
//      *
//      * @param {string} conflictRule
//      * @returns {Promise<this>}
//      */
//     public async save(conflictRule?: string): Promise<this> {
//         const savedData = this.cleanThis;
//         const saved = await BaseModel.save<this>(savedData, conflictRule, this.constructor as GenericModel<this>);
//         merge(this, saved);
//         if (this.autoSendLog) {
//             this.sendLog({
//                 model_id: !isNotNumber(this.modelId) ? this.modelId : <number>saved.id,
//                 object_before: null,
//                 object_after: saved
//             }, HistoryActionType.CREATE);
//         }
//         delete this.sourceInfo;
//         return this;
//     }

//     /**
//      * save edited instance, or edit instance with data and save to db
//      * and send message to HistoryService
//      *
//      * @param data
//      * @param byFields
//      * @param {string} conflictRule
//      * @returns {Promise<this>}
//      */
//     // tslint:disable-next-line:no-any
//     public async update(data: any = this, byFields: any = { id: this.id }, conflictRule?: string): Promise<this> {
//         const updatedData = this.cleanThis;
//         const object_before = cloneDeep(this);
//         data = this.cleanData(cloneDeep(data));
//         const updated = await BaseModel.update(Object.assign(updatedData, data), byFields, conflictRule, this.constructor as GenericModel<this>);
//         let baseName = `base_name`;
//         if (updated.hasOwnProperty(baseName)) delete updated[baseName];
//         if (this.autoSendLog) {
//             this.sendLog({
//                 model_id: !isNotNumber(this.modelId) ? this.modelId : <number>this.id,
//                 object_before: object_before,
//                 object_after: updated
//             }, HistoryActionType.UPDATE);
//         }
//         delete this.sourceInfo;
//         return Object.assign(this, updated);
//     }

//     /**
//      * delete instance from db, or delete from db with filter byFields
//      * and send message to HistoryService
//      *
//      * @param byFields
//      * @returns {Promise<this[]>}
//      */
//     // tslint:disable-next-line:no-any
//     public async delete(byFields: any = { id: this.id }): Promise<this[]> {
//         if (this.autoSendLog) {
//             this.sendLog({
//                 model_id: !isNotNumber(this.modelId) ? this.modelId : <number>this.id,
//                 object_before: this,
//                 object_after: null
//             }, HistoryActionType.DELETE);
//         }
//         return super.delete(byFields);
//     }

//     /**
//      * delete many items from db
//      * and send message to HistoryService
//      *
//      * @param {string} filterInField
//      * @param {any[]} filterIn
//      * @returns {Promise<this[]>}
//      */
//     // tslint:disable-next-line:no-any
//     public async deleteMany(filterInField: string, filterIn: any[]): Promise<this[]> {
//         const deleted = await super.deleteMany(filterInField, filterIn, `*`);
//         if (this.autoSendLog) {
//             await each(deleted, item => {
//                 this.sendLog({
//                     model_id: <number>item.id,
//                     object_before: item,
//                     object_after: null
//                 }, HistoryActionType.DELETE);
//             });
//         }
//         return deleted;
//     }

//     /**
//      * send message to HistoryService with logged info
//      *
//      * @param {LoggerDataInterface} data
//      * @param {HistoryActionType} type
//      * @param {CommunicationCodes} code
//      * @param {IUser} source
//      */
//     public sendLog(data: LoggerDataInterface, type?: HistoryActionType, source?: IUser, code: CommunicationCodes = CommunicationCodes.ADD_NEW_HISTORY_ITEM): void {
//         if (source && !this.sourceData) this.sourceData = source;
//         const autorInfo = {
//             source_type: User.isAdmin(this.sourceData) ? SourceType.ADMIN : SourceType.FEED,
//             source_id: this.sourceData.id
//         };
//         if (data.object_before) data.object_before = this.cleanData(data.object_before);
//         if (data.object_after) data.object_after = this.cleanData(data.object_after);
//         if (isEqual(data.object_before, data.object_after)) return;
//         const historyData = Object.assign(data, autorInfo, {
//             action_type: type,
//             table_name: this.tableName
//         });
//         broker.publishMessageWithCode(code, historyData, QueueType.HISTORY_SERVICE);
//     }

//     public static SendLog(tableName: string, data: LoggerDataInterface, type: HistoryActionType, source: IUser, code: CommunicationCodes = CommunicationCodes.ADD_NEW_HISTORY_ITEM): void {

//         const autorInfo = {
//             source_type: User.isAdmin(source) ? SourceType.ADMIN : SourceType.FEED,
//             source_id: source.id
//         };
//         if (data.object_before) {
//             delete data.object_before['autoSendLog'];
//             delete data.object_before['sourceInfo'];
//         }
//         if (data.object_after) {
//             delete data.object_after['autoSendLog'];
//             delete data.object_after['sourceInfo'];
//         }
//         const historyData = Object.assign(data, autorInfo, {
//             action_type: type,
//             table_name: tableName
//         });
//         broker.publishMessageWithCode(code, historyData, QueueType.HISTORY_SERVICE);
//     }

//     /**
//      * return new object, copy from this, without sourceInfo field
//      *
//      * @returns {this}
//      */
//     private get cleanThis(): this {
//         const data = cloneDeep(this);
//         return this.cleanData(data);
//     }

//     /**
//      * remove sourceInfo field from object
//      *
//      * @param data
//      * @returns {any}
//      */
//     private cleanData(data) {
//         delete data.sourceInfo;
//         delete data.autoSendLog;
//         delete data.modelId;
//         return data;
//     }
// }