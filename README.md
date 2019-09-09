# Angular-ngrx-GettingStarted
Forked from [Angular & NgRx course](https://github.com/DeborahK/Angular-NgRx-GettingStarted)

Some examples of using @ngrx in Angular and how to strongly type the state, reducer, actions within an application

> Strongly Typing Stuff:

Pretty much assign a type to your state and actions to enforce typing..See [usage-with-typescript](https://redux.js.org/recipes/usage-with-typescript)

```javascript
import { Product } from '../product';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';
import * as fromRoot from '../../state/app.state';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  products: ProductState;
}

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

export function reducer(state = initialState, action: ProductActions): ProductState {

  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    default:
      return state;
  }
}

```

> Creating Actions:

Define an `enum` to type the actions available for your state. This gives good feedback when
dispatching actions so that you supply the correct payload types and  call the correct actions.

Each action implements a standard type from `@ngrx/store` called an `Action` which enforces
the type checking on the actions. At the end of the actions file we export the actions as a _union_ `export type ProductActions = ToggleProductCode | SetCurrentProduct;` so that the action types show in intellisense on the editor.

```javascript
import { Product } from '../product';

/* NgRx */
import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product'
}

// Action Creators
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) { }
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) { }
}

export type ProductActions = ToggleProductCode
  | SetCurrentProduct;


```


> Dispatching Actions:

The actions are dispatched via the store and created from the exported _actions_ object. 
Since we typed the actions we get type checking on the action payload and actions types.

```javascript

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

....

this.store.dispatch(new productActions.ToggleProductCode(value));


```

> Using @ngrx/effects:

The NgRx effects decorator handles side effects from a service. For example a service that makes async HTTP request. This really helps to keep components _pure_ and decrease the responsibility of a component. 

The `@ngrx/effects` are similar to `redux-saga` library commonly used in React applications to handle side effects.

```javascript



```

> Defining State `Selectors`:

Selectors are pure functions used for obtaining slices of store state. @ngrx/store provides a few helper functions for optimizing this selection. Selectors provide many features when selecting slices of state. 

- Portable
- _Memoization_
- Composition
- Testable
- Type-safe

```javascript
// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

```

> Debugging with Redux Dev Tools:
> Install the Chrome [Devtools extension](https://ngrx.io/guide/store-devtools)
> F12 in browser and open `Redux` tab, where you can view sequence of each action dispatched and the state tree changes.