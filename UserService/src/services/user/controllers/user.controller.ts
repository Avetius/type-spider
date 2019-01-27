// import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { UserSanitized } from '../models/user.sanitize';
// import { UserFilter } from '../filters/user.filter';

export class UserController {

  /**
   * register new user with validation
   * if validation errors throw error JSON with validation errors information
   *
   * @param {IUser} body
   * @param {boolean} without_email
   * @returns {Promise<IUser>}
   * @constructor
   */
  async RegisterUser(body: IUser): Promise<IUser> {
    // create new user
    const user = new UserSanitized(body);
    return user.saveAndReturn();
  }
  
}