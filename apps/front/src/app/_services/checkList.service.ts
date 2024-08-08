//service for checkList
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { CheckList } from '../_models/checkList.model';
import { CHECKLIST_ENDPOINT } from '../api-urls';


@Injectable({
    providedIn: 'root'
})
export class CheckListService {
    constructor(private http: HttpClient) { }
    url = CHECKLIST_ENDPOINT

    // פונקציה להוספת נתונים
    createCheckList(checkList: CheckList): Observable<CheckList> {
        return this.http.post<CheckList>(`${CHECKLIST_ENDPOINT}`,  checkList );
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
        try {
            const res = this.http.put<CheckList>(`${this.url}/${checkList._id}`, checkList)
            res.subscribe(data =>
                console.log(data),
                
            )
            return res
        } catch (err) {
            // alert(err)
            console.log(err);
        }
    }
    handleError(handleError: any): import("rxjs").OperatorFunction<CheckList, any> {
        throw new Error('Method not implemented.');
    }

    // פונקציה למחיקת נתונים
    deleteCheckList(id: string): Observable<CheckList> {
        try {
            return this.http.delete<CheckList>(`${CHECKLIST_ENDPOINT}/${id}`);
        } catch (err) {
            console.log(err);

        }
    }
}


