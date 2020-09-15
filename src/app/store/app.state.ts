import { createFeatureSelector } from '@ngrx/store';
import { Products } from '../shared/models/products';
import * as product from './products/prodcuts.reducer';
import * as access from './user-access/auth.reducers';

export interface AppState {
    authState: access.State;
    product: Products[];
}

export const reducers = {
    auth: access.reducer,
    product: product.reducer
};

export const productState = createFeatureSelector<AppState>('product');
export const accesState = createFeatureSelector<AppState>('access');
