📄 CONTEXT.md actualizado
markdown
# Proyecto: Plataforma de Vacantes
Este documento sirve como referencia viva del contexto del proyecto. Se actualiza en cada etapa para mantener claridad sobre requisitos, decisiones técnicas y avances.

## 1. Autenticación y Autorización
- JWT: estrategia (`JwtStrategy`) y guard (`JwtAuthGuard`) implementados y funcionando.
- Payload incluye: `sub` (userId), `email`, `role`.
- Flujo de `register`, `login`, `refresh`, `logout` completo.
- API Key: implementada y protegida en endpoints públicos (`auth/register`, `auth/login`, `auth/refresh`, `auth/logout`).
- Guards personalizados: `RolesGuard` implementado y aplicado en controladores (`users`, `vacancies`, `applications`).
- Decorators: `@Roles()` en uso para restringir acceso por rol.
- Roles definidos:
  - **Administrador**: acceso total.
  - **Gestor**: crear vacantes, definir/actualizar cupo máximo, consultar postulaciones, activar/inactivar vacantes.
  - **Coder**: registrarse, iniciar sesión, consultar vacantes, postularse a vacantes con cupo disponible.
- Regla: rol por defecto al registrarse = `coder`. Roles `admin` y `gestor` se asignan mediante seeders.

## 2. Persistencia de Datos
- Base de datos: PostgreSQL.
- ORM: TypeORM.
- Entidades definidas: `User`, `Vacancy`, `Application`.
- Configuración inicial: completada en `app.module.ts`.

## 3. DTOs y Validaciones
- User DTOs: `CreateUserDto`, `UpdateUserDto` con validaciones de email y password.
- Vacancy DTOs: `CreateVacancyDto`, `UpdateVacancyDto` con validaciones de campos obligatorios y `maxApplicants` (`@Min(1)`).
- Application DTOs: `CreateApplicationDto` (solo `vacancyId`).
- Pipes globales: configurados en `main.ts` con `ValidationPipe`.

## 4. Interceptores
- Global `ResponseInterceptor`: implementado para estandarizar todas las respuestas en formato:
```json
{
  "success": true,
  "data": {},
  "message": "Operación exitosa"
}
5. Documentación
Swagger (@nestjs/swagger): configurado.

Endpoints documentados: Registro, Login, Creación de vacantes, Postulación a vacantes.

Headers requeridos: Authorization (JWT), x-api-key.

Ejemplos en Swagger alineados con datos de seeders.

6. Estructura Modular (NestJS CLI)
Módulos generados:

auth

users

vacancies

applications

7. Dependencias Instaladas
bash
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/jwt passport-jwt passport @nestjs/passport
npm install class-validator class-transformer
npm install @nestjs/swagger swagger-ui-express
npm install @nestjs/config
8. Configuración de main.ts
Pipes globales: activados con ValidationPipe.

Interceptors globales: ResponseInterceptor aplicado.

Puerto dinámico: configurado con process.env.PORT ?? 3000.

Mensaje de confirmación:

Código
🚀 Aplicación conectada correctamente en el puerto <PORT>
📖 Swagger disponible en http://localhost:<PORT>/api
9. Criterios de Aceptación
Funcionalidad:
Coder puede registrarse e iniciar sesión.

Gestor puede crear vacantes y definir cupos.

Coder puede postularse solo si hay cupo disponible.

Administrador accede a todos los recursos.

Seguridad:
Endpoints protegidos con JWT y API Key.

Control de acceso con Guards y Decorators personalizados.

Clean Code:
Inyección de dependencias.

Principios SOLID.

Código tipado con TypeScript.

Pruebas Unitarias:
Framework: Jest.

Casos: creación de vacantes y postulación.

Cobertura mínima: 40%.

Estado Actual
✅ Carpetas generadas con nest g resource.
✅ Entidades definidas.
✅ Dependencias listadas.
✅ Configuración inicial de TypeORM en app.module.ts.
✅ DTOs corregidos y alineados con entidades/seeders.
✅ Validaciones globales configuradas en main.ts.
✅ Servicios y controladores de Users, Vacancies y Applications completos y limpios.
✅ Interceptor global implementado para respuestas estandarizadas.
✅ AuthModule completo con JWT (register, login, refresh, logout) y roles en payload.
✅ Seeders implementados (usuarios, vacantes, aplicaciones).
➡️ Próximo paso: comenzar pruebas unitarias con Jest (mínimo 40% de cobertura).