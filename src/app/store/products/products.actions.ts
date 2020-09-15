import { Action } from '@ngrx/store';
import { Products } from 'src/app/shared/models/products';


export const GET_PRODUCTS = '[PRODUCTS] GET';
export const ADD_PRODUCTS = '[PRODUCTS] ADD';
export const ADD_PRODUCTS_SUCCESS = '[PRODUCTS] ADD PRODUCTS SUCCESS';
export const DELETE_PRODUCT = '[PRODUCTS] DELETE';
export const DELETE_PRODUCTS_SUCCESS = '[PRODUCTS] DELETE PRODUCTS SUCCESS';
export const EDIT_PRODUCTS = '[PRODUCTS] EDIT';
export const EDIT_PRODUCTS_SUCCESS = '[PRODUCTS] EDIT PRODUCTS SUCCESS';
export const DATA_LOAD = '[PRODUCTS] LOAD';


export class GetProducts implements Action {
    readonly type = GET_PRODUCTS;
    constructor() { }
}
export class LoadDataSuccess implements Action {
    readonly type = DATA_LOAD;
    constructor(public payload: Products[]) { }
}
export class AddProduct implements Action {
    readonly type = ADD_PRODUCTS;
    constructor(public payload: Products) {
    }
}
export class AddProductSuccess implements Action {
    readonly type = ADD_PRODUCTS_SUCCESS;
    constructor(public payload: Products) { }
}
export class DeleteProduct implements Action {
    readonly type = DELETE_PRODUCT;
    constructor(public payload: number) { }
}
export class DeleteProductSuccess implements Action {
    readonly type = DELETE_PRODUCTS_SUCCESS;
}
export class EditProduct implements Action {
    readonly type = EDIT_PRODUCTS;
    constructor(public payload: Products) { }
}
export class EditProductSuccess implements Action {
    readonly type = EDIT_PRODUCTS_SUCCESS;
    constructor(public payload: Products) { }
}

export type ProductActionNames =
    AddProduct |
    GetProducts |
    DeleteProduct |
    EditProduct |
    LoadDataSuccess |
    AddProductSuccess |
    EditProductSuccess |
    DeleteProductSuccess;
