export type ResponseError = {
    reason: string;
};

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string | null;
    avatar: string | null;
    phone: string;
    email: string;
};
