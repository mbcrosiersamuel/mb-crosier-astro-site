import { defineMiddleware } from 'astro:middleware';

const isProd = process.env.NODE_ENV === 'production';

const prodCSP = {
  'default-src': ["'self'"],
  'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://*.fontawesome.com", "https://ka-f.fontawesome.com"],
  'style-src-elem': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://*.fontawesome.com", "https://ka-f.fontawesome.com"],
  'font-src': ["'self'", "https://fonts.gstatic.com", "https://ka-f.fontawesome.com", "https://*.fontawesome.com"],
  'script-src': ["'self'", "'unsafe-inline'", "https://kit.fontawesome.com", "https://embed.reddit.com", "https://platform.twitter.com", "https://cdn.vercel-insights.com"],
  'frame-src': ["'self'", "https://platform.twitter.com", "https://www.reddit.com"],
  'connect-src': ["'self'", "https://*.fontawesome.com", "https://ka-f.fontawesome.com", "https://vitals.vercel-insights.com"],
  'img-src': ["'self'", "data:", "https://*.fontawesome.com", "https://ka-f.fontawesome.com"]
};

const devCSP = {
  'default-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "data:", "blob:"],
  'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://*.fontawesome.com", "https://ka-f.fontawesome.com"],
  'style-src-elem': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://*.fontawesome.com", "https://ka-f.fontawesome.com"],
  'font-src': ["'self'", "https://fonts.gstatic.com", "https://ka-f.fontawesome.com", "https://*.fontawesome.com"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://kit.fontawesome.com", "https://embed.reddit.com", "https://platform.twitter.com", "https://cdn.vercel-insights.com"],
  'frame-src': ["'self'", "https://platform.twitter.com", "https://www.reddit.com"],
  'img-src': ["'self'", "data:", "blob:", "https:", "https://*.fontawesome.com", "https://ka-f.fontawesome.com"],
  'connect-src': ["'self'", "ws:", "wss:", "https://*.fontawesome.com", "https://ka-f.fontawesome.com", "https://vitals.vercel-insights.com"]
};

const cspObjectToString = (cspObj: Record<string, string[]>) => {
  return Object.entries(cspObj)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
};

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  if (response instanceof Response) {
    const csp = cspObjectToString(isProd ? prodCSP : devCSP);
    response.headers.set('Content-Security-Policy', csp);
  }
  
  return response;
}); 