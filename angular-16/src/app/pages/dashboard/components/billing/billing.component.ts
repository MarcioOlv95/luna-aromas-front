import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { Sale } from 'src/app/models/sale';

const ELEMENT_DATA: Sale[] = [
  { id: 1, product: 'Hecate', dtSale: '2024-05-25', amount: 10, value: 49.99 },
  { id: 2, product: 'Hera', dtSale: '2024-06-02', amount: 50, value: 59.99 },
  { id: 3, product: 'Gaia', dtSale: '2024-06-15', amount: 100, value: 69.99 },
  { id: 4, product: 'Afrodite', dtSale: '2024-07-15', amount: 250, value: 79.99 },
];

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements AfterViewInit {

    separatorKeysCodes = [ENTER, COMMA];
    productCtrl = new FormControl('');
    filteredProducts: Observable<string[]>;

    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort!: MatSort ;
    @ViewChild('productInput') productInput: ElementRef<HTMLInputElement> | undefined;

    products: string[] = []; //produtos filtrados

    announcer = inject(LiveAnnouncer);

    displayedColumns: string[] = ['dtSale', 'product', 'amount', 'value'];
    dataSource: MatTableDataSource<Sale>;

    startDate: Date;
    endDate: Date;

    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('pt-BR'); 

        this.dataSource = new MatTableDataSource(ELEMENT_DATA);

        this.filteredProducts = this.productCtrl.valueChanges.pipe(
          startWith(null),
          map((product: string | null) => (product ? this._filter(product) : this._availableProducts())),
        );

        this.loadAllProducts();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    loadAllProducts(){
      this.products = ELEMENT_DATA.map(p => p.product);
    }

    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
  
      if (value) {
        this.products.push(value);
      }
  
      event.chipInput!.clear();
  
      this.productCtrl.setValue(null);

      this.applyFilterProducts();
    }
  
    remove(product: string): void {
      const index = this.products.indexOf(product);
  
      if (index >= 0) {
        this.products.splice(index, 1);
        this.productCtrl.setValue(null);
        this.announcer.announce(`Removed ${product}`);
        this.applyFilterProducts();
      }
    }
  
    selected(event: MatAutocompleteSelectedEvent): void {
      this.products.push(event.option.viewValue);
      
      if (this.productInput)
        this.productInput.nativeElement.value = '';
      
      this.productCtrl.setValue(null);
      this.applyFilterProducts();
    }

    applyFilterProducts(){
      if (this.startDate && this.endDate) {
        this.dataSource = new MatTableDataSource(ELEMENT_DATA.filter(p => this.products.includes(p.product) 
          && new Date(p.dtSale) >= this.startDate && new Date(p.dtSale) <= this.endDate));
      } else {
        this.dataSource = new MatTableDataSource(ELEMENT_DATA.filter(p => this.products.includes(p.product)));
      }

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
      this.startDate = this._formatDatePicker(dateRangeStart.value);
      this.endDate = this._formatDatePicker(dateRangeEnd.value);

      this.applyFilterProducts();
    }

    getTotalAmount(){
      return this.dataSource.data.map(d => d.amount).reduce((acc, value) => acc + value, 0);
    }

    getTotalValue(){
      return this.dataSource.data.map(d => d.value).reduce((acc, value) => acc + value, 0);
    }

    private _formatDatePicker(date: string){
      var splitDate = date.split('/');
      var year = splitDate[2];
      var month = splitDate[1];
      var day = splitDate[0];
      return new Date(year + "/" + month + "/" + day);
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      var filtered = ELEMENT_DATA.filter(product => product.product.toLowerCase().includes(filterValue));

      return filtered.map(p => p.product);
    }

    private _availableProducts(): string[] {
      var availableProducts = ELEMENT_DATA.filter(p => !this.products.includes(p.product));
      return availableProducts.map(a => a.product);
    }

}
