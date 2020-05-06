export interface User {
    agoraAppId: string;
    fileServer: string;
    token: string;
    userInfoLite: {
        avatar: string;
        nickname: string;
        registrationId: string;
        userId: number;
        username: string;
        phonenumber: string;
        gender: string;
    }
}
