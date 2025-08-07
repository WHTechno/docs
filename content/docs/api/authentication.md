# API Authentication

This guide covers how to authenticate with our API.

## Overview

Our API uses token-based authentication to secure endpoints and ensure that only authorized users can access protected resources.

## Authentication Methods

### Bearer Token Authentication

The most common method is using Bearer tokens in the Authorization header.

```bash
# Example API request with authentication
curl -X GET https://api.example.com/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

### API Key Authentication

For server-to-server communication, you can use API keys.

```bash
# Using API key in header
curl -X GET https://api.example.com/data \
  -H "X-API-Key: YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json"

# Using API key as query parameter
curl -X GET "https://api.example.com/data?api_key=YOUR_API_KEY_HERE"
```

## Getting Your Token

1. Log in to your account dashboard
2. Navigate to the API section
3. Generate a new token
4. Copy and store it securely

## Token Security

- **Never expose tokens in client-side code**
- **Use environment variables** to store tokens
- **Rotate tokens regularly** for security
- **Use HTTPS only** when transmitting tokens

## Error Responses

### 401 Unauthorized

```json
{
  "error": "unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 403 Forbidden

```json
{
  "error": "forbidden", 
  "message": "Token does not have required permissions"
}
```

## Code Examples

### JavaScript/Node.js

```javascript
const fetch = require('node-fetch');

async function makeAuthenticatedRequest() {
  const response = await fetch('https://api.example.com/users', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
}
```

### Python

```python
import requests
import os

def make_authenticated_request():
    headers = {
        'Authorization': f'Bearer {os.getenv("API_TOKEN")}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get('https://api.example.com/users', headers=headers)
    response.raise_for_status()
    
    return response.json()
```

## Rate Limiting

Our API implements rate limiting to ensure fair usage:

| Plan | Requests per minute | Requests per hour |
|------|-------------------|------------------|
| Free | 60 | 1,000 |
| Pro | 300 | 10,000 |
| Enterprise | 1,000 | 50,000 |

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response.
