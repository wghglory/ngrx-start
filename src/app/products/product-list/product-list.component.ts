import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';

/* Ngrx store */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentActive = true;

  pageTitle = 'Products';
  errorMessage$: Observable<string>;
  displayCode: boolean;
  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private store: Store<fromProduct.State>, private productService: ProductService) {}

  ngOnInit() {
    // Unsubscribe here because it does not use an async pipe
    this.store
      .pipe(select(fromProduct.getShowProductCode), takeWhile(() => this.componentActive))
      .subscribe((showProductCode) => {
        this.displayCode = showProductCode;
      });

    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   (selectedProduct) => (this.selectedProduct = selectedProduct),
    // );

    // Unsubscribe here because it does not use an async pipe
    this.store
      .pipe(select(fromProduct.getCurrentProduct), takeWhile(() => this.componentActive))
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();

    this.componentActive = false;
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
