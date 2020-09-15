import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ElectronicsListingComponent } from './electronics-listing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ElectronicsListingComponent', () => {
  let component: ElectronicsListingComponent;
  let fixture: ComponentFixture<ElectronicsListingComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicsListingComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ElectronicsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ElectronicsListingComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should add', () => {
    fixture = TestBed.createComponent(ElectronicsListingComponent);
    component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.addProduct();
    expect(navigateSpy).toHaveBeenCalledWith(['/add']);
  });
});
