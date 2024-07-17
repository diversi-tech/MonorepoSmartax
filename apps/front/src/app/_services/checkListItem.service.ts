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

    // פונקציה להוספת נתונים
    createCheckListItem(checkListItem: CheckListItem): Observable<CheckListItem> {
        return this.http.post<CheckListItem>(`${CHECKLISTITEM_ENDPOINT}`, checkListItem);
    }

    // פונקציה לקריאת כל הנתונים
    getCheckListItems(): Observable<CheckListItem[]> {
        return this.http.get<CheckListItem[]>(`${CHECKLISTITEM_ENDPOINT}`);
    }

    // פונקציה לעדכון נתונים
    updateCheckListItem(checkListItem: CheckListItem): Observable<CheckListItem> {
        return this.http.put<CheckListItem>(`${CHECKLISTITEM_ENDPOINT}/${checkListItem._id}`, checkListItem);
    }

    // פונקציה למחיקת נתונים
    deleteCheckListItem(id: string): Observable<CheckListItem> {
        return this.http.delete<CheckListItem>(`${CHECKLISTITEM_ENDPOINT}/${id}`);
    }

    
}