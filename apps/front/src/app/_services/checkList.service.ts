//service for checkList
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckList } from '../_models/checkList.model';
import { CHECKLIST_ENDPOINT } from '../api-urls';


@Injectable({
    providedIn: 'root'
})
export class CheckListService {
    constructor(private http: HttpClient) { }

    // פונקציה להוספת נתונים
    createCheckList(checkList: CheckList, taskId: string): Observable<CheckList> {
        return this.http.post<CheckList>(`${CHECKLIST_ENDPOINT}`, { checkList, taskId });
    }

    // פונקציה לקריאת כל הנתונים
    getCheckLists(itemId: string): Observable<CheckList> {
        return this.http.get<CheckList>(`${CHECKLIST_ENDPOINT}/${itemId}`,
            // { params: { id: itemId } }
        );
    };


    // פונקציה לקריאת כל הנתונים
    getAllCheckLists(): Observable<CheckList[]> {
        return this.http.get<CheckList[]>(`${CHECKLIST_ENDPOINT}`);
    }

    // פונקציה לעדכון נתונים
    updateCheckList(checkList: CheckList): Observable<CheckList> {
        return this.http.put<CheckList>(`${CHECKLIST_ENDPOINT}/${checkList._id}`, checkList);
    }

    // פונקציה למחיקת נתונים
    deleteCheckList(id: string): Observable<CheckList> {
        return this.http.delete<CheckList>(`${CHECKLIST_ENDPOINT}/${id}`);
    }
}


