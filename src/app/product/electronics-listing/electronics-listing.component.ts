import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Products } from 'src/app/shared/models/products';
import { AppState } from 'src/app/store/app.state';
import { GetProducts, DeleteProduct } from 'src/app/store/products/products.actions';

@Component({
  selector: 'app-electronics-listing',
  templateUrl: './electronics-listing.component.html',
  styleUrls: ['./electronics-listing.component.scss']
})
export class ElectronicsListingComponent implements OnInit {
  prducts: Products[];
  searchString: string = null;
  getState: Observable<Products[]> = this.store.select(state => state.product);
  isUserAuthenticated = false;
  nodatamsg = true;
  isDarkTheme = false;
  
  constructor(
    private store: Store<AppState>,
    private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
    this.store.subscribe((data: any) => {
      this.prducts = data.product.products;
      if (this.prducts.length > 0) {
        this.nodatamsg = false;
      } else {
        this.nodatamsg = true;
      }
    });
    if (localStorage.getItem('isUserLoggedIn') === 'true') {
      this.isUserAuthenticated = true;
    } else {
      this.router.navigate(['/']);
    }
  }

  addProduct(): void {
    this.router.navigate(['/add']);
  }

  deleteProduct(id: number): void {
    const confirmation = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmation) {
      this.store.dispatch(new DeleteProduct(id));
      this.store.dispatch(new GetProducts());
    }
  }

  editAction(id): void {
    this.router.navigateByUrl('edit/' + id);
  }
 
  changedTheme(theme): void {
    this.isDarkTheme = theme;
  }
}
