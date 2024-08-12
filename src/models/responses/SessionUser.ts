export type SessionUserResponse = {
    authenticated: boolean;
    user: AuthUserResponse;
}

export type AuthUserResponse = {
    displayName: string;
    photoURL: string;
}