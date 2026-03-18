# PetStore API Tests — Ciclo de Vida de Usuario

Proyecto de pruebas automatizadas de API REST que valida el ciclo de vida completo de un usuario en la [PetStore API](https://petstore.swagger.io/) utilizando Cypress y TypeScript con el patrón API Client (equivalente al Page Object Model, aplicado a servicios REST).

## Prerrequisitos

- Node.js >= 18
- npm >= 9
- Git
- Conexión a internet (la API es pública en petstore.swagger.io)

## Instalación

```bash
git clone https://github.com/AndresM11/TestAutomation.git
cd TestAutomation/API
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

En la ventana del Launchpad: seleccionar **E2E Testing** → elegir el navegador → ejecutar `user-lifecycle.cy.ts`.

## Cobertura del test

El spec `user-lifecycle.cy.ts` valida el ciclo de vida completo de un usuario en 5 casos de prueba independientes:

| # | Caso de prueba | Método HTTP | Endpoint |
|---|---|---|---|
| 1 | Crea un nuevo usuario | POST | `/user` |
| 2 | Busca el usuario creado | GET | `/user/{username}` |
| 3 | Actualiza el nombre y el correo del usuario | PUT | `/user/{username}` |
| 4 | Verifica los datos actualizados del usuario | GET | `/user/{username}` |
| 5 | Elimina el usuario | DELETE | `/user/{username}` |

El `username` utilizado en cada ejecución incluye un sufijo de timestamp (`testuser_pipe_<timestamp>`) para evitar colisiones con otros testers que usan la misma API pública compartida.

## Entradas y salidas por caso de prueba

**POST /user**
- Entrada: objeto `User` completo con todos sus campos (id, username, firstName, lastName, email, password, phone, userStatus)
- Salida esperada: `{ code: 200, type: "unknown", message: "<userId>" }`

**GET /user/{username}**
- Entrada: `username` como parámetro de ruta
- Salida esperada: objeto `User` con todos los campos y los valores verificados

**PUT /user/{username}**
- Entrada: `username` como parámetro de ruta + objeto `User` completo con los campos actualizados
- Salida esperada: `{ code: 200, type: "unknown", message: "<userId>" }`
- Nota: la API no acepta actualizaciones parciales (PATCH no está disponible); se envía el objeto completo combinando los datos existentes con los nuevos

**DELETE /user/{username}**
- Entrada: `username` como parámetro de ruta
- Salida esperada: HTTP 200

## Estructura del proyecto

```
API/
├── cypress/
│   ├── api/
│   │   └── UserApiClient.ts          # API Client — encapsula todos los endpoints
│   ├── e2e/
│   │   └── user-lifecycle.cy.ts      # Spec principal con los 5 casos de prueba
│   ├── fixtures/
│   │   └── user.json                 # Datos de prueba iniciales y actualizados
│   ├── types/
│   │   └── User.ts                   # Interfaz TypeScript del modelo de usuario
│   └── support/
│       ├── commands.ts               # Comandos Cypress personalizados
│       └── e2e.ts                    # Archivo de soporte global
├── cypress.config.ts                 # Configuración de Cypress con baseUrl de la API
├── tsconfig.json                     # Configuración de TypeScript
└── package.json                      # Dependencias y scripts del proyecto
```

## Tecnologías utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| Cypress | ^13.x | Framework de pruebas con `cy.request()` para llamadas HTTP |
| TypeScript | ^5.x | Tipado estático del modelo y el cliente API |
| Node.js | >= 18 | Entorno de ejecución |

## Notas sobre la API

- La PetStore API es un entorno de demostración público. Los datos pueden ser modificados o eliminados por cualquier usuario.
- `POST /user` no retorna el objeto creado, sino un wrapper `{ code, type, message }`. La verificación de datos se realiza en el `GET` posterior.
- La API no implementa el método `PATCH`; las actualizaciones parciales requieren enviar el objeto `User` completo vía `PUT`.

