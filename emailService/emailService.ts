import * as nodemailer from 'nodemailer';
import { IEmail, IEmailResponse, IEmailSettings } from './IEmailService';

export class EmailService {
    _settings: IEmailSettings;
    _transport: any;

    constructor(settings: IEmailSettings) {

        this._settings = settings;

        this._transport = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: this._settings.username,
                pass: this._settings.password
                }
            },
            {
                from: this._settings.username
            })
    }

    public async SendMail(options: IEmail): Promise<IEmailResponse> {

        let response =  await this._transport.sendMail(options);

        return { email: options.to, IsSuccess: response.accepted.some((email: string) => email == options.to)}
    }

    public async SendMails(emails: IEmail[]): Promise<IEmailResponse[]> {

        let responses: IEmailResponse[] = [];

        for(const email of emails) {
            responses.push(<IEmailResponse> await this.SendMail(email))
        }
        return responses;
    }
}