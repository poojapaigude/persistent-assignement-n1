import { Products } from 'src/app/shared/models/products';
import {
  ProductActionNames, GET_PRODUCTS,
  DATA_LOAD, ADD_PRODUCTS, ADD_PRODUCTS_SUCCESS, DELETE_PRODUCT, DELETE_PRODUCTS_SUCCESS,
  EDIT_PRODUCTS, EDIT_PRODUCTS_SUCCESS
} from './products.actions';

export interface State {
  products: Products[];
}
export const initialStateValue: State = {
  products: [],
};

export function reducer(state: State = initialStateValue, action: ProductActionNames): State {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
      };
    }
    case DATA_LOAD: {
      return {
        products: action.payload,
      };
    }
    case ADD_PRODUCTS: {
      return {
        ...state
      };
    }
    case ADD_PRODUCTS_SUCCESS: {
      return {
        products: [...state.products, action.payload],
      };
    }

    case DELETE_PRODUCT: {
      return {
        ...state
      };
    }
    case DELETE_PRODUCTS_SUCCESS: {
      return {
        ...state,
      };
    }
    case EDIT_PRODUCTS: {
      return {
        ...state,
      };
    }
    case EDIT_PRODUCTS_SUCCESS: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
