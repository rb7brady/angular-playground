import { Injectable } from '@angular/core';
import { Company } from './company';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  private companiesUrl = 'http://localhost:3000/company';
  private companyBaseUrl = 'http://localhost:3000/company';
  private companySearchBaseUrl = 'http://localhost:3000/company/search';


  /** get companies*/
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(_ => this.log('fetched companies')),
        catchError(this.handleError('getCompanies', []))
      );
  }
  getCompany(id: number): Observable<Company> {
    const url = `${this.companyBaseUrl}/${id}`;
    return this.http.get<Company>(url).pipe(
      tap(_ => this.log(`fetched company id=${id}`)),
      catchError(this.handleError<Company>(`getCompany id=${id}`))
    );
  }
  /** Log a CompanyService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CompanyService: ${message}`);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** PUT: update the hero on the server */
  updateCompany (company: Company): Observable<any> {
    return this.http.put(this.companiesUrl, company, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${company.id}`)),
      catchError(this.handleError<any>('updateCompany'))
    );
  }
  /** POST: add a new hero to the server */
  addCompany (company: Company): Observable<Company> {
    return this.http.post<Company>(this.companiesUrl, Company, httpOptions).pipe(
      tap((company: Company) => this.log(`added company w/ id=${company.id}`)),
      catchError(this.handleError<Company>('addCompany'))
    );
  }
  /** DELETE: delete the hero from the server */
  deleteCompany (company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companiesUrl}/${id}`;

    return this.http.delete<Company>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted company id=${id}`)),
      catchError(this.handleError<Company>('deleteCompany'))
    );
  }

  searchCompanies(term: string): Observable<Company[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<Company[]>(`${this.companiesUrl}/${term}`).pipe(
      tap(_ => this.log(`found companies matching "${term}"`)),
      catchError(this.handleError<Company[]>('searchCompanies', []))
    );
  }
  searchCompaniesBySymbol(term: string): Observable<Company[]> {
    console.log(term);
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Company[]>(`${this.companySearchBaseUrl}/${term}`).pipe(
      tap(_ => this.log(`found companies matching "${term}"`)),
      catchError(this.handleError<Company[]>('searchCompaniesBySymbol', []))
    );
  }
}
