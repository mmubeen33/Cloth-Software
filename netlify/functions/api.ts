import serverless from 'serverless-http';
import { app } from '../../backend/index';

export const handler = serverless(app, {
  basePath: '/.netlify/functions/api',
  request: (request: any, event: any, context: any) => {
    // Store raw event for debugging
    request.apiGateway = { event, context };

    // Pre-parse body from Lambda event and inject into request
    // This bypasses the Express body parser compatibility issue with serverless-http
    if (event.body) {
      try {
        const decoded = event.isBase64Encoded
          ? Buffer.from(event.body, 'base64').toString('utf8')
          : event.body;
        request._lambdaBody = JSON.parse(decoded);
      } catch {
        // Body is not JSON, store as-is
        request._lambdaBody = null;
      }
    }
  }
});
