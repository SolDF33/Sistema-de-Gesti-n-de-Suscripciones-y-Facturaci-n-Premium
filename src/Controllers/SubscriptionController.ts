import { ISubscriptionRepository } from '../Repositories/ISubscriptionRepository';
import { Subscription } from '../Models/Subscription';
import { PaymentService } from '../Services/PaymentService';

export class SubscriptionController {
    constructor(
        private subscriptionRepository: ISubscriptionRepository,
        private paymentService: PaymentService
    ) {}

    public createSubscription(id: string, userId: string, planType: string, price: number): Subscription {
        const subscription = new Subscription(id, userId, planType, price);
        this.subscriptionRepository.save(subscription);
        console.log(`[SUBSCRIPTION CONTROLLER]: Suscripción creada para el plan ${planType}. Estado: Inactiva hasta confirmación de pago.`);
        return subscription;
    }

    public paySubscription(subscriptionId: string): void {
        const subscription = this.subscriptionRepository.findById(subscriptionId);
        if (!subscription) {
            console.log("[SUBSCRIPTION CONTROLLER]: Error: Suscripción no encontrada.");
            return;
        }
        this.paymentService.processPayment(subscription);
        this.subscriptionRepository.save(subscription); // Guardar estado actualizado (isActive = true)
    }
}
