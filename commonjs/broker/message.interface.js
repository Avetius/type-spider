import { CommunicationCodes } from "./CommunicationCodes";
import { IUser } from "../../../CoreService/src/components/users/interfaces/user.interface"
import { ChannelType } from "../enums/channel_type.enum";
export interface IMessage {
    body: any;
    code: CommunicationCodes;
    user: IUser;
    ip: string;
    requestSettings?: IRequestInfo;
}
export interface IRequestInfo {
    lang_id: number;
    website_id: number;
    channel_id: ChannelType;
}