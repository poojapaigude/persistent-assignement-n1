import { Injectable } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ADD_PRODUCTS, AddProduct, AddProductSuccess, GET_PRODUCTS, GetProducts, DELETE_PRODUCT, DeleteProduct, DeleteProductSuccess, EDIT_PRODUCTS, EditProduct, EDIT_PRODUCTS_SUCCESS, EditProductSuccess } from '../actions/products.actions';

@Injectable()
export class ProductsEffects {
    constructor(private productsService: ProductsService,
        private actions: Actions) { }


    @Effect({ dispatch: true })
    AddProduct: Observable<any> = this.actions.pipe(
        ofType(ADD_PRODUCTS),
        map((action: AddProduct) => action.payload),
        mergeMap(payload => {
            return this.productsService.addProducts(payload).pipe(data => {return data});
        }));


    @Effect({ dispatch: true })
    GetProduct: Observable<any> = this.actions.pipe(
        ofType(GET_PRODUCTS),
        map((action: GetProducts) => action),
        mergeMap(payload => {
            return this.productsService.getAllProducts().pipe(data => {return data});
        }));


    @Effect({ dispatch: true })
    DeleteProduct: Observable<any> = this.actions.pipe(
        ofType(DELETE_PRODUCT),
        map((action: DeleteProduct) => action.payload),
        mergeMap(payload => {
            return this.productsService.deleteProduct(payload).pipe(
                map((data) => {
                    return new DeleteProductSuccess();
                }));
        }));
    @Effect({ dispatch: true })
    UpdateProduct: Observable<any> = this.actions.pipe(
        ofType(EDIT_PRODUCTS),
        map((action: EditProduct) => action.payload),
        mergeMap(payload => {
            return this.productsService.editProduct(payload).pipe(
                map((data) => {
                    if (data) {
                        return new EditProductSuccess(data);
                    }
                }));
        }));
}
