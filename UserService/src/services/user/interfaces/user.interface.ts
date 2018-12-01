import { UserRoles } from '../enums/user.enum';
class IUser {
  public email?: string;
  public password?: string;
  public facebook_id?: string;
  public facebook_token?: string;
  public facebook_name?: string;
  public facebook_email?: string;
   
  public google_id?: string;
  public google_token?: string;
  public google_email?: string;
  public google_name?: string;
  
  public role: UserRoles;
  public verified: boolean;
}

export default IUser;
