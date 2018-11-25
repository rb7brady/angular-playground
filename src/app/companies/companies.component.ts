import { Component, OnInit } from '@angular/core';
import {Company} from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  constructor(private companyService: CompanyService) { }
  ngOnInit() {
    this.getCompanies();
  }
  getCompanies(): void {
    this.companyService.getCompanies()
      .subscribe(companies => this.companies = companies);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.companyService.addCompany({ name } as Company)
      .subscribe(company => {
        this.companies.push(company);
      });
  }
  delete(company: Company): void {
    this.companies = this.companies.filter(h => h !== company);
    this.companyService.deleteCompany(company).subscribe();
  }
}
