import serverless from 'serverless-http';
import { app } from '../../backend/index';

export const handler = serverless(app, {
  basePath: '/.netlify/functions/api',
  request: (request: any, event: any, context: any) => {
    // Ensure apiGateway event is available for body parsing fallback
    request.apiGateway = { event, context };
  }
});
