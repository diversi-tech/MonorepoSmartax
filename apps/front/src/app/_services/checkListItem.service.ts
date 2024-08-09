//service for checkListItem
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckListItem } from '../_models/checkListItem.model';
import { CHECKLISTITEM_ENDPOINT } from '../api-urls';

@Injectable({
    providedIn: 'root'
})
export class CheckListItemService {
    constructor(private http: HttpClient) {}

    createCheckListItem(checkListItem: CheckListItem): Observable<CheckListItem> {
        return this.http.post<CheckListItem>(`${CHECKLISTITEM_ENDPOINT}`, checkListItem);
    }

    getCheckListItems(): Observable<CheckListItem[]> {
        return this.http.get<CheckListItem[]>(`${CHECKLISTITEM_ENDPOINT}`);
    }

    updateCheckListItem(checkListItem: CheckListItem): Observable<CheckListItem> {
        return this.http.put<CheckListItem>(`${CHECKLISTITEM_ENDPOINT}}`, checkListItem);
    }

    deleteCheckListItem(id: string): Observable<CheckListItem> {
        return this.http.delete<CheckListItem>(`${CHECKLISTITEM_ENDPOINT}/${id}`);
    }
}