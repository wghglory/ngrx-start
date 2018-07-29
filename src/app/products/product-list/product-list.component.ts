import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

/* Ngrx store */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private store: Store<fromProduct.State>, private productService: ProductService) {}

  ngOnInit() {
    // TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe((showProductCode) => {
      this.displayCode = showProductCode;
    });

    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   (selectedProduct) => (this.selectedProduct = selectedProduct),
    // );

    // TODO: Unsubscribe
    this.store
      .pipe(select(fromProduct.getCurrentProduct))
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.productService
      .getProducts()
      .subscribe(
        (products: Product[]) => (this.products = products),
        (err: any) => (this.errorMessage = err.error),
      );
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  checkChanged(value: boolean) {
    // this.displayCode = value;

    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct() {
    // this.productService.changeSelectedProduct(this.productService.newProduct());

    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product) {
    // this.productService.changeSelectedProduct(product);

    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
