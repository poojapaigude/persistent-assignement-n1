import { Products } from 'src/app/shared/models/products';
import { ProductActionNames, GET_PRODUCTS, DATA_LOAD, ADD_PRODUCTS, ADD_PRODUCTS_SUCCESS, DELETE_PRODUCT, DELETE_PRODUCTS_SUCCESS, EditProduct, EditProductSuccess, EDIT_PRODUCTS, EDIT_PRODUCTS_SUCCESS } from '../actions/products.actions';

export interface State {
  quote: Products[];
  message: string | null;
  successStatus: boolean | null;
}
export const initialStateValue: State = {
  quote: [],
  message: null,
  successStatus: null
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
        quote: action.payload,
        message: null,
        successStatus: null
      };
    }
    case ADD_PRODUCTS: {
      return {
        ...state
      };
    }
    case ADD_PRODUCTS_SUCCESS: {
      return {
        quote: [...state.quote, action.payload],
        message: 'Your Electronic product with category has been added successfully.',
        successStatus: true
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
        message: 'Your Electronic product with category has been deleted successfully.',
        successStatus: true
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
        message: 'Your Electronic product with category has been modified successfully.',
        successStatus: true
      };
    }
    default: {
      return state;
    }
  }
}
