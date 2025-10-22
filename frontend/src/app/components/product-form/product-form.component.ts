import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [ReactiveFormsModule],
})
export class ProductFormComponent implements OnChanges {
  @Input() product?: Product;
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private svc: ProductService) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges() {
    if (this.product) this.form.patchValue(this.product);
    else this.form.reset({ id: null, name: '', description: '', price: 0, stock: 0 });
  }

  submit() {
    if (this.form.invalid) return;
    const val = this.form.value as Product;
    if (val.id) {
      this.svc.update(val.id, val).subscribe(() => {
        this.saved.emit();
        this.form.reset({ id: null, name: '', description: '', price: 0, stock: 0 });
      });
    } else {
      this.svc.create(val).subscribe(() => {
        this.saved.emit();
        this.form.reset({ id: null, name: '', description: '', price: 0, stock: 0 });
      });
    }
  }
}
