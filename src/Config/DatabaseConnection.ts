export class DatabaseConnection {
private static instance: DatabaseConnection;
// Almacenamiento en memoria para simular las tablas de la BD
public users: Map<string, any> = new Map();
public subscriptions: Map<string, any> = new Map();
public invoices: Map<string, any> = new Map();
private constructor() {
// Constructor privado para evitar instanciación externa
}
public static getInstance(): DatabaseConnection {
if (!DatabaseConnection.instance) {
DatabaseConnection.instance = new DatabaseConnection();
}
return DatabaseConnection.instance;
}
}