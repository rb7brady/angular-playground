import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Company } from '../company';
import { CompanyService } from '../company.service';
@Component({
  selector: 'app-company-search-symbol',
  templateUrl: './company-search-symbol.component.html',
  styleUrls: ['./company-search-symbol.component.css']
})
export class CompanySearchSymbolComponent implements OnInit {
  companies$: Observable<Company[]>;
  private searchTerms = new Subject<string>();
  constructor(private companyService: CompanyService) { }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.companies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.companyService.searchCompaniesBySymbol(term)),
    );
  }

}
