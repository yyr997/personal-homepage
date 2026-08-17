-- Run once in Supabase Dashboard > SQL Editor.
-- Create the admin user in Authentication > Users before running this script.

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('insights', 'reflections')),
  title text not null check (char_length(title) between 1 and 200),
  content text not null default '' check (char_length(content) <= 50000),
  date_text text,
  series text,
  status text,
  tags text[] not null default '{}',
  notes text[] not null default '{}',
  legacy_key text unique,
  author_id uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id bigint generated always as identity primary key,
  post_id uuid not null references public.posts(id) on delete cascade,
  parent_id bigint,
  author_name text not null check (char_length(author_name) between 1 and 80),
  body text not null check (char_length(body) between 1 and 2000),
  is_owner boolean not null default false,
  created_at timestamptz not null default now(),
  unique (id, post_id),
  constraint comments_parent_same_post_fkey
    foreign key (parent_id, post_id)
    references public.comments(id, post_id)
    on delete cascade
);

create index if not exists posts_type_created_at_idx
  on public.posts (type, created_at desc);
create index if not exists posts_author_id_idx
  on public.posts (author_id);
create index if not exists comments_post_id_created_at_idx
  on public.comments (post_id, created_at);
create index if not exists comments_parent_id_idx
  on public.comments (parent_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.mark_owner_comment()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.is_owner := (select auth.uid()) is not null and exists (
    select 1 from public.site_admins
    where user_id = (select auth.uid())
  );
  return new;
end;
$$;

drop trigger if exists comments_mark_owner on public.comments;
create trigger comments_mark_owner
before insert on public.comments
for each row execute function private.mark_owner_comment();

revoke execute on function private.mark_owner_comment() from public, anon, authenticated;

alter table public.site_admins enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;

drop policy if exists "admin can read own role" on public.site_admins;
create policy "admin can read own role"
on public.site_admins for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "posts are public" on public.posts;
create policy "posts are public"
on public.posts for select
to anon, authenticated
using (true);

drop policy if exists "admin can insert posts" on public.posts;
create policy "admin can insert posts"
on public.posts for insert
to authenticated
with check (
  author_id = (select auth.uid())
  and exists (
    select 1 from public.site_admins
    where user_id = (select auth.uid())
  )
);

drop policy if exists "admin can update posts" on public.posts;
create policy "admin can update posts"
on public.posts for update
to authenticated
using (
  exists (
    select 1 from public.site_admins
    where user_id = (select auth.uid())
  )
)
with check (
  author_id = (select auth.uid())
  and exists (
    select 1 from public.site_admins
    where user_id = (select auth.uid())
  )
);

drop policy if exists "admin can delete posts" on public.posts;
create policy "admin can delete posts"
on public.posts for delete
to authenticated
using (
  exists (
    select 1 from public.site_admins
    where user_id = (select auth.uid())
  )
);

drop policy if exists "comments are public" on public.comments;
create policy "comments are public"
on public.comments for select
to anon, authenticated
using (true);

drop policy if exists "anyone can comment" on public.comments;
create policy "anyone can comment"
on public.comments for insert
to anon, authenticated
with check (true);

drop policy if exists "admin can delete comments" on public.comments;
create policy "admin can delete comments"
on public.comments for delete
to authenticated
using (
  exists (
    select 1 from public.site_admins
    where user_id = (select auth.uid())
  )
);

revoke all on table public.site_admins from anon, authenticated;
revoke all on table public.posts from anon, authenticated;
revoke all on table public.comments from anon, authenticated;

grant select on table public.site_admins to authenticated;
grant select on table public.posts to anon, authenticated;
grant insert, update, delete on table public.posts to authenticated;
grant select on table public.comments to anon, authenticated;
grant insert (post_id, parent_id, author_name, body) on table public.comments to anon, authenticated;
grant delete on table public.comments to authenticated;
grant usage, select on sequence public.comments_id_seq to anon, authenticated;

-- Bind the only administrator account.
insert into public.site_admins (user_id)
select id from auth.users where email = '1832126635@qq.com'
on conflict (user_id) do nothing;

do $$
begin
  if not exists (
    select 1 from auth.users where email = '1832126635@qq.com'
  ) then
    raise exception 'Create the Auth user 1832126635@qq.com before running this script.';
  end if;
end $$;
