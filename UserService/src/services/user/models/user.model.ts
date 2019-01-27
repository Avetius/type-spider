import { BaseModel } from "../../../../../CommonJS/src/base/base.model";
import { IUser } from "../interfaces/user.interface";
import { UserRoles } from "../enums/user.enum";
import { promisify } from 'bluebird';
import { pbkdf2, randomBytes } from 'crypto';


export class User extends BaseModel implements IUser {
    public static tableName: string = 'users';
    public id?: number;
    public username?: string;
    
    public email?: string;
    public password?: string;
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

    private salt: string;

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

    private generateRandomString(size: number = 16) {
        const randomBytesAsync = promisify(randomBytes);
        return randomBytesAsync(size).then(buffer => buffer.toString('hex').slice(0, size));
    }

    private generatePBKDF2Key(password: string, salt: string) {
        const pbkdf2Async = promisify(pbkdf2);
        return pbkdf2Async(password, salt, 1000, 64, 'sha512').then(buffer => buffer.toString('hex'));
    }
    /**
     * Async Generates Salt and Password Hash and attaches them to the User
     * 
     * @param {string} password 
     * 
     * @memberof User
     */
    public async generateSaltAndHash(password: string = 'defaultpassword') {
        this.salt = this.salt ? this.salt : await this.generateRandomString();
        this.password = await this.generatePBKDF2Key(password, this.salt);
    }

}
