import { BaseModel } from "../../../../../CommonJS/src/base/base.model";
import { IUser, IPublicUser } from "../interfaces/user.interface";
import { UserRoles } from "../enums/user.enum";
import * as bcrypt from 'bcrypt-nodejs';


export class User extends BaseModel implements IUser {
  public static tableName: string = 'users';
  public id?: number;
  public username?: string;
  
  public email?: string;
  public password: string;
  public subTopic?: string;
  
  public firstname?: string;
  public lastname?: string;
  public birth?: string;
  public country?: string;
  public address_1?: string;
  public city?: string;
  public state?: string;
  public zip_code?: string;
  public phone?: string;
  
  
  public facebookID?: string;
  public facebookToken?: string;
  public facebookEmail?: string;
  public facebookName?: string;
  
  public twitterID?: string;
  public twitterToken?: string;
  public twitterDisplayName?: string;
  public twitterUsername?: string;
  
  public googleID?: string;
  public googleToken?: string;
  public googleEmail?: string;
  public googleName?: string;

  public emailVerified: boolean;
  public role: UserRoles;
  
  constructor(data: IUser) {
    super();
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.subTopic = data.subTopic;

    this.facebookID = data.facebookID;
    this.facebookToken = data.facebookToken;
    this.facebookEmail = data.facebookEmail;
    this.facebookName = data.facebookName;

    this.twitterID = data.twitterID;
    this.twitterToken = data.twitterToken;
    this.twitterDisplayName = data.twitterDisplayName;
    this.twitterUsername = data.twitterUsername;

    this.googleID = data.googleID;
    this.googleToken = data.googleToken;
    this.googleEmail = data.googleEmail;
    this.googleName = data.googleName;

    this.emailVerified = data.emailVerified ? data.emailVerified : false;
    this.role = data.role ? data.role : UserRoles.User;
  }

  public generateHash = () => {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  public validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  }
}

export class PublicUser extends BaseModel implements IPublicUser {
  public static tableName: string = 'users';
  public id?: number;
  public username?: string;
  public email?: string;
  public firstname?: string;
  public lastname?: string;
  public birth?: string;
  public country?: string;
  public emailVerified: boolean;
  public role: UserRoles;

  constructor(data: IUser) {
    super();
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.birth = data.birth;
    this.country = data.country;
    this.emailVerified = data.emailVerified;
    this.role = data.role;
  }
}