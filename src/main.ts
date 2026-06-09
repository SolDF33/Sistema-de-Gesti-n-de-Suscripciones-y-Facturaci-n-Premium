import { UserRepository } from './Repositories/UserRepository';
import { SubscriptionRepository } from './Repositories/SubscriptionRepository';
import { PaymentService } from './Services/PaymentService';
import { UserController } from './Controllers/UserController';
import { SubscriptionController } from './Controllers/SubscriptionController';
import { EmailNotificationObserver, MetricsServiceObserver, AccessControlObserver } from './Observers/EmailNotificationObserver';

function main() {
    console.log("=== INICIALIZANDO CONTENEDOR DE DEPENDENCIAS (IoC Simulado) ===");
    
    // 1. Inicializar Repositorios y Servicios Principales
    const userRepository = new UserRepository();
    const subscriptionRepository = new SubscriptionRepository();
    const paymentService = new PaymentService();

    // 2. Configurar y enlazar los Observadores del Sistema de Pagos
    const emailObserver = new EmailNotificationObserver();
    const metricsObserver = new MetricsServiceObserver();
    const accessObserver = new AccessControlObserver();

    paymentService.attach(emailObserver);
    paymentService.attach(metricsObserver);
    paymentService.attach(accessObserver);

    // 3. Inicializar Controladores inyectando sus abstracciones respectivas (SOLID - D)
    const userController = new UserController(userRepository);
    const subscriptionController = new SubscriptionController(subscriptionRepository, paymentService);

    console.log("\n=== EJECUTANDO HISTORIA DE USUARIO 1: REGISTRO ===");
    const usuario = userController.registerUser("USR-100", "Carlos Gómez", "carlos@example.com", "EMAIL");

    console.log("\n=== EJECUTANDO HISTORIA DE USUARIO 2: SELECCIÓN DE PLAN (FACTORY) ===");
    // Simulación del Factory Method para definir costos dinámicos según el tipo de plan
    const planElegido = "PREMIUM_GOLD";
    const precioPlan = 49.99; 
    const suscripcion = subscriptionController.createSubscription("SUB-999", usuario.id, planElegido, precioPlan);

    console.log("\n=== EJECUTANDO HISTORIA DE USUARIO 3: PROCESAMIENTO DE PAGO (OBSERVER CORE) ===");
    subscriptionController.paySubscription(suscripcion.id);

    console.log("\n=== FIN DE LA DEMOSTRACIÓN EXITOSA ===");
}

main();


