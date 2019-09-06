import { Product } from '../product';
import * as fromRoot from '../../state/app.state';

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
