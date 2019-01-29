import { ErrorUtil, ErrorCodes } from '../../../../../CommonJS/src/errorHandling/errorCodes';
import { User } from './user.model';
import { IUser, IPublicUser } from '../interfaces/user.interface';
import { isEmail } from 'validator';
import { each } from 'bluebird';
import { isNull, isUndefined, isDate } from "util";
import { isString, round } from 'lodash'; 
import { UserRoles } from '../enums/user.enum';
// import { v4 } from 'uuid';

enum ValidationFieldTypes {
  STRING = 1,
  DATE,
  EMAIL
}

export class UserSanitized extends User {
  private static requiredFields = {
    'firstname': {
      type: ValidationFieldTypes.STRING,
      minLength: 3,
      error: ErrorCodes.INVALID_FIRST_NAME
    },
    'lastname': {
      type: ValidationFieldTypes.STRING,
      minLength: 3,
      error: ErrorCodes.INVALID_LAST_NAME
    },
    'birth': {
      type: ValidationFieldTypes.DATE,
      error: ErrorCodes.INVALID_BIRTHDAY
    },
    'country': {
      type: ValidationFieldTypes.STRING,
      minLength: 3,
      error: ErrorCodes.INVALID_COUNTRY
    },
    'address_1': {
      type: ValidationFieldTypes.STRING,
      minLength: 3,
      error: ErrorCodes.INVALID_ADDRESS
    },
    'city': {
      type: ValidationFieldTypes.STRING,
      minLength: 3,
      error: ErrorCodes.INVALID_CITY
    },
    'state': {
      type: ValidationFieldTypes.STRING,
      minLength: 2,
      error: ErrorCodes.INVALID_STATE
    },
    'phone': {
      type: ValidationFieldTypes.STRING,
      minLength: 8,
      error: ErrorCodes.INVALID_PHONE
    },
    'email': {
      type: ValidationFieldTypes.EMAIL,
      error: ErrorCodes.INVALID_EMAIL
    },
    'username': {
      type: ValidationFieldTypes.STRING,
      minLength: 3,
      error: ErrorCodes.INVALID_USERNAME
    },
    'password': {
      type: ValidationFieldTypes.STRING,
      minLength: 6,
      error: ErrorCodes.INVALID_PASSWORD
    },
  };
  private modelIsValidated: boolean = false;
  public password: string;

  constructor(init: IUser) {
    super(init);
    this.role = UserRoles.User;
    this.password = init.password;
  }

  /**
   * public model save method
   * default validate model before save
   *
   * @param {boolean} needValidate
   * @param {boolean} send_email
   * @returns {Promise<IUser>}
   */
  public async saveAndReturn(): Promise<IPublicUser> {
    await this.validateUserInfo();
    return await this.saveAndSendEmail();
  }

  /**
   * getter model validation status
   *
   * @returns {boolean}
   */
  public get isValid(): boolean {
    return this.modelIsValidated;
  }

  /**
   * private model save method
   * create user.password_hash,
   * send registration email
   * and save user to db
   *
   * @returns {Promise<IUser>}
   */
  private async saveAndSendEmail(): Promise<IPublicUser> {
    await this.generateHash();

    // sendmail

    // broker.publishMessageWithCode(CommunicationCodes.SEND_EMAIL_REGISTRATION, {
    //     category: EmailCategory.IMPORTANT,
    //     email: this.email,
    //     username: this.username,
    //     first_name: this.firstname,
    //     last_name: this.lastname,
    //     // TODO: change this user to domain api url and rewrite url in nginx and point to our api
    //     url: "https://api.bet-makers.com/v1/verify/email?hash=" + hash,
    // }, QueueType.EMAIL_SERVICE);
    // save user to DB
    const saved = await new User(this).saveWithID();
    return <IPublicUser>saved;
  }

  /**
   * private start validation method
   *
   * @returns {void}
   */
  private async validateUserInfo(): Promise<void> {
    await this.validateFields();
    this.modelIsValidated = true;
  }

  /**
   * validate models field
   * fields and rules to validation in model field `requiredFields`
   *
   * @returns {void}
   */
  private async validateFields(): Promise<void> {
    await each(Object.keys(UserSanitized.requiredFields), async key => {
      await this.checkRequiredFields(key);
      // check username
      if (key === 'username') await this.checkUserUniq(key)
        .catch(() => {
          throw ErrorUtil.newError(ErrorCodes.USERNAME_ALREADY_EXISTS);
        });
      // check phone
      if (key === 'phone') await this.checkUserUniq(key)
        .catch(() => {
          throw ErrorUtil.newError(ErrorCodes.PHONE_ALREADY_EXISTS);
        });
      // check email
      if (key === 'email' && isEmail(<string>this[key])) await this.checkUserUniq(key)
        .catch(() => {
          throw ErrorUtil.newError(ErrorCodes.EMAIL_ALREADY_EXISTS);
        });
      if (key === 'email' && !isEmail(<string>this[key])) throw ErrorUtil.newError(UserSanitized.requiredFields[key].error);
      // check other fields
      if (UserSanitized.requiredFields[key].type === ValidationFieldTypes.STRING) this.validateStringField(key);
      if (UserSanitized.requiredFields[key].type === ValidationFieldTypes.DATE) this.validateDateFiled(key);
    });
  }

  /**
   * validate required fields
   *
   * @param {string} fieldName
   * @returns {void}
   */
  private async checkRequiredFields(fieldName: string): Promise<void> {
      if (isNull(this[fieldName]) || isUndefined(this[fieldName])) {
          throw ErrorUtil.newError(UserSanitized.requiredFields[fieldName].error);
      }
  }

  /**
   * validate Date type fields
   *
   * @param {string} fieldName
   * @returns {void}
   */
  private validateDateFiled(fieldName: string): void {
      let field = new Date(this[fieldName]);

      if (field.toString() === 'Invalid Date') {
          throw ErrorUtil.newError(UserSanitized.requiredFields[fieldName].error);
      } else {
          if (fieldName === 'birth' && this.calculateAge(field) < 18) {
              throw ErrorUtil.newError(ErrorCodes.INVALID_AGE_18);
          }
      }
  }
  
  /**
   * validate String type fields
   *
   * @param {string} fieldName
   * @param {number} minLength, default 3
   * @returns {void}
   */
  private validateStringField(fieldName: string): void {
      if (isString(this[fieldName]) && this[fieldName].length < UserSanitized.requiredFields[fieldName]) {
          throw ErrorUtil.newError(UserSanitized.requiredFields[fieldName].error);
      }
  }

  /**
   * validate user uniq
   *
   * @param {string} fieldName
   * @returns {void}
   */
  private async checkUserUniq(fieldName: string): Promise<void> {
      // try to find user
      const user = await User.findOne({ [fieldName]: this[fieldName] });
      // if user already exists return
      if (user) throw ErrorUtil.newError(ErrorCodes.USER_ALREADY_EXISTS);
  }

  private calculateAge(date: Date): number {
    return isDate(date) ? round((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365), 0) : 0;
}
}