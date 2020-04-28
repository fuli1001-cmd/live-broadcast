import { User } from './user';

export interface Auth {
    token: string;
    agoraAppId: string;
    userInfoLite: User;
}