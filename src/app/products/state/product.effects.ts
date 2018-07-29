import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(private productService: ProductService, private actions$: Actions) {}

  // 1. Monitor/Take an action (Load action)
  // 2. Do some work (fetch all products)
  // 3. Return a new action
  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action) =>
      this.productService.getProducts().pipe(
        map((products) => new productActions.LoadSuccess(products)),
        catchError((err) => of(new productActions.LoadFail(err))),
      ),
    ),
  );
}
