export type Interests = {
    category: string;
    isInterested: boolean;
}

export type Profile = {
    login: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNB: string;
    email: string;
    interests: Interests[];
}
