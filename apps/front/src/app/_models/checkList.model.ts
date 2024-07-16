import { CheckListItem } from "./checkListItem.model";

export interface CheckList {
    _id?: string;
    name: string;
    items: CheckListItem[];
}