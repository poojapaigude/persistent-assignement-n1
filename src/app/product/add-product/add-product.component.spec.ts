import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Products } from 'src/app/shared/models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
class MockProductsService {
  data: Products[] = [
    {
      id: 1,
      productName: 'Dell Inspiron',
      description: 'Dell Inspiron 3493 14-inch FHD Laptop (10th Gen Ci5-1035G1/8GB/1TB HDD/Win 10 + MS Office/Intel HD Graphics/Silver) E-C560511WIN9',
      category: 'Laptops'
    },
    {
      id: 2,
      productName: 'Apple iPhone 11',
      description: '6.1-inch (15.5 cm) Liquid Retina HD LCD display (64GB) - (Product) RED',
      category: 'Cell Phones'
    }
  ];
  getProduct(id): Observable<Products> {
    return of(this.data[id]);
  }
}
describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let router: Router;
  let ele;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [provideMockStore(),
      { provide: ProductsService, useClass: MockProductsService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    // route = TestBed.inject(ActivatedRoute)
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    ele = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should go to listing page', () => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.gotolisting();
    expect(navigateSpy).toBeTruthy();
  });

  it('it should add product', () => {
    const obj = {
      id: 3,
      productName: 'Dell Inspiron 2',
      description: 'Dell Inspiron E-C560511WIN9',
      category: 'Laptops'
    };
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.addProduct();
    expect(obj).toBeDefined();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

});
