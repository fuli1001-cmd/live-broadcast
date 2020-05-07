import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from 'src/app/models/gift';
import { GiftService } from '../../services/data/gift.service';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';
import { UserService } from '../../services/data/user.service';
import { Podcaster } from '../../models/podcaster';

@Component({
    selector: 'app-gift-board',
    templateUrl: './gift-board.component.html',
    styleUrls: ['./gift-board.component.css']
})
export class GiftBoardComponent implements OnInit {
    giftGroups: Gift[][] = [];
    selectedGift: Gift;
    userBalance: number;
    @Input() podcaster: Podcaster;
    @Output() onClose = new EventEmitter();
    @Output() onGiftSent: EventEmitter<number> = new EventEmitter();

    constructor(private giftService: GiftService, 
        private userService: UserService, 
        private podcasterEventService: PodcasterEventService) { }

    async ngOnInit(): Promise<void> {
        this.registerPodcasterEvent();
        this.userBalance = await this.getUserBalance();
        await this.init();
    }

    private async init(): Promise<void> {
        let gifts = await this.giftService.getGifts();

        // const myClonedArray = [];
        // gifts.forEach(val => myClonedArray.push(val));
        // myClonedArray.forEach(val => gifts.push(val));

        let start = 0;
        while (gifts.length > start) {
            let end = Math.min(start + 8, gifts.length);
            this.giftGroups.push(gifts.slice(start, end));
            start += 8;
        }
        console.log(this.giftGroups);
    }

    private registerPodcasterEvent(): void {
        this.podcasterEventService.podcasterSelectedEvent.subscribe(podcaster => this.podcaster = podcaster);
    }

    private async getUserBalance(): Promise<number> {
        return await this.userService.getBalance();
    }

    onClickClose(): void {
        this.onClose.emit();
    }

    async onClickSend(): Promise<void> {
        this.userBalance = await this.giftService.sendGift(this.selectedGift.Id, this.podcaster.HostId, this.podcaster.ShowId);
        this.onGiftSent.emit(this.selectedGift.Id);
    }

    onClickGift(selectedGift: Gift): void {
        this.selectedGift = selectedGift;
    }

}
