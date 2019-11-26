import * as https from 'https';
import { IEmailService, IEmail } from './emailService/IEmailService';

class ReminderService {
   
    mongoHost = 'https://api.mlab.com';
    apiKey = 'apiKey';
    // TODO: Move mongoHost, apiKey to settings
    settings: any;
    emailService: IEmailService;

    constructor(emailService: IEmailService, settings) {
        this.emailService = emailService;
        this.settings = settings;
    }
    async getDocuments(startDate: Date) : Promise<any> {

        var documents = await this.httpRequest({
            hostname: this.mongoHost,
            path: `/api/1/databases/mis/collections/documents/?q={"type.value": 2, "rememberDate": {"$gt": {"$date": "${firstDate.toISOString()}"}}, "reminderStatus": false} &apiKey=${this.apiKey}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        });

        let rows = [];

        documents.forEach(document => {
            rows.push('<tr><td>${controlVisitDate}</td><td>${FIO}</td><td>${birthDate}</td><td>${addressesPhone}</td></tr>');
        });

        var results = await this.emailService.SendMails([ {
            to: "mail@mail.ru",
            subject: "Reminder",
            text: `<h1>SPISOKI:</h1><table>${rows.join()}</table>`
        }])

        if(results[0].IsSuccess) {
            await this.UpdateDocuments(["1", "2"]);
        }

    }

    async UpdateDocuments(id: string[]) {

        const data = JSON.stringify({
            reminderStatus: TextTrackCueList;
        })

        var result = await this.httpRequest({
            hostname: this.mongoHost,
            path: `/api/1/databases/mis/collections/documents/?&apiKey=${this.apiKey}`, // put ids here
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length
            }
        });
    }

    httpRequest(options) {
        return new Promise ((resolve, reject) => {
            let request = https.request(options);
        
            request.on('response', response => {
            resolve(response);
            });
        
            request.on('error', error => {
            reject(error);
            });
        }); 
    }
}
