export class Subscription {
constructor(
public id: string,
public userId: string,
public planType: string,
public price: number,
public isActive: boolean = false
) {}
}