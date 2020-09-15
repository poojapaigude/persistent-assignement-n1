import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../shared/models/products';
import { Observable, of } from 'rxjs';
const data: Products[] = [
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

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
      // providers: [{ provide: ProductsService, useClass: MockProductsService }],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(inject(
    [ProductsService, HttpTestingController],
    (serviceInstance, httpMockInstance) => {
      service = serviceInstance;
      httpMock = httpMockInstance;
    }
  ));

  it('should be created', () => {
    const proservice = TestBed.inject(ProductsService);
    expect(proservice).toBeTruthy();
  });

  it('create: should create a quote and return the created quote', () => {
    const obj = {
      id: 3,
      productName: 'Dell Inspiron 2',
      description: 'Dell Inspiron E-C560511WIN9',
      category: 'Laptops'
    };
    service.addProducts(obj).subscribe((products) => {
      expect(products).toBeDefined();
      const req = httpMock.expectOne('http://localhost:3000/quotes');
      req.flush(data);
      httpMock.verify();
    });
  });

  it('editProduct: should create a quote and return the created quote', () => {
    const obj = {
      id: 3,
      productName: 'Dell Inspiron 2',
      description: 'Dell Inspiron E-C560511WIN9',
      category: 'Laptops'
    };
    service.editProduct(obj).subscribe((products) => {
      expect(products).toBeDefined();
      const req = httpMock.expectOne('http://localhost:3000/quotes');
      req.flush(data);
      httpMock.verify();
    });
  });

  it('getProduct: should return a product by given id', () => {
    service.getProduct(1).subscribe((product) => {
      expect(product.productName).toBe('Dell Inspiron');
    });
    const req = httpMock.expectOne('http://localhost:3000/products/1');
    req.flush(data);
    httpMock.verify();
  });

});
