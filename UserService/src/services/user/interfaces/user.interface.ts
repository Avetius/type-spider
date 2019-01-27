import { UserRoles } from '../enums/user.enum';

export interface IUser {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  subTopic?: string;
  
  firstname?: string;
  lastname?: string;
  birth?: string;
  country?: string;
  address_1?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone?: string;

  facebookID?: string;
  facebookToken?: string;
  facebookEmail?: string;
  facebookName?: string;
  
  twitterID?: string;
  twitterToken?: string;
  twitterDisplayName?: string;
  twitterUsername?: string;

  googleID?: string;
  googleToken?: string;
  googleEmail?: string;
  googleName?: string;
  
  emailVerified: boolean;
  role: UserRoles;
}

export interface IPublicUser {
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  birth?: string;
  country?: string;
  emailVerified: boolean;
  role: UserRoles;
}

export interface IUserFilter {
  id?: number;
  ids?: number[];
  username?: string;
  usernames?: string[];
  firstname?: string;
  firstnames?: string[];
  lastname?: string;
  lastnames?: string[];
  email?: string;
  emails?: string[];
  registration_ip?: string;
  registration_ips?: string[];
  role?: string;
  roles?: string[];
  emailVerified: boolean;
  phoneVerified: boolean;
  subTopic: boolean;
  subTopics: string[];
  limit: number;
  page: number;
  order: string;
}

// interface IUser extends IUserPublic {
//   create(attr: <Partial> IUserPublic );
//   update(attr: <Partial> IUserPublic );
// }

