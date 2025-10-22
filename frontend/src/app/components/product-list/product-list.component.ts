import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [ProductFormComponent, CommonModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  editing?: Product;

  constructor(private svc: ProductService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getAll().subscribe((d) => (this.products = d));
  }

  remove(id?: number) {
    if (!id) return;
    if (!confirm('Hapus produk ini?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }

  edit(p: Product) {
    this.editing = { ...p };
  }

  onSaved() {
    this.editing = undefined;
    this.load();
  }
}
