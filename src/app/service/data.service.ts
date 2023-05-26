import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, pipe} from "rxjs";
import {RegisterDto} from "../model/register-dto";
import {UrlDto} from "../model/url-dto";

const REGISTER_API = environment.apiUrl.concat('/auth/register');
const URL_API = environment.apiUrl.concat('/api/v1/urls');

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  redirect(shortLink: String): void{
    this.http.get(`${environment.apiUrl}/${shortLink}`).pipe(catchError(this.handleError<any>("redirect"))).
    subscribe(value => {
      document.location.href = `${environment.apiUrl}/${shortLink}`;
    });

  }

  signup(userToRegister: RegisterDto): Observable<RegisterDto> {
    return this.http.post<RegisterDto>(REGISTER_API, userToRegister).pipe(catchError(this.handleError<RegisterDto>("register")));
  }

  getUrls(): Observable<Array<UrlDto>> {
    return this.http.get<Array<UrlDto>>(URL_API).pipe(catchError(this.handleError<Array<UrlDto>>("getUrls")));
  }

  createUrl(urlToCreate: String): Observable<UrlDto> {
    return this.http.post<UrlDto>(URL_API, urlToCreate).pipe(catchError(this.handleError<UrlDto>("createUrl")));
  }

  enableUrl(urlToUpdate: UrlDto): Observable<UrlDto> {
    const url = `${URL_API}/${urlToUpdate.shortenedUrl}/enable`;
    return this.http.put<UrlDto>(url, urlToUpdate).pipe(catchError(this.handleError<UrlDto>("updateUrl")));
  }

  disableUrl(urlToUpdate: UrlDto): Observable<UrlDto> {
    const url = `${URL_API}/${urlToUpdate.shortenedUrl}/disable`;
    return this.http.put(url, urlToUpdate).pipe(catchError(this.handleError<UrlDto>("updateUrl")));
  }

  deleteUrl(urlToDelete: UrlDto): Observable<unknown> {
    const url = `${URL_API}/${urlToDelete.shortenedUrl}`;
    return this.http.delete(url).pipe(catchError(this.handleError("deleteUrl")));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
