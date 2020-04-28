import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Gift } from 'src/app/models/gift';
import { GiftService } from '../../services/gift.service';
import { min } from 'rxjs/operators';

@Component({
    selector: 'app-gift-board',
    templateUrl: './gift-board.component.html',
    styleUrls: ['./gift-board.component.css']
})
export class GiftBoardComponent implements OnInit {
    giftGroups: Gift[][] = [];
    @Output() onClose = new EventEmitter();

    constructor(private giftService: GiftService) { }

    async ngOnInit(): Promise<void> {
        await this.init();
    }

    private async init(): Promise<void> {
        let gifts = await this.giftService.getGifts();

        const myClonedArray = [];
        gifts.forEach(val => myClonedArray.push(val));
        myClonedArray.forEach(val => gifts.push(val));
        console.log(gifts);

        let start = 0;
        while (gifts.length > start) {
            let end = Math.min(start + 8, gifts.length);
            this.giftGroups.push(gifts.slice(start, end));
            start += 8;
        }
        console.log(this.giftGroups);
    }

    onClickClose(): void {
        this.onClose.emit();
    }

    onClickSend(): void {

    }

}
