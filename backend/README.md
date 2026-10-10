# Lucid Themes AI - Backend

## Environment variables

Environment variables for the backend can be added by creating a .env file. The following variables are available by default:

| Variable | Type | Default | Description | Required?
| ----------- | ----------- | ----------- | ----------- | ----------- |
| PROJECT_TITLE | str | Lucid Themes AI | Title used for openapi docs | No
| PROJECT_SUMMARY | str | Backend API used by the frontend app | Summary used for openapi docs | No
| FRONTEND_URL | str | | The URL to the frontend app. This is required to stop the API calls from the frontend being blocked by CORS | Yes
| WRITE_DATABASE_URL | str | | The connection string to your primary database used for writes | Yes
| READ_DATABASE_URL | str | | The connection string to your read replica database used for reads. See below for information on read replication | Yes
| DIRECT_DATABASE_URL | str | | The connection string used for Alembic migrations. This should be a direct connection string and not a connection pooler, see below for more details | Yes
| DATABASE_SCHEMA | str | public | The Postgres schema used for the database | No
| JWKS_URL | str | None | The URL to a JWKS used to verify the JWT sent in fetch headers | Yes (if not using development mode)
| JWT_ALGORITHM | str | ES256 | The algorithm used to verify the JWT | No
| JWT_AUDIENCE | str | authenticated | The aud claim for the JWT | No
| DEVELOPMENT_MODE | bool | false | Used to enable dev mode which disables the need to pass a JWT in the fetch headers when making API calls | No

## Database read replication

The backend supports database read replication through the use of dedicated write and read engines. This is optional and can be used by setting different database connection strings for the `WRITE_DATABASE_URL` and `READ_DATABASE_URL` env variables. 

If read replication is not needed, these variables can be set to the same database connection string.

## Database Connection Pooling

If the backend is going to be deployed on serverless compute, shared connection pooling strings can optionally be used for the `WRITE_DATABASE_URL` and `READ_DATABASE_URL` env variables.

The `DIRECT_DATABASE_URL` env variable needs be set to a direct connection string as this is used for Alembic migrations which require a direct connection to lock tables safely and make database schema changes.