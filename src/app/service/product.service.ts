import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { urlEndpoint } from 'src/app/utils/constant';
import { AppResponse } from '../model/appResponse';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${urlEndpoint.baseUrl}/admin/medicine/all`
    );
  }

  addProduct(productData: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/pooja`,
      productData
    );
  }

  deleteProduct(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/medicine/${id}`
    );
  }

  updateProducts(newProducts: FormData): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/medicine`,
      newProducts
    );
  }
}
