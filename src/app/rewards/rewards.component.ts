import { Component, OnInit, Input } from '@angular/core';
import { Reward } from '../models/reward';

@Component({
    selector: 'app-rewards',
    templateUrl: './rewards.component.html',
    styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
    @Input() rewards: Reward[];
    @Input() type: string;

    constructor() { }

    ngOnInit(): void {
        this.type = 'ranking-list';
        this.rewards = [
            { name: '留学生1', amount: 10023, avatar: null, timestamp: null },
            { name: '留学生2', amount: 1232, avatar: null, timestamp: null },
            { name: '留学生3', amount: 234, avatar: null, timestamp: null },
        ]
    }

}
