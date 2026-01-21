import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

// Cache the API key to avoid repeated AWS calls
let cachedApiKey: string | null = null;

export async function getApiKey(): Promise<string> {
  // Return cached key if available
  if (cachedApiKey) {
    return cachedApiKey;
  }

  // Try to get from environment variable first (for local development)
  if (process.env.OPENWEATHER_API_KEY) {
    console.log('✅ Using API key from environment variable (.env.local)');
    cachedApiKey = process.env.OPENWEATHER_API_KEY;
    return cachedApiKey;
  }

  // Fetch from AWS Systems Manager Parameter Store
  console.log('☁️ Fetching API key from AWS Parameter Store...');
  try {
    const client = new SSMClient({ region: process.env.WEATHER_APP_REGION || process.env.AWS_REGION || 'us-east-1' });
    const command = new GetParameterCommand({
      Name: '/weather-app/openweather-api-key',
      WithDecryption: true,
    });

    const response = await client.send(command);
    console.log('✅ Successfully fetched API key from AWS!');
    
    if (response.Parameter?.Value) {
      cachedApiKey = response.Parameter.Value;
      return cachedApiKey;
    }

    throw new Error('API key not found in AWS Parameter Store');
  } catch (error) {
    console.error('Error fetching API key from AWS:', error);
    throw new Error('Failed to retrieve API key');
  }
}
