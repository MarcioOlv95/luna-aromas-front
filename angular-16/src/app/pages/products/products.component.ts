import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    @Input() productToEdit: any;

    constructor() { }

    ngOnInit(): void {
    }

    editProduct(product: any){
      this.productToEdit = product;
    }

}
