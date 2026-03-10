-- Add user_credits table
create table public.user_credits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  credits integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for user_credits
alter table public.user_credits enable row level security;

-- Policies for user_credits
create policy "Users can view own credits." on public.user_credits
  for select using ((select auth.uid()) = user_id);

-- Update models table to use Replicate valid statuses if needed
ALTER TABLE public.models DROP CONSTRAINT IF EXISTS models_status_check;
ALTER TABLE public.models ADD CONSTRAINT models_status_check CHECK (status IN ('starting', 'processing', 'succeeded', 'failed', 'canceled', 'ready', 'training'));

-- Trigger to auto-create user_credits row for new users
create function public.handle_new_user_credits()
returns trigger as $$
begin
  insert into public.user_credits (user_id, credits)
  values (new.id, 0);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created_credits
  after insert on auth.users
  for each row execute procedure public.handle_new_user_credits();

-- Create generated-images bucket and policies
insert into storage.buckets (id, name, public) values ('generated-images', 'generated-images', true);

create policy "Authenticated users can upload generated images"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'generated-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );

create policy "Anyone can view public generated images"
  on storage.objects for select
  to public
  using ( bucket_id = 'generated-images' );

create policy "Users can delete their own generated images"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'generated-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );
