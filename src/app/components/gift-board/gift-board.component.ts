import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from 'src/app/models/gift';
import { GiftService } from '../../services/gift.service';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';

@Component({
    selector: 'app-gift-board',
    templateUrl: './gift-board.component.html',
    styleUrls: ['./gift-board.component.css']
})
export class GiftBoardComponent implements OnInit {
    giftGroups: Gift[][] = [];
    private gift: Gift;
    @Input() podcasterId: number;
    @Output() onClose = new EventEmitter();

    constructor(private giftService: GiftService, private podcasterEventService: PodcasterEventService) { }

    async ngOnInit(): Promise<void> {
        this.registerPodcasterEvent();
        await this.init();
        console.log(`podcasterId: ${this.podcasterId}`);
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

    private registerPodcasterEvent(): void {
        this.podcasterEventService.podcasterSelectedEvent.subscribe(podcaster => this.podcasterId = podcaster.HostId);
    }

    onClickClose(): void {
        this.onClose.emit();
    }

    async onClickSend(): Promise<void> {
        let result = await this.giftService.sendGift(this.gift.Id, this.podcasterId);
    }

    onClickGift(gift: Gift): void {
        this.gift = gift;
    }

}
