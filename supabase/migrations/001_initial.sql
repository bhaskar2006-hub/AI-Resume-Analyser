-- Create profiles table
create table public.profiles (
  id uuid references auth.users(id) primary key,
  email text,
  is_pro boolean default false,
  stripe_customer_id text,
  resume_analyses_count integer default 0,
  interview_generations_count integer default 0,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
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
