export interface Message {
    content: string;
    name: string;
    type: MessageTypes;
}

export enum MessageTypes {
    msg,
    gift,
    system
};
