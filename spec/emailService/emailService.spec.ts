import { EmailService  } from '../../emailService/emailService'
import { IEmail, IEmailResponse, IEmailSettings } from '../../emailService/IEmailService';


describe("EmailService", () => {
    it("should send Email", async () => {

        // ARANGE
        let emailService = new EmailService({username: 'email', password: 'password'});

        let emails = [{
            to: 'ilyabulychev@skkbnn.ru',
            subject: 'Hello',
            text: 'Hello'
        }]

        // ACT
        let responses = await emailService.SendMails(emails)

        // ASSERT 
        expect(responses[0].IsSuccess).toBe(true);
    });
});