import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdService {

    private heroesUrl = 'https://localhost:6001/api/Games';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    //getGames(): Observable<Game[]> {
    //    return this.http.get<Game[]>(this.heroesUrl)
    //        .pipe(
    //            catchError(this.handleError<Game[]>('getHeroes', []))
    //        );
    //}

    //addGame(game: Game): Observable<Game> {
    //    return this.http.post<Game>(this.heroesUrl, game, this.httpOptions).pipe(
    //        catchError(this.handleError<Game>('addHero'))
    //    );
    //}

    //private handleError<T>(operation = 'operation', result?: T) {
    //    return (error: any): Observable<T> => {

    //        // TODO: send the error to remote logging infrastructure
    //        console.error(error); // log to console instead

    //        // Let the app keep running by returning an empty result.
    //        return of(result as T);
    //    };
    //}
}
