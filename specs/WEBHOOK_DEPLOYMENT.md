# Resend Database Webhook Deployment

Your edge function `send-email` is fully scaffolded and ready to catch new bookings safely behind the scenes. Because edge functions run on Supabase's secure Deno servers rather than in Next.js, follow these four simple steps to deploy and activate the pipeline!

## 1. Push the Function to Supabase
Deploy the function using the Supabase CLI from your repository root:
```bash
npx supabase functions deploy send-email
```

## 2. Inject the Secure Key
Inject the Resend API Key directly into your Supabase Edge runtime secure vault (this ensures the key is completely hidden from the front-end and browser architectures):
```bash
npx supabase secrets set RESEND_API_KEY=your_key_here
```

## 3. Map the Database Webhook (The Magic)
We need to tell the `bookings` database table to auto-ping the Edge Function instantly upon a customer booking.

Head into your online **Supabase Dashboard**:
1. Navigate to **Database** (left sidebar) -> **Webhooks**.
2. Click **Create Webhook**.
3. **Name**: `Dispatch Booking Email`
4. **Table**: `bookings`
5. **Events**: Check `Insert`
6. **Type**: Webhook
7. **HTTP Request**:
   - **Method**: `POST`
   - **URL**: `https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/send-email`
8. Click **Save Webhook.**

## 4. Test it out!
Open the Chat Widget locally, pretend to be a customer, and finalize a booking with your email address. Within seconds of the AI agent executing the tool, you will receive the rendered confirmation in your inbox.
