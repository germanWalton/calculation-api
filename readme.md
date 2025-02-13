# Documentación de la API de Gestión de Proyectos

## Descripción General
Esta API proporciona una solución completa para la gestión de proyectos, movimientos y líneas con cálculos financieros. Incluye autenticación de usuarios, validación de datos y gestión jerárquica de la información.

## Tabla de Contenidos
1. [Stack Tecnológico](#stack-tecnológico)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Instalación](#instalación)
4. [Configuración del Entorno](#configuración-del-entorno)
5. [Autenticación](#autenticación)
6. [Endpoints de la API](#endpoints-de-la-api)
7. [Modelos de Datos](#modelos-de-datos)
8. [Reglas de Validación](#reglas-de-validación)
9. [Sistema de Cálculos](#sistema-de-cálculos)
10. [Manejo de Errores](#manejo-de-errores)

## Stack Tecnológico
- **Node.js y Express**: Framework backend
- **MongoDB y Mongoose**: Base de datos y ODM
- **JWT**: Autenticación
- **Bcrypt**: Encriptación de contraseñas
- **Helmet**: Cabeceras de seguridad
- **CORS**: Compartición de recursos entre orígenes
- **Morgan**: Registro de peticiones HTTP

## Estructura del Proyecto
```
src/
├── config/
│   └── database.js
├── middlewares/
│   ├── auth.middleware.js
│   └── validate.middleware.js
├── models/
│   ├── user.model.js
│   ├── project.model.js
│   ├── movement.model.js
│   └── line.model.js
├── routes/
│   ├── auth.routes.js
│   ├── project.routes.js
│   ├── movement.routes.js
│   └── line.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── project.controller.js
│   ├── movement.controller.js
│   └── line.controller.js
├── validators/
│   ├── auth.validator.js
│   ├── project.validator.js
│   ├── movement.validator.js
│   └── line.validator.js
├── utils/
│   └── calculations.js
└── app.js
```

## Instalación

```bash
# Clonar el repositorio
git clone [url-repositorio]

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev

# Iniciar servidor de producción
npm start
```

## Configuración del Entorno

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/project-management
JWT_SECRET=tu-clave-secreta
NODE_ENV=development
```

## Autenticación

### Registro
**POST** `/api/auth/register`
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "contraseña123"
}
```

### Inicio de Sesión
**POST** `/api/auth/login`
```json
{
  "email": "juan@ejemplo.com",
  "password": "contraseña123"
}
```

Todos los endpoints autenticados requieren un token Bearer:
```
Authorization: Bearer [token]
```

## Endpoints de la API

### Proyectos

#### Crear Proyecto
**POST** `/api/projects`
```json
{
  "name": "Nombre del Proyecto"
}
```

#### Obtener Proyectos
**GET** `/api/projects`

#### Eliminar Proyectos
**DELETE** `/api/projects`
```json
{
  "projectIds": ["idProyecto1", "idProyecto2"]
}
```

#### Buscar Proyectos
**GET** `/api/projects/search?query=nombre&page=1&limit=10`

### Movimientos

#### Crear Movimiento
**POST** `/api/movements`
```json
{
  "name": "Nombre del Movimiento",
  "projectId": "idProyecto"
}
```

#### Obtener Movimientos
**GET** `/api/movements/project/:projectId`

#### Eliminar Movimientos
**DELETE** `/api/movements`
```json
{
  "movementIds": ["idMovimiento1", "idMovimiento2"]
}
```

### Líneas

#### Crear Línea
**POST** `/api/lines`
```json
{
  "name": "Nombre de la Línea",
  "movementId": "idMovimiento"
}
```

#### Obtener Líneas
**GET** `/api/lines/movement/:movementId`

#### Eliminar Líneas
**DELETE** `/api/lines`
```json
{
  "lineIds": ["idLinea1", "idLinea2"]
}
```

#### Actualizar Números de Línea
**PATCH** `/api/lines/:lineId/numbers`
```json
{
  "sumPrice": 1000,
  "sumBudget": 800
}
```

## Modelos de Datos

### Modelo de Usuario
```javascript
{
  name: String,
  email: String (único),
  password: String (encriptado)
}
```

### Modelos de Proyecto/Movimiento/Línea
```javascript
{
  name: String,
  creator: {
    user: ObjectId
  },
  numbers: {
    sumPrice: {
      value: String,
      lastValue: String,
      number: Number,
      lastNumber: Number
    },
    sumBudget: {
      value: String,
      lastValue: String,
      number: Number,
      lastNumber: Number
    },
    budgetUtility: {
      value: String,
      lastValue: String,
      number: Number,
      lastNumber: Number
    },
    budgetMargin: {
      value: String,
      lastValue: String,
      number: Number,
      lastNumber: Number
    }
  }
}
```



## Sistema de Cálculos

El sistema calcula y actualiza automáticamente:
1. Utilidad Presupuestada: `sumPrice - sumBudget`
2. Margen Presupuestado: `(budgetUtility / sumPrice) * 100`

Las actualizaciones se propagan en cascada:
- Las actualizaciones de Línea afectan los totales del Movimiento
- Las actualizaciones de Movimiento afectan los totales del Proyecto

## Manejo de Errores

### Códigos de Estado HTTP
- 200: Éxito
- 201: Creado
- 400: Solicitud Incorrecta
- 401: No Autorizado
- 404: No Encontrado
- 500: Error del Servidor



## Características de Seguridad

1. Encriptación de Contraseñas
   - Bcrypt con 10 rondas de salt

2. Autenticación JWT
   - Expiración del token: 24 horas
   - Validación segura del token

3. Validación de Peticiones
   - Sanitización de entrada
   - Verificación de tipos
   - Validación de formato

4. Cabeceras de Seguridad
   - Middleware Helmet
   - Protección CORS
   - Prevención XSS

## Mejores Prácticas

1. Organización del Código
   - Arquitectura modular
   - Separación de responsabilidades
   - Principios DRY

2. Manejo de Errores
   - Formato consistente de errores
   - Errores de validación detallados
   - Middleware global de errores

3. Rendimiento
   - Consultas eficientes a la base de datos
   - Indexación adecuada
   - Optimización de validación de peticiones



