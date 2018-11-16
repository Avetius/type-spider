class IUser {
  public email?: string;
    
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
  privileges: string;
}

export default IUser;
