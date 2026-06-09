import { IPaymentObserver } from '../Observers/IPaymentObserver';
import { Subscription } from '../Models/Subscription';

export class PaymentService {
    private observers: IPaymentObserver[] = [];

    public attach(observer: IPaymentObserver): void {
        this.observers.push(observer);
    }

    public detach(observer: IPaymentObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) this.observers.splice(index, 1);
    }

    public processPayment(subscription: Subscription): void {
        console.log(`\n[PAYMENT SERVICE]: Procesando pago de $${subscription.price} para la suscripción ${subscription.id}...`);
        // Simulación de pasarela de pago exitosa
        console.log(`[PAYMENT SERVICE]: Pago Exitoso.`);
        
        // Disparador del patrón Observer
        this.notifyAll(subscription);
    }

    private notifyAll(subscription: Subscription): void {
        for (const observer of this.observers) {
            observer.update(subscription);
        }
    }
}


