import { IPaymentObserver } from './IPaymentObserver';
import { Subscription } from '../Models/Subscription';
import { DatabaseConnection } from '../Config/DatabaseConnection';
import { Invoice } from '../Models/Invoice';
import { NotificationFactory } from '../Factories/NotificationFactory';

// 1. Observer encargado de la facturación y el envío de notificaciones por Factory
export class EmailNotificationObserver implements IPaymentObserver {
    private db = DatabaseConnection.getInstance();

    public update(subscription: Subscription): void {
        const user = this.db.users.get(subscription.userId);
        if (user) {
            // Generación de factura física y persistencia simulada
            const invoiceId = `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            const invoice = new Invoice(invoiceId, subscription.id, subscription.price, new Date());
            this.db.invoices.set(invoiceId, invoice);

            // Uso de la Factory Method según preferencia del usuario
            const notifier = NotificationFactory.createNotificationService(user.notificationPreference);
            notifier.send(`Tu pago de $${subscription.price} por el plan ${subscription.planType} fue procesado con éxito. Factura: ${invoiceId}`, user.email);
        }
    }
}

// 2. Observer encargado de métricas del negocio
export class MetricsServiceObserver implements IPaymentObserver {
    private totalRevenue: number = 0;

    public update(subscription: Subscription): void {
        this.totalRevenue += subscription.price;
        console.log(`[METRICS]: Ingresos totales actualizados. +$${subscription.price}. Total acumulado: $${this.totalRevenue}`);
    }
}

// 3. Observer encargado del Control de Accesos
export class AccessControlObserver implements IPaymentObserver {
    public update(subscription: Subscription): void {
        subscription.isActive = true;
        console.log(`[ACCESS CONTROL]: Accesos Premium ACTIVADOS para el usuario de la suscripción ${subscription.id}`);
    }
}

