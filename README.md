# AppointmentApp

AppointmentApp now includes an **AI social media post automation module** for business clients.

## What is included

- Angular UI to capture campaign inputs (business name, audience, platform, tone, offer, CTA).
- Angular service that calls a backend endpoint: `POST /api/social-posts/generate`.
- Response rendering for generated post copy and hashtags.

## Frontend run

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## .NET Core backend contract (for Azure OpenAI)

The Angular app expects the backend response shape below:

```json
{
  "post": "...",
  "hashtags": ["Business", "Marketing"],
  "platform": "LinkedIn"
}
```

Suggested endpoint:

`POST /api/social-posts/generate`

Request shape:

```json
{
  "businessName": "Contoso Dental",
  "targetAudience": "Working professionals",
  "platform": "LinkedIn",
  "offerDetails": "20% off first cleaning in April",
  "tone": "Professional",
  "callToAction": "Book your appointment today"
}
```

### Example .NET Core implementation sketch

Use Azure OpenAI from your ASP.NET Core API and return a structured JSON response to Angular.

```csharp
app.MapPost("/api/social-posts/generate", async (SocialPostRequest request, IAzureOpenAIService aiService) =>
{
    var result = await aiService.GenerateBusinessPostAsync(request);
    return Results.Ok(result);
});
```

Keep Azure configuration in `appsettings.json` and Key Vault/environment variables.

## Build

```bash
npm run build
```
