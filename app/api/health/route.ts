/**
 * Health Check Endpoint
 * Used by Railway and monitoring services
 */

export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
}
