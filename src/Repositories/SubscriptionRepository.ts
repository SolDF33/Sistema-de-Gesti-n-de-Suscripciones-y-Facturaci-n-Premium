import { ISubscriptionRepository } from './ISubscriptionRepository';
import { Subscription } from '../Models/Subscription';
import { DatabaseConnection } from '../Config/DatabaseConnection';
export class SubscriptionRepository implements ISubscriptionRepository
{
private db = DatabaseConnection.getInstance();
public save(subscription: Subscription): void {
this.db.subscriptions.set(subscription.id, subscription);
}
public findById(id: string): Subscription | undefined {
return this.db.subscriptions.get(id);
}
public findByUserId(userId: string): Subscription | undefined {
return Array.from(this.db.subscriptions.values())
.find(sub => sub.userId === userId);

}
}