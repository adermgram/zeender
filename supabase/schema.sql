-- ─────────────────────────────────────────────────────────────
-- Run this entire file in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── profiles ────────────────────────────────────────────────
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text not null,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- ─── payments ────────────────────────────────────────────────
create table public.payments (
  id                   uuid default uuid_generate_v4() primary key,
  user_id              uuid references auth.users(id) on delete cascade not null,
  paystack_reference   text unique not null,
  amount               integer not null,  -- stored in kobo (₦1,000 = 100000)
  status               text default 'pending'
                         check (status in ('pending', 'success', 'failed')) not null,
  created_at           timestamptz default now() not null
);

-- ─── resumes ─────────────────────────────────────────────────
create table public.resumes (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  content     jsonb not null,
  pdf_url     text,
  payment_id  uuid references public.payments(id),
  created_at  timestamptz default now() not null
);

-- ─── Row Level Security ───────────────────────────────────────
alter table public.profiles  enable row level security;
alter table public.payments  enable row level security;
alter table public.resumes   enable row level security;

-- profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- payments
create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);

create policy "Users can insert own payments"
  on public.payments for insert
  with check (auth.uid() = user_id);

create policy "Users can update own payments"
  on public.payments for update
  using (auth.uid() = user_id);

-- resumes
create policy "Users can view own resumes"
  on public.resumes for select
  using (auth.uid() = user_id);

create policy "Users can insert own resumes"
  on public.resumes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own resumes"
  on public.resumes for update
  using (auth.uid() = user_id);

-- ─── Auto-create profile on sign-up ──────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Storage bucket for PDFs ──────────────────────────────────
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', true)
on conflict do nothing;

create policy "Authenticated users can upload resumes"
  on storage.objects for insert
  with check (
    bucket_id = 'resumes'
    and auth.role() = 'authenticated'
  );

create policy "Public read access for resumes"
  on storage.objects for select
  using (bucket_id = 'resumes');
