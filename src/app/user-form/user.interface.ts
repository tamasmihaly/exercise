export type Hobby = {
    name: string;
    value?: string;
}

export interface UserInterface {
    name: string;
    other?: string;
    email: string;
    birthDate: number;
    gender: string;
    hobbies: Hobby[];
}