import { INotification } from './INotification';

export class EmailNotification implements INotification {
    public send(message: string, recipient: string): void {
        console.log(`[EMAIL SENT TO ${recipient}]: ${message}`);
    }
}
