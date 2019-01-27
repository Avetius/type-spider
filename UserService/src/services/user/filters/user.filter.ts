import { QueryBuilder } from "../../../../../CommonJS/src/base/base.model";
import { User } from "../models/user.model";
import { NormalizeLimit, NormalizePage } from "../../../../../CommonJS/src/utils/utils";
import { IPublicUser, IUserFilter } from "../interfaces/user.interface";
// import { map } from "bluebird";
// import { uniq } from "lodash";
// import { IUser } from "../interfaces/user.interface";

export class UserFilter implements IUserFilter {
  public id?: number;
  public ids?: number[];
  public username?: string;
  public usernames?: string[];
  public firstname?: string;
  public firstnames?: string[];
  public lastname?: string;
  public lastnames?: string[];
  public email?: string;
  public emails?: string[];
  public role?: string;
  public roles?: string[];
  public emailVerified: boolean;
  public phoneVerified: boolean;

  public subTopic: boolean;
  public subTopics: string[];
  public limit: number;
  public page: number;
  public order: string;

  constructor(filter: IUserFilter) {
    this.id = filter.id;
    this.ids = filter.ids;
    this.username = filter.username;
    this.usernames = filter.usernames;
    this.firstname = filter.firstname;
    this.firstnames = filter.firstnames;
    this.lastname = filter.lastname;
    this.lastnames = filter.lastnames;
    this.email = filter.email;
    this.emails = filter.emails;
    this.emailVerified = filter.emailVerified;
    this.subTopic = filter.subTopic;
    this.subTopics = filter.subTopics;
    this.limit = filter.limit;
    this.page = filter.page;
    this.order = filter.order;

    this.page = NormalizePage((filter.page || 1) - 1);
    this.limit = NormalizeLimit(filter.limit);
  }

  public async find(): Promise<IPublicUser[]> {
    const query = QueryBuilder
      .table(User.tableName)
      .offset(this.page * this.limit)
      .orderBy("id", this.order)
      .select('*')
      .select(QueryBuilder.raw(`count(*) OVER() AS full_count`));

    if (!this.limit) {
      query.limit(this.limit)
        .offset(this.page * this.limit);
    }

    if (this.id) query.where(`${User.tableName}.id`, this.id);
    if (this.ids) query.whereIn(`${User.tableName}.id`, this.ids);

    if (this.username) query.where(`${User.tableName}.username`, `ilike`, `%${this.username}%`);
    if (this.firstname) query.where(`${User.tableName}.firstname`, `ilike`, `%${this.firstname}%`);
    if (this.lastname) query.where(`${User.tableName}.lastname`, `ilike`, `%${this.lastname}%`);
    if (this.email) query.where(`${User.tableName}.email`, `ilike`, `%${this.email}%`);

    // if (this.emails) query.whereIn(`${User.tableName}.email`, `${this.emails}`);

    if (this.roles) query.whereRaw(`${User.tableName}.roles @> ARRAY[` + this.roles.map(r => "'" + r + "'").join(`,`) + `]::varchar[]`);

    if (typeof this.emailVerified === 'boolean') query.where(`${User.tableName}.email_verified`, this.emailVerified);
    if (typeof this.phoneVerified === 'boolean') query.where(`${User.tableName}.phone_verified`, this.phoneVerified);

    return User.manyOrNone(query.toString());
  }

  public async getQuery(selectedField: string = '*', unlimit: boolean = false): Promise<string> {
    const query = QueryBuilder.table(User.tableName);
    query.select(`${User.tableName}.${selectedField}`);
    query.select(QueryBuilder.raw(`count(*) OVER() AS full_count`));

    
    return query.toString();
  }

}