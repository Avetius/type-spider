import { BaseModel } from "../../../../../CommonJS/src/base/base.model";
import { IUsersModel, IUsersUpdateModel } from "../interfaces/users.interface";
import { BonusType } from "../../risk_group/enums/bonus_type.enum";

export class UsersUpdateModel extends BaseModel implements IUsersUpdateModel {
    public static tableName: string = 'sports_users';
    public id?: number;
    public risk_group_id: number;
    public favorite_sports: number[];
    public acceptance_policy: number;
    public quick_bet: boolean;
    public time_zone: string;
    public bet_factor: number | null;
    public in_play_bet_delay: number | null;
    public max_stake: number | null;
    public max_won: number | null;
    public min_comb: number | null;
    public max_comb: number | null;
    public overask: boolean | null;
    public bonuses: BonusType[];

    constructor(data: IUsersModel) {
        super();
        this.id = data.id;
        this.risk_group_id = data.risk_group_id;
        this.favorite_sports = data.favorite_sports;
        this.acceptance_policy = data.acceptance_policy;
        this.quick_bet = data.quick_bet;
        this.time_zone = data.time_zone;
        this.bet_factor = data.bet_factor;
        this.in_play_bet_delay = data.in_play_bet_delay;
        this.max_stake = data.max_stake;
        this.max_won = data.max_won;
        this.min_comb = data.min_comb;
        this.max_comb = data.max_comb;
        this.overask = data.overask;
        this.bonuses = data.bonuses;
    }
}

export class UsersModel extends UsersUpdateModel implements IUsersModel {
    public id: number;
    public external_user_id: number;

    constructor(data: IUsersModel) {
        super(data);
        this.external_user_id = data.external_user_id;
    }
}
