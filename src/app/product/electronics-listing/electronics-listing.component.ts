import { Component, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/shared/models/products';
import { AppState } from 'src/app/store/user-access/app.state';
import { GetProducts } from 'src/app/store/products/actions/products.actions';
import { Router } from '@angular/router';

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
    private store: Store<AppState>,
    private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
    this.store.subscribe((data: any) => {
      console.log(data);
      this.prducts = data.product.products;
    });
  }

  addProduct(): void{
    this.router.navigate(['/add']);
  }

}
