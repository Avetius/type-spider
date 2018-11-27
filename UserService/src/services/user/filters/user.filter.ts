/* tslint:disable:variable-name*/
class UserFilter {
  public _id?: string;
  public email?: string;
  public password?: string;
    
  public facebook?: {
    id?: string,
    token?: string,
    name?: string,
    email?: string,
  }; 

  public twitter?: {
    id?: string,
    token?: string,
    displayName?: string,
    username?: string,
  };

  public google?: {
    id?: string,
    token?: string,
    email?: string,
    name?: string,
  };
  privileges?:string;
}

export default UserFilter;
