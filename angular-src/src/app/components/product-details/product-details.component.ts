import { Input, EventEmitter, Output, Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ShoppingCartService } from "../../services/shoppingCart.service";

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    @Input('product') product: any;
    @Output() closeModalEvent = new EventEmitter();
    
    constructor(
        private cart: ShoppingCartService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        console.log(this.product)
    }
    quantity: number = 1;
    i = 1

    plus() {
        if (this.i != 0) {
            this.i++;
            this.quantity = this.i
        }
    }

    minus() {
        if (this.i != 1) {
            this.i--;
            this.quantity = this.i
        }
    }

    addToCart(product){
        this.openSnackBar("The product is added to cart!","Success")
        this.cart.changeShoppingCart(product, this.quantity)
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2500,
      })
    }

}
