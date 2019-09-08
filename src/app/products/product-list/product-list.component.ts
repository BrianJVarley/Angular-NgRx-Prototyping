import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';

import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
	selector: 'pm-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
	pageTitle = 'Products';
	errorMessage: string;

	displayCode: boolean;

	products: Product[];

	// Used to highlight the selected product in the list
	selectedProduct: Product | null;
	sub: Subscription;

	constructor(private store: Store<fromProduct.State>, private productService: ProductService) { }

	ngOnInit(): void {
		this.sub = this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
			currentProduct => this.selectedProduct = currentProduct
		);

		this.productService.getProducts().subscribe({
			next: (products: Product[]) => (this.products = products),
			error: (err: any) => (this.errorMessage = err.error)
		});

		// Use a selector to grab a slice of product state
		this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
			showProductCode =>
				this.displayCode = showProductCode

		);
	}

	ngOnDestroy(): void {
	}

	checkChanged(value: boolean): void {
		this.store.dispatch(new productActions.ToggleProductCode(value));
	}

	newProduct(): void {
		this.store.dispatch(new productActions.InitializeCurrentProduct());
	}

	productSelected(product: Product): void {
		this.store.dispatch(new productActions.SetCurrentProduct(product));
	}
}
