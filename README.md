# SauceDemo E2E — Flujo de Compra Automatizado

Proyecto de automatización E2E que valida el flujo completo de compra en [saucedemo.com](https://www.saucedemo.com) utilizando Cypress y TypeScript con el patrón Page Object Model (POM).

## Prerrequisitos

- Node.js >= 18
- npm >= 9
- Git

## Instalación

```bash
git clone https://github.com/USUARIO/NOMBRE-REPO.git
cd NOMBRE-REPO
npm install
```

## Ejecución

**Modo headless (recomendado para CI / terminal):**

```bash
npm run cy:run
```

**Modo interactivo (Cypress Launchpad):**

```bash
npm run cy:open
```

En la ventana del Launchpad: seleccionar **E2E Testing** → elegir el navegador → ejecutar `purchase-flow.cy.ts`.

## Cobertura del test

El spec `purchase-flow.cy.ts` valida el siguiente flujo en un único escenario continuo:

1. Autenticación con `standard_user` / `secret_sauce`
2. Adición de dos productos al carrito desde la página de inventario
3. Verificación del badge del carrito (debe mostrar `2`)
4. Navegación al carrito y verificación de los dos ítems presentes
5. Completar el formulario de checkout (nombre, apellido, código postal)
6. Confirmación de la orden con el mensaje **"Thank you for your order!"**

## Estructura del proyecto

```
saucedemo-e2e/
├── cypress/
│   ├── e2e/
│   │   └── purchase-flow.cy.ts       # Spec principal del flujo de compra
│   ├── fixtures/
│   │   └── users.json                # Credenciales y datos del formulario
│   ├── pages/
│   │   ├── LoginPage.ts              # Page Object — pantalla de login
│   │   ├── InventoryPage.ts          # Page Object — listado de productos
│   │   ├── CartPage.ts               # Page Object — carrito de compras
│   │   ├── CheckoutStepOnePage.ts    # Page Object — formulario de datos
│   │   ├── CheckoutStepTwoPage.ts    # Page Object — resumen de la orden
│   │   └── CheckoutCompletePage.ts   # Page Object — confirmación de compra
│   └── support/
│       ├── commands.ts               # Comandos Cypress personalizados
│       └── e2e.ts                    # Archivo de soporte global
├── cypress.config.ts                 # Configuración de Cypress
├── tsconfig.json                     # Configuración de TypeScript
└── package.json                      # Dependencias y scripts del proyecto
```

## Tecnologías utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| Cypress | ^13.x | Framework de automatización E2E |
| TypeScript | ^5.x | Tipado estático |
| Node.js | >= 18 | Entorno de ejecución |
