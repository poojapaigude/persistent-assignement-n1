import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Products } from '../shared/models/products';
import { HTTPPORT, PRODUCTS } from '../shared/shared-constants';

@Component({
  selector: 'app-electronics-listing',
  templateUrl: './electronics-listing.component.html',
  styleUrls: ['./electronics-listing.component.scss']
})
export class ElectronicsListingComponent implements OnInit {
  prducts: Products[];
  searchString: string = null;
  constructor(private productsService: ProductsService,
    private http: HttpClient) { }

  ngOnInit(): void {
    const getAllProductsUrl = encodeURI('products');
    const url = HTTPPORT + PRODUCTS;
    this.http
      .get<Products[]>(url)
      .subscribe(data => {
        this.prducts = data;
        console.log(data);
      })
  }
}
