import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsListingComponent } from './electronics-listing.component';

describe('ElectronicsListingComponent', () => {
  let component: ElectronicsListingComponent;
  let fixture: ComponentFixture<ElectronicsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
