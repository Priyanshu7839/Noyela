-- Supabase owns auth.users. Application-owned user data belongs in this table.
create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  contact_email text,
  phone text,
  onboarding_complete boolean not null default false,
  welcome_popup_seen boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;

create policy "Users can read their own profile"
  on public.user_profiles for select using ((select auth.uid()) = user_id);
create policy "Users can create their own profile"
  on public.user_profiles for insert with check ((select auth.uid()) = user_id);
create policy "Users can update their own profile"
  on public.user_profiles for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.user_profiles (user_id, full_name, contact_email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'), new.email)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger user_profiles_set_updated_at before update on public.user_profiles
  for each row execute procedure public.set_updated_at();
