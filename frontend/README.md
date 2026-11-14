# Lucid Themes AI - Frontend

## Documentation

The documentation for the frontend can be found [here](https://github.com/lucidthemes/lucid-themes-ai/blob/main/frontend/docs/overview.md)

## Environment variables

Environment variables for the frontend can be added by creating a .env-local file. The following variables are available by default:

| Variable                     | Type | Description                                                                                                                                                     | Required? |
| ---------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| DEVELOPMENT_MODE             | bool | Used to enable dev mode which disables the need for auth and allows access to the dashboard without logging in. This variable is required for server components | No        |
| NEXT_PUBLIC_DEVELOPMENT_MODE | bool | Used to enable dev mode which disables the need for auth and allows access to the dashboard without logging in. This variable is required for client components | No        |
