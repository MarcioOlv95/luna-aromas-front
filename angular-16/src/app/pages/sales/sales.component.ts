import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { Product } from "src/app/models/product";

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
    
  savedWithSucess: boolean = false;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt-BR'); 
  }

  saleForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    freight: new FormControl(),
    discount: new FormControl(),
    net: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required]),
    amountProduct: new FormControl('', [Validators.required]),
    amountCourtesy: new FormControl()
  }) 

  calculateNet() {

    var product = this.products.filter(p => p.id == Number(this.saleForm.value.product))[0]
    
    var amountProduct = 0;
    if (this.saleForm.value.amountProduct)
      amountProduct = Number(this.saleForm.value.amountProduct);
    
    var amountCourtesy = this.saleForm.value.amountCourtesy

    if (amountProduct && amountCourtesy)
      amountProduct = amountProduct - amountCourtesy

    if (product && product.price){
      var totalPrice = amountProduct * product.price

      if (this.saleForm.value.discount){
        totalPrice = totalPrice - this.saleForm.value.discount;
      }

      this.saleForm.controls['net'].setValue(totalPrice.toFixed(2).toString());
    }
  }

  onSubmit(){
    
    if (this.saleForm.valid){
      this.resetForm();
      this.showMessageSuccess()
    }
      
  }

  resetForm(){
    this.saleForm.reset();
  }

  showMessageSuccess(){
    this.savedWithSucess = true;
    setTimeout(() => {
        this.savedWithSucess = false;
    }, 3000);
  }

  products: Product[] = [
    {id: 1, name: 'Hecate', price: 49.99},
    {id: 2, name: 'Hera', price: 49.99},
    {id: 3, name: 'Gaia', price: 49.99},
    {id: 4, name: 'Afrodite', price: 49.99},
  ]

}