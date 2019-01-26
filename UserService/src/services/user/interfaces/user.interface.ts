import { UserRoles } from '../enums/user.enum';

interface IUserPublic {
  email?: string;
  password?: string;
  
  facebook_id?: string;
  facebook_token?: string;
  facebook_name?: string;
  facebook_email?: string;
  
  google_id?: string;
  google_token?: string;
  google_email?: string;
  google_name?: string;
  
  role: UserRoles;
  verified: boolean;
}


// interface IUser extends IUserPublic {
//   create(attr: <Partial> IUserPublic );
//   update(attr: <Partial> IUserPublic );
// }
export default IUserPublic;
