import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Products } from '../shared/models/products';
import { HTTPPORT, PRODUCTS } from '../shared/shared-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addProducts(product: Products): Observable<Products> {
    const url = HTTPPORT + PRODUCTS;
    return this.http
      .post<Products>(url, product, this.httpOptions)
      .pipe(catchError(this.errorCatcher));
  }

  errorCatcher(errorResponse: HttpErrorResponse): Observable<never> {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('An error occurred:', errorResponse.error.message);
    }
    else {
      console.error(
        'Backend returned code ${errorResponse.status}, ' +
        'body was: ${errorResponse.error}');
    }
    window.alert('Error Occurred; please try again later.');
    return throwError(
      'Error Occurred; please try again later.');
  }

  getAllProducts(): Observable<Products[]> {
    const url = HTTPPORT + PRODUCTS;
    return this.http
      .get<Products[]>(url)
      .pipe(catchError(this.errorCatcher));
  }

  deleteProduct(id: number): Observable<Products> {
    const url = HTTPPORT + encodeURI(`products/${id}`);
    return this.http
      .delete<Products>(url)
      .pipe(catchError(this.errorCatcher));
  }

  getProduct(id: number): Observable<Products> {
    const url = HTTPPORT + PRODUCTS +  '/' + id;
    return this.http
      .get<Products>(url)
      .pipe(catchError(this.errorCatcher));
  }

  editProduct(product: Products): Observable<Products> {
    const url = HTTPPORT + encodeURI(`products/${product.id}`);
    return this.http
      .patch<Products>(url, product, this.httpOptions)
      .pipe(catchError(this.errorCatcher));
  }

}
