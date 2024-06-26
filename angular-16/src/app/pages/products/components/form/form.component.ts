import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from "src/app/models/product";

@Component({
    selector: 'app-products-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class ProductsFormComponents implements OnChanges {

    @Input() productToEdit: Product | undefined;

    productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        stock: new FormControl(0, [Validators.minLength(1)]),
        price: new FormControl(0, [Validators.required, Validators.minLength(1)]),
        observations: new FormControl()
    })

    savedWithSucess: boolean = false;

    constructor() {
    }

    ngOnChanges(){
        if (this.productToEdit){
            this.productForm.patchValue({
                name: this.productToEdit.name,
                stock: this.productToEdit.stock,
                price: this.productToEdit.price,
                observations: this.productToEdit.observations
            });

            console.log(this.productToEdit)
        }
    }

    onSubmit(){
        console.log('salvando...', this.productForm)
        if (this.productForm.valid){
            this.showMessageSuccess();
            this.resetProductEdit();
        }
    }

    showMessageSuccess(){
        this.savedWithSucess = true;
        setTimeout(() => {
            this.savedWithSucess = false;
        }, 3000);
    }

    resetProductEdit(){
        this.productForm.reset();
        this.productToEdit = undefined;
    }

}