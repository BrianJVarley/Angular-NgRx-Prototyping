import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

// extend Root State to assign lazy loaded
// ProductState when component loaded
export interface State extends fromRoot.State {
	products: ProductState;
}
export interface ProductState {
	showProductCode: boolean;
	currentProduct: Product;
	products: Product[];
};

const initialState: ProductState = {
	showProductCode: true,
	currentProduct: null,
	products: [],
}

/**
 * State Selectors
 */
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getCurrentProductId = createSelector(
	getProductFeatureState,
	state => state.currentProduct.id
)


export const getShowProductCode = createSelector(
	getProductFeatureState,
	state => state.showProductCode
)

export const getCurrentProduct = createSelector(
	getProductFeatureState,
	getCurrentProductId,
	(state, id) => 
	state.products.find(product => product.id === id)
)

export const getProducts = createSelector(
	getProductFeatureState,
	state => state.products
)

/**
 * Reducer
 * @param state 
 * @param action 
 */
export function reducer(state = initialState, action: ProductActions): ProductState {

	switch (action.type) {
	  case ProductActionTypes.ToggleProductCode:
		return {
		  ...state,
		  showProductCode: action.payload
		};
  
	  case ProductActionTypes.SetCurrentProduct:
		return {
		  ...state,
		  currentProduct: { ...action.payload }
		};
  
	  case ProductActionTypes.ClearCurrentProduct:
		return {
		  ...state,
		  currentProduct: null
		};
  
	  case ProductActionTypes.InitializeCurrentProduct:
		return {
		  ...state,
		  currentProduct: {
			id: 0,
			productName: '',
			productCode: 'New',
			description: '',
			starRating: 0
		  }
		};
  
	  default:
		return state;
	}
  }

