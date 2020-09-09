import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Products } from '../shared/models/products';
import { HTTPPORT, PRODUCTS } from '../shared/shared-constants';
import { Store } from '@ngrx/store';
import { AppState, productState } from '../store/user-access/app.state';
import { Observable } from 'rxjs';
import { GetProducts } from '../store/products/actions/products.actions';

@Component({
  selector: 'app-electronics-listing',
  templateUrl: './electronics-listing.component.html',
  styleUrls: ['./electronics-listing.component.scss']
})
export class ElectronicsListingComponent implements OnInit {
  prducts: Products[];
  searchString: string = null;
  getState: Observable<Products[]> = this.store.select(state => state.product);

  constructor(private productsService: ProductsService,
    private http: HttpClient,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
    this.store.subscribe((data: any) => {
      console.log(data);
      this.prducts = data.product.products;
    });
  }

}
