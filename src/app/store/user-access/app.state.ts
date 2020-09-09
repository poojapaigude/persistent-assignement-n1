import { createFeatureSelector } from '@ngrx/store';
import * as product from '../products/reducers/prodcuts.reducer';
import * as access from './reducers/auth.reducers';
import { Products } from 'src/app/shared/models/products';

export interface AppState {
    authState: access.State;
    product: Products[];
}

export const reducers = {
    auth: access.reducer,
    product: product.reducer
};

export const productState = createFeatureSelector<AppState>('product');
export const selectAccesState = createFeatureSelector<AppState>('access');
