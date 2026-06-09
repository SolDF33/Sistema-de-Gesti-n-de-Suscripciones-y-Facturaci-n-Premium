import { INotification } from './INotification';
import { EmailNotification } from './EmailNotification';
import { SMSNotification } from './SMSNotification';

export class NotificationFactory {
    public static createNotificationService(type: 'EMAIL' | 'SMS'): INotification {
        switch (type) {
            case 'EMAIL':
                return new EmailNotification();
            case 'SMS':
                return new SMSNotification();
            default:
                throw new Error("Canal de notificación no soportado.");
        }
    }
}

