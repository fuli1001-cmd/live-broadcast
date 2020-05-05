export interface Message {
    content: string;
    name: string;
    type: string;
}

export enum MessageTypes {
    msg,
    gift,
    system
};
