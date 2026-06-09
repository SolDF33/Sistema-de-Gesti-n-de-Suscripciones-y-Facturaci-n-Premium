import { Subscription } from '../Models/Subscription';

export interface IPaymentObserver {
    update(subscription: Subscription): void;
}