export class Invoice {
constructor(
public id: string,
public subscriptionId: string,
public amount: number,
public issuedAt: Date
) {}
}