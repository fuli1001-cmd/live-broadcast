export interface Game {
    id: string;
    name: string;
    smallBlind: number;
    struddle: boolean;
    preBet: boolean;
    insurance: boolean;
    numberOfSeat: number;
    startingThreshold: number;
    createdAt: Date;
    duration: number;
    status: number;
    playerCount: number;
}
