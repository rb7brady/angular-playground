import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySearchSymbolComponent } from './company-search-symbol.component';

describe('CompanySearchSymbolComponent', () => {
  let component: CompanySearchSymbolComponent;
  let fixture: ComponentFixture<CompanySearchSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySearchSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySearchSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
