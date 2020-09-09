import { createFeatureSelector } from '@ngrx/store';
import * as product from '../products/reducers/prodcuts.reducer';
import * as access from './reducers/auth.reducers';

export interface AppState {
    authState: access.State;
    quote: product.State;
}

export const reducers = {
    auth: access.reducer,
    quote: product.reducer
};

export const productsState = createFeatureSelector<AppState>('product');
export const selectAccessState = createFeatureSelector<AppState>('access');
