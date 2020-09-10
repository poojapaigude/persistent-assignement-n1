import { Injectable } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ADD_PRODUCTS, AddProduct, AddProductSuccess, GET_PRODUCTS, GetProducts, DELETE_PRODUCT, DeleteProduct, DeleteProductSuccess, EDIT_PRODUCTS, EditProduct, EDIT_PRODUCTS_SUCCESS, EditProductSuccess, LoadDataSuccess } from '../actions/products.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class ProductsEffects {
    constructor(private productsService: ProductsService,
        private actions$: Actions) { }

    getProduct$ = createEffect(() => this.actions$.pipe(
        ofType(GET_PRODUCTS),
        map((action: GetProducts) => action),
        mergeMap(() => this.productsService.getAllProducts()
            .pipe(
                map((products) => { return new LoadDataSuccess(products) }),
                catchError(() => EMPTY)
            ))
    )
    );

    deleteProduct$ = createEffect(() => this.actions$.pipe(
        ofType(DELETE_PRODUCT),
        map((action: DeleteProduct) => action),
        mergeMap((payload: any) => this.productsService.deleteProduct(payload.payload)
            .pipe(
                map(() => { return new DeleteProductSuccess() }),
                catchError(() => EMPTY)
            ))
    )
    );

    @Effect({ dispatch: true })
    UpdateProduct: Observable<any> = this.actions$.pipe(
        ofType(EDIT_PRODUCTS),
        map((action: EditProduct) => action.payload),
        mergeMap(payload => {
            return this.productsService.editProduct(payload)
                .pipe(
                    map((data) => {
                        if (data) {
                            return new EditProductSuccess(data);
                        }
                    }));
        }));


    @Effect({ dispatch: true })
    AddProduct: Observable<any> = this.actions$.pipe(
        ofType(ADD_PRODUCTS),
        map((action: AddProduct) => action.payload),
        mergeMap(payload => {
            return this.productsService.addProducts(payload).pipe( 
                map((data) => { return new AddProductSuccess(data) }));
        }));
}
