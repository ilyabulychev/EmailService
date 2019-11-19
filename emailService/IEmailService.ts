export interface IEmail {
    to: string;
    subject: string;
    text: string;
}

export interface IEmailResponse {
    email: string;
    IsSuccess: boolean;
}

export interface IEmailSettings{
    username: string;
    password: string
}