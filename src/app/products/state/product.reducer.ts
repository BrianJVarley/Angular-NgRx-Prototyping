import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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

export const getShowProductCode = createSelector(
	getProductFeatureState,
	state => state.showProductCode
)

export const getCurrentProduct = createSelector(
	getProductFeatureState,
	state => state.currentProduct
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
export function reducer(state = initialState, action): ProductState {
	switch (action.type) {
		case 'TOGGLE_PRODUCT_CODE':
			return {
                ...state,
                showProductCode: action.payload
            };

		default:
			return state;
	}
}

