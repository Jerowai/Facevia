-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles Table
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  plan_type text default 'free'::text
);

-- Models Table
create table public.models (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  replicate_model_id text,
  status text check (status in ('training', 'ready', 'failed')) default 'training',
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Images Table
create table public.images (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  model_id uuid references public.models(id),
  image_url text not null,
  prompt text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Protect Tables with Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.models enable row level security;
alter table public.images enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on public.profiles
  for update using ((select auth.uid()) = id);

-- Policies for models
create policy "Users can view own models." on public.models
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert own models." on public.models
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update own models." on public.models
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own models." on public.models
  for delete using ((select auth.uid()) = user_id);

-- Policies for images
create policy "Users can view own images." on public.images
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert own images." on public.images
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update own images." on public.images
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own images." on public.images
  for delete using ((select auth.uid()) = user_id);

-- Functions & Triggers for automatic user profile creation
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Setup Storage Bucket
insert into storage.buckets (id, name, public) values ('user-training-images', 'user-training-images', false);

create policy "Authenticated users can upload images"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'user-training-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );

create policy "Users can view their own training images"
  on storage.objects for select
  to authenticated
  using ( bucket_id = 'user-training-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );

create policy "Users can delete their own training images"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'user-training-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );
