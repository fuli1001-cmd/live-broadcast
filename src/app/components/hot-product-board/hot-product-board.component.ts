import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
    selector: 'app-hot-product-board',
    templateUrl: './hot-product-board.component.html',
    styleUrls: ['./hot-product-board.component.css']
})
export class HotProductBoardComponent implements OnInit {

    products: Product[];

    constructor() { }

    ngOnInit(): void {
        this.products = [
            {
                Name: 'ZARA女款春装1',
                Price: 123,
                PurchasedUserCount: 30,
                CoverImage: '../../../assets/images/product/product1.png'
            },
            {
                Name: 'ZARA女款春装2',
                Price: 321,
                PurchasedUserCount: 300,
                CoverImage: '../../../assets/images/product/product1.png'
            },
            {
                Name: 'ZARA女款春装3',
                Price: 321,
                PurchasedUserCount: 300,
                CoverImage: '../../../assets/images/product/product1.png'
            },
            {
                Name: 'ZARA女款春装4',
                Price: 321,
                PurchasedUserCount: 300,
                CoverImage: '../../../assets/images/product/product1.png'
            },
            {
                Name: 'ZARA女款春装5',
                Price: 321,
                PurchasedUserCount: 300,
                CoverImage: '../../../assets/images/product/product1.png'
            },
            {
                Name: 'ZARA女款春装6',
                Price: 321,
                PurchasedUserCount: 300,
                CoverImage: '../../../assets/images/product/product1.png'
            },
            {
                Name: 'ZARA女款春装7',
                Price: 321,
                PurchasedUserCount: 300,
                CoverImage: '../../../assets/images/product/product1.png'
            }
        ];
    }

}
