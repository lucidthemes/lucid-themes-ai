// for server components
export const isDevelopmentModeServer = Boolean(process.env.DEVELOPMENT_MODE) ?? false;

// for client components
export const isDevelopmentModeClient = Boolean(process.env.NEXT_PUBLIC_DEVELOPMENT_MODE) ?? false;
