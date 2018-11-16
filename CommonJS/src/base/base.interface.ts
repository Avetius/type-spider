// import * as knex from 'knex';
// import { ChannelType } from "../enums/channel_type.enum";
// import { IUser } from "../../../CoreService/src/components/users/interfaces/user.interface";
// type RangeType = string | number | boolean | Date | Array<string> | Array<number> | Array<Date> | Array<boolean> | Buffer | knex.Raw;

// export interface IBase {
//     // tslint:disable-next-line:no-any
//     save(conflictRule?: string): Promise<any>;
//     // tslint:disable-next-line:no-any
//     saveWithID(conflictRule?: string): Promise<any>;
//     // tslint:disable-next-line:no-any
//     update(data?: any, byFields?: any): Promise<any>;
//     // tslint:disable-next-line:no-any
//     delete(byFields?: any): Promise<any>;
//     // tslint:disable-next-line:no-any
//     deleteMany(filterInField: string, filterIn: any[]): Promise<any>;
//     // tslint:disable-next-line:no-any
//     findOne(fields: any): Promise<any | undefined>;
//     // tslint:disable-next-line:no-any
//     findMany(filter: any, filterInField: string | undefined, filterIn: any[] | undefined, page: number, limit: number): Promise<any[] | undefined>;
//     // tslint:disable-next-line:no-any
//     findManyBetween(filter: any, dateField: string, range: [RangeType, RangeType], page: number, limit: number): Promise<any[]>;
//     // tslint:disable-next-line:no-any
//     list(page: number, limit: number, disableLimit: boolean): Promise<any[]>;
//     addToArray(value: string | number, data_type: string, column: string, search_case: string, search_value: string | number, distinct: boolean, returning?: string): Promise<this>;
//     removeFromArray(value: string | number, data_type: string, column: string, search_case: string, search_value: string | number, returning?: string): Promise<this>;
// }

// export interface IBaseWithLogger extends IBase {
//     sourceData: IUser;
//     autoSendLog?: boolean;
// }

// export interface LoggerDataInterface {
//     model_id: number;
//     object_before: object | null | undefined;
//     object_after: object | null | undefined;
// }

// export interface ISaveModelWithChannelType {
//     website_id?: number;
//     channel_id?: ChannelType;
// }

// export interface IModelWithChannelType {
//     website_id: number;
//     channel_id: ChannelType;
// }

// export interface IModelWithLanguage {
//     lang_id: number;
// }

// export interface IModelSaveWithLanguage {
//     lang_id?: number;
// }