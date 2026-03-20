create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password_hash text not null,
  role text default 'admin',
  created_at timestamp with time zone default now()
);

create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text,
  created_at timestamp with time zone default now()
);

create table if not exists public.portfolio (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image_url text,
  project_url text,
  technologies text[],
  created_at timestamp with time zone default now()
);

create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  message text,
  status text default 'new',
  whatsapp_sent boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists public.testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  company text,
  message text not null,
  rating integer check (rating >= 1 and rating <= 5),
  created_at timestamp with time zone default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  site_title text not null default 'Yunaka Tech - Full Product & Technical Solutions',
  site_description text not null default 'Leading provider of innovative tech solutions, portfolio management, and expert services.',
  whatsapp_number text not null default '6281234567890',
  logo_text text not null default 'YUNAKA TECH',
  logo_text_italic boolean not null default false,
  hide_logo_text boolean not null default false,
  logo_image_path text,
  favicon_path text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.site_settings
  add column if not exists logo_text text not null default 'YUNAKA TECH';

alter table public.site_settings
  add column if not exists logo_text_italic boolean not null default false;

alter table public.site_settings
  add column if not exists hide_logo_text boolean not null default false;

alter table public.site_settings
  add column if not exists logo_image_path text;

alter table public.site_settings
  add column if not exists favicon_path text;

insert into public.site_settings (
  id,
  site_title,
  site_description,
  whatsapp_number,
  logo_text,
  logo_text_italic,
  hide_logo_text,
  logo_image_path,
  favicon_path
)
values (
  1,
  'Yunaka Tech - Full Product & Technical Solutions',
  'Leading provider of innovative tech solutions, portfolio management, and expert services.',
  '6281234567890',
  'YUNAKA TECH',
  false,
  false,
  null,
  null
)
on conflict (id) do nothing;
