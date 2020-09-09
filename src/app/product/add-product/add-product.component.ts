import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, productState } from 'src/app/store/user-access/app.state';
import { Observable } from 'rxjs';
import { AddProduct, GetProducts } from 'src/app/store/products/actions/products.actions';

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
  constructor(private router: Router,
    private store: Store<AppState>,
    ) { }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      description: new FormControl(''),
      category: new FormControl('', Validators.required),
    });
  }
  
  get f(){
    return this.addProductForm.controls;
  }

  gotolisting() {
    this.router.navigate(['/']);
  }

  addProduct() {
    this.product = {
      productName: this.productName,
      description: this.description,
      category: this.category,
    };
    this.store.dispatch(new AddProduct(this.product));
    this.store.dispatch(new GetProducts());
    this.router.navigate(['/']);
  }

  get productName(): string {
    return this.addProductForm.get('productName').value;
  }

  get description(): string {
    return this.addProductForm.get('description').value;
  }

  get category(): string {
    return this.addProductForm.get('category').value;
  }
}
