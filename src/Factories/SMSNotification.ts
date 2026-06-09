import { INotification } from './INotification';

export class SMSNotification implements INotification {
    public send(message: string, recipient: string): void {
        console.log(`[SMS SENT TO ${recipient}]: ${message}`);
    }
}


