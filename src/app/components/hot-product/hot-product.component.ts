import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
    selector: 'app-hot-product',
    templateUrl: './hot-product.component.html',
    styleUrls: ['./hot-product.component.css']
})
export class HotProductComponent implements OnInit {
    @Input() product: Product;
    @Input() leftImage: boolean;
    @Input() rightImage: boolean;

    constructor() { }

    ngOnInit(): void {
    }

    onClickProduct(): void {

    }

    onClickChecking(): void {

    }

}
