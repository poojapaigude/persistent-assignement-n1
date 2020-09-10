import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, productState } from 'src/app/store/user-access/app.state';
import { Observable } from 'rxjs';
import { AddProduct, GetProducts, EditProduct } from 'src/app/store/products/actions/products.actions';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/shared/models/products';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  categories: string[] = ['Laptops', 'Cell Phones', 'Audio', 'TV', 'Samrt Devices'];
  addProductForm: FormGroup;
  getState: Observable<any> = this.store.select(productState);
  product: { id?: number; productName: string; description: string; category: string; };
  productId: number = null;

  constructor(private router: Router,
    private store: Store<AppState>,
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params && this.route.snapshot.params.id) {
      this.productId = this.route.snapshot.params.id;
      this.productsService.getProduct(this.productId).subscribe((data: Products) => {
        if (data) {
          this.addProductForm = new FormGroup({
            productName: new FormControl(data.category, Validators.required),
            description: new FormControl(data.description),
            category: new FormControl(data.category, Validators.required),
          });
        }
      });
    } else {
      this.addProductForm = new FormGroup({
        productName: new FormControl('', Validators.required),
        description: new FormControl(''),
        category: new FormControl('', Validators.required),
      });
    }
  }

  get f() {
    return this.addProductForm.controls;
  }

  gotolisting() {
    this.router.navigate(['/']);
  }

  addProduct() {
    this.product = {
      productName: this.addProductForm.get('productName').value,
      description: this.addProductForm.get('description').value,
      category: this.addProductForm.get('category').value,
    };
    if (this.productId) {
      this.store.dispatch(new EditProduct(this.product));
      this.store.dispatch(new GetProducts());
      this.router.navigate(['/']);
    } else {
      this.store.dispatch(new AddProduct(this.product));
      this.store.dispatch(new GetProducts());
      this.router.navigate(['/']);
    }
  }
}
