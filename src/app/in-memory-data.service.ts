import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Company } from './company';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const companies = [
      { id: 11, name: 'Arbor Realty Trust', symbol: 'ABR' },
      { id: 12, name: 'Apple', symbol: 'AAPL' },
      { id: 13, name: 'Microsoft', symbol: 'MSFT' },
      { id: 14, name: 'IBM', symbol: 'IBM' },
      { id: 15, name: 'All Scripts', symbol: 'MDRX' },
      { id: 16, name: 'Berkshire Hathaway B', symbol: 'BRKB' }
    ];
    return {companies};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(companies: Company[]): number {
    return companies.length > 0 ? Math.max(...companies.map(company => company.id)) + 1 : 11;
  }
}
