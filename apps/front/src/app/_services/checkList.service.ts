//service for checkList
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckList } from '../_models/checkList.model';
import { CHECKLIST_ENDPOINT } from '../api-urls';


@Injectable({
    providedIn: 'root'
})
export class CheckListService {
    constructor(private http: HttpClient) { }
    url = CHECKLIST_ENDPOINT

    createCheckList(checkList: CheckList): Observable<CheckList> {
        return this.http.post<CheckList>(`${CHECKLIST_ENDPOINT}`, checkList);
    }

    getCheckLists(itemId: string): Observable<CheckList> {
        return this.http.get<CheckList>(`${CHECKLIST_ENDPOINT}/${itemId}`,
        );
    };

    getAllCheckLists(): Observable<CheckList[]> {
        return this.http.get<CheckList[]>(`${CHECKLIST_ENDPOINT}`);
    }

    updateCheckList(checkList: CheckList): Observable<CheckList> {
        try {
            alert(JSON.stringify(checkList))
            const res = this.http.put<CheckList>(`${this.url}/${checkList._id}`, checkList)
            res.subscribe(data =>
                console.log(data),

            )
            return res
        } catch (err) {
            console.log(err);
        }
    }
    handleError(handleError: any): import("rxjs").OperatorFunction<CheckList, any> {
        throw new Error('Method not implemented.');
    }

    deleteCheckList(id: string): Observable<CheckList> {
        try {
            return this.http.delete<CheckList>(`${CHECKLIST_ENDPOINT}/${id}`);
        } catch (err) {
            console.log(err);
        }
    }
}


