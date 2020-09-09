import { Products } from 'src/app/shared/models/products';

export interface ProductsState {
    readonly quotes: Products[];
}
