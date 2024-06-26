import { Component, Output, EventEmitter } from "@angular/core";
import { Product } from "src/app/models/product";
  
const ELEMENT_DATA: Product[] = [
    { id: 1, name: 'Hecate', stock: 10, price: 40.00, observations: 'teste1' },
    { id: 2, name: 'Hera', stock: 51, price: 40.00, observations: 'teste2' },
    { id: 3, name: 'Gaia', stock: 55, price: 40.00, observations: 'teste3' },
    { id: 4, name: 'Afrodite', stock: 12, price: 40.00, observations: 'teste4' },
];

@Component({
    selector: 'app-products-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class ProductsTableComponents {

    displayedColumns: string[] = ['name', 'stock', 'price', 'edit'];
    dataSource = ELEMENT_DATA;

    @Output() productToEdit = new EventEmitter<Product>();

    constructor() {
    }

    editProduct(id: number){
        var productToEdit = this.dataSource.find(x => x.id == id);
        this.productToEdit.emit(productToEdit);
    }

}