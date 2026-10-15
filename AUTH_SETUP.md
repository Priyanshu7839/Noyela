# Supabase authentication setup

Noyela uses Supabase Auth as the account system. Google uses the native account
picker on Android and iOS, and the browser OAuth flow on web. Apple uses the
native Sign in with Apple sheet on iOS and OAuth on Android/web because Android
does not have an Apple account-picker API.

## Environment and database

Copy `.env.example` to `.env` and populate the Supabase URL and anon key from
**Supabase Dashboard → Project Settings → API**. Also add the public Google web
and iOS client IDs. Never place a Supabase service-role key, Google client
secret, or Apple private key in the app.

Apply `supabase/migrations/20261012000000_create_profiles.sql` in the Supabase
SQL Editor or through the Supabase CLI. It creates `public.user_profiles`,
linked one-to-one to Supabase-managed `auth.users` through `user_id`, with
row-level security.

## Supabase providers

Enable Google and Apple in **Authentication → Providers**.

For Google, add the web client ID and secret in Supabase. Add Android OAuth
clients for `com.noyela.app` with every signing SHA-1, plus an iOS OAuth client
for `com.noyela.app`. In Supabase’s Google client-ID list, put the web client
first and include the iOS and Android clients too, comma-separated.

For Apple, create a Service ID and a Sign in with Apple key. Enter the Service
ID, Team ID, Key ID, and private key in Supabase only. Put the Service ID first
in Supabase’s Apple client-ID list and include `com.noyela.app` as another
client ID for the native iOS token flow.

## Email/password login and custom emails

Email/password login uses Supabase Auth directly; it does not need another
database table. Enable **Email** under **Authentication → Providers**, then add
your own SMTP provider and customize the confirmation/reset templates under
**Authentication → Email Templates**. Keep email confirmation enabled in
production. Add the web origin and `com.noyela.app://auth/callback` to the
redirect allow list so confirmations return to the correct platform.

## Redirect URLs

In **Authentication → URL Configuration**, add each deployed web origin and:

```text
com.noyela.app://auth/callback
http://localhost:5173
```

Google and Apple provider consoles must use the Supabase callback displayed in
their provider settings, normally `https://YOUR-PROJECT.supabase.co/auth/v1/callback`.

## User contact data

Apple supplies name and email only on the first native iOS authorization. After
every social sign-in, Noyela opens the profile step and requires a confirmed
email address and phone number before onboarding continues. These fields are
saved in `public.user_profiles`; the auth identity stays in `auth.users`.

## Build

```bash
npm run cap:sync
npm run cap:android
npm run cap:ios
```

Test native sign-in on physical devices with production signing before release.
