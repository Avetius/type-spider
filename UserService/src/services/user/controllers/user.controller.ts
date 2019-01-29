// import { User } from '../models/user.model';
import { IUser, IUserFilter, IPublicUser } from '../interfaces/user.interface';
import { UserSanitized } from '../models/user.sanitize';
import { UserFilter } from '../filters/user.filter';
import { ErrorUtil, ErrorCodes } from '../../../../../CommonJS/src/errorHandling/errorCodes';

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
  async create(body: IUser): Promise<IPublicUser> {
    // create new user
    if(!body.email && !body.password) throw ErrorUtil.newError(ErrorCodes.WRONG_USERNAME_PASSWORD);
    const exists = await this.findOne({email: body.email});
    if (exists) throw ErrorUtil.newError(ErrorCodes.USER_ALREADY_EXISTS);

    const user = new UserSanitized(body);
    return await user.saveAndReturn();
  }

  /**
   * register new user with validation
   * if validation errors throw error JSON with validation errors information
   *
   * @param {IUser} body
   * @param {boolean} without_email
   * @returns {Promise<IUser>}
   * @constructor
   */
  async update(body: IUser): Promise<IPublicUser> {
    // create new user
    if(!body.email && !body.password) throw ErrorUtil.newError(ErrorCodes.WRONG_USERNAME_PASSWORD);
    const exists = await this.findOne({email: body.email});
    if (exists) throw ErrorUtil.newError(ErrorCodes.USER_ALREADY_EXISTS);

    const user = new UserSanitized(body);
    return await user.saveAndReturn();
  }

  /**
   * list users
   *
   * @param {IUserFilter} body
   * @param {boolean} without_email
   * @returns {Promise<IUser>}
   * @constructor
   */
  async find(body: Partial<IUserFilter>): Promise<IPublicUser[]> {
    // create new user
    const user = new UserFilter(body).find();
    return user;
  }

  /**
   * findOne user 
   *
   * @param {IUserFilter} body
   * @param {boolean} without_email
   * @returns {Promise<IUser>}
   * @constructor
   */
  async findOne(body: Partial<IUserFilter>): Promise<IPublicUser | undefined> {
    // create new user
    const [ user ] = await this.find(body);
    return user;
  }
}