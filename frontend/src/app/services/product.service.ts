import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:5267/api/product'; // sesuaikan port backend
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }
  get(id: number) {
    return this.http.get<Product>(`${this.api}/${id}`);
  }
  create(prod: Product) {
    return this.http.post<Product>(this.api, prod);
  }
  update(id: number, prod: Product) {
    return this.http.put<Product>(`${this.api}/${id}`, prod);
  }
  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
