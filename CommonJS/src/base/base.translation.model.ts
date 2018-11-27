// import { BaseModel } from "./base.model";
// import { Dictionary } from "../components/translates/models/dictionary.model";

// export class BaseTranslation extends BaseModel {
//     public id?: number;
//     public dict_id?: number;
//     public lang_id?: number;
//     public translation?: string;

//     constructor(data: Partial<BaseTranslation>) {
//         super();
//         this.id = data.id;
//         this.dict_id = data.dict_id;
//         this.lang_id = data.lang_id;
//         this.translation = data.translation;
//     }

//     public async saveWithID(conflict_rule?: string, dict_id?: number): Promise<this> {
//         if (!dict_id) {
//             const dictionary = await new Dictionary({}).saveWithID(conflict_rule);
//             dict_id = dictionary.id;
//         }
//         this.dict_id = dict_id;
//         if (!this.translation) return this;
//         return super.saveWithID();
//     }

//     public async delete(): Promise<this[]> {
//         const result = await super.delete();
//         await Dictionary.delete({ id: this.dict_id });
//         return result;
//     }
// }