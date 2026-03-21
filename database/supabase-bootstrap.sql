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

create table if not exists public.portfolio_projects (
  slug text primary key,
  code text not null,
  title text not null,
  eyebrow text not null,
  category text not null,
  description text not null,
  long_description text not null,
  image_url text not null,
  image_alt text not null,
  tags text[] not null default '{}',
  challenge text not null,
  solution text not null,
  outcomes text[] not null default '{}',
  metrics jsonb not null default '[]'::jsonb,
  deliverables text[] not null default '{}',
  updated_at timestamp with time zone default now()
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

create table if not exists public.pricing_plans (
  plan_key text primary key check (plan_key in ('basic', 'standard', 'premium')),
  name text not null,
  price text not null,
  cta text not null,
  features text[] not null default '{}',
  highlighted boolean not null default false,
  display_order integer not null,
  updated_at timestamp with time zone default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  site_title text not null default 'Yunaka Tech - Full Product & Technical Solutions',
  site_description text not null default 'Leading provider of innovative tech solutions, portfolio management, and expert services.',
  whatsapp_number text not null default '6281234567890',
  ui_density text not null default 'compact' check (ui_density in ('compact', 'comfortable')),
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
  add column if not exists ui_density text not null default 'compact';

alter table public.site_settings
  add column if not exists logo_text_italic boolean not null default false;

alter table public.site_settings
  add column if not exists hide_logo_text boolean not null default false;

alter table public.site_settings
  add column if not exists logo_image_path text;

alter table public.site_settings
  add column if not exists favicon_path text;

insert into public.pricing_plans (
  plan_key,
  name,
  price,
  cta,
  features,
  highlighted,
  display_order
)
values
  (
    'basic',
    'Basic',
    'Rp 5.9M',
    'Get Basic',
    array['5 Pages Design', 'Mobile Responsive', 'Basic SEO Setup'],
    false,
    0
  ),
  (
    'standard',
    'Standard',
    'Rp 12.5M',
    'Get Standard',
    array['Unlimited Pages', 'CMS Integration', 'Advanced SEO', 'Custom Animations'],
    true,
    1
  ),
  (
    'premium',
    'Premium',
    'Rp 25M+',
    'Get Custom',
    array['Custom Software Dev', 'E-commerce Engine', '24/7 Priority Support'],
    false,
    2
  )
on conflict (plan_key) do nothing;

insert into public.portfolio_projects (
  slug,
  code,
  title,
  eyebrow,
  category,
  description,
  long_description,
  image_url,
  image_alt,
  tags,
  challenge,
  solution,
  outcomes,
  metrics,
  deliverables
)
values
  (
    'build-001',
    'BUILD_001',
    'AETHER CORE ENGINE',
    'Distributed Settlement Infrastructure',
    'Platform Engineering',
    'Distributed ledger infrastructure for high-frequency algorithmic trade settlements. Built for 99.999% uptime.',
    'Aether Core Engine was designed for a capital markets team that needed trade settlement logic to run with deterministic reliability across multiple regions. The system had to process intense peak traffic, keep auditability intact, and remain debuggable under strict compliance requirements.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBkEiaNuUf-EPuzrEMIk72HCOO5dbsvfYvX7qCBhFJjMnT3rW5oKI84qDp568z2wVN711RPMGHW8gtx4kl8aNFV-KHhuFY4EkbXBNWW0tucg_sTjuIQ3EYImBS2xqF0VK0zjkW6NGmbPo9Z6ko4iMYH9jQChdaB2dXBZYPkKBNsbz5XZ1go-s-iM3sy8IXGpS2e3KLAmW-ephp5dHwPB8ceGEzij395VJMtHAr9jD7IcYiUlGiS7ci_qDZpte3dQxBgczV8rAek5DM',
    'Server hardware with neon blue internal lighting',
    array['RUST', 'KUBERNETES', 'GRPC'],
    'The client was losing confidence in an aging settlement stack that could not safely scale with intraday volume spikes and regional failover demands.',
    'We rebuilt the core execution path in Rust, introduced gRPC-based service contracts, and shipped a Kubernetes deployment topology with safer rollback and observability baked in from day one.',
    array['Safer multi-region failover without manual intervention', 'Cleaner service boundaries for audit and compliance review', 'Lower latency across the most critical settlement flows'],
    '[{"label":"Peak Throughput","value":"2.8M tx/hr"},{"label":"Availability Target","value":"99.999%"},{"label":"Rollback Window","value":"< 5 min"}]'::jsonb,
    array['Core ledger microservices', 'Operational dashboards', 'Deployment and rollback pipeline', 'Incident response playbook']
  ),
  (
    'build-002',
    'BUILD_002',
    'VOID INFRASTRUCTURE',
    'Zero-Trust Cloud Foundation',
    'Infrastructure',
    'Decentralized cloud architecture focusing on extreme data privacy and zero-trust security protocols.',
    'Void Infrastructure was built for a privacy-first product team that wanted a hardened cloud base without the drag of bloated enterprise tooling. They needed clean provisioning, tighter secrets handling, and infrastructure changes that could be reviewed like product code.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDTnDn0TZorH7lLkud9osl5oLFsK8LjLBieXDcO_WrtiMdYJYh0c1Ro8GJ9emIxF2c4FzGBHIpbQKa6CW3G9dA9ljDT-ziOwt7i9MNoI640KBl5vU4FER1TeGGw7PCaWFbdEzc6J7yfpzCglE8jVrSedRcjIORMTn-Y2X5fRZTPp3qUeuZtGZfz8wUx4-5J3s31tPLLwiMAPqIiCWtJAf4-g3r_5O8J1OK92T7EGPMGOsJ_tCgBeVtnWErLkNxoFmfj82EOo8YlYNU',
    'Macro photo of high tech circuit board',
    array['GO', 'DOCKER', 'TERRAFORM'],
    'The team had inconsistent environments, weak access boundaries, and no reliable way to track what changed during infrastructure rollouts.',
    'We introduced Terraform-managed provisioning, containerized workloads, and a zero-trust baseline for internal service access, paired with reviewable pipelines and environment parity.',
    array['Infrastructure changes became predictable and reviewable', 'Security posture improved without slowing delivery', 'Faster recovery during environment drift incidents'],
    '[{"label":"Provisioning Time","value":"15 min"},{"label":"Service Isolation","value":"100%"},{"label":"Drift Detection","value":"Real-time"}]'::jsonb,
    array['Terraform modules', 'Hardened Docker build system', 'Access policy templates', 'Environment parity documentation']
  ),
  (
    'build-003',
    'BUILD_003',
    'SYNAPSE API',
    'Fintech Integration Backbone',
    'Backend Systems',
    'The backbone for next-gen fintech integrations. Sub-millisecond latency for global transactions.',
    'Synapse API unified multiple payment and banking workflows into a single integration layer. The platform needed to support global transaction volume, partner onboarding, and consistent contract enforcement without turning every release into a fire drill.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCXuO_a9N98Eaj28fxw-aJnDbA9zkMkfV_6GAMd-HoCQNhIDjMeRDyMIbAYLxJKnTgH54sgvOf1Hh3zfhXoP0x7UyK9fSpFsfhHtnjN1ngIVMYjaik5pHF1qQSr6b-KNFDdsF9LhzHdscdx6sdS9-yUwU-xNG6BWOQiUI0AvOld7tj_cTdaFEQcLH_9YGMTT4ba17rdw-v_vRWQUWo62Vrvi2A_V1jccjUUn1vFV7HcvIC9blsODgujB917snfd_X2Qq6CuVW4M2T0',
    'Deep blue digital connection web lines',
    array['NODE.JS', 'AWS', 'POSTGRES'],
    'Existing integrations were fragmented, hard to monitor, and slow to extend whenever a new banking partner entered the stack.',
    'We designed a modular API gateway layer, centralized observability, and predictable data contracts that let the team add new transaction rails without rewriting their internal core.',
    array['Shorter onboarding time for partner integrations', 'Better runtime visibility for support and ops teams', 'More stable release cycles on high-volume endpoints'],
    '[{"label":"P95 Latency","value":"0.8 ms"},{"label":"Daily Requests","value":"12M+"},{"label":"Partner Launch Time","value":"-60%"}]'::jsonb,
    array['Gateway architecture', 'Contract versioning strategy', 'Operational alerting', 'Partner integration guides']
  ),
  (
    'build-004',
    'BUILD_004',
    'TITAN UI FRAMEWORK',
    'Industrial Dashboard Design System',
    'Frontend Platform',
    'High-performance design system component library built for rapid deployment of industrial-scale dashboards.',
    'Titan UI Framework gave an enterprise product suite one shared visual language without sacrificing speed. The goal was to unify product teams around reusable primitives, stronger accessibility, and a layout system that still felt aggressive and high signal.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdLxf3L3QYzZJJC7BgWksSm4ROMGSDvdR1ZUIZCBabe6tAlUPa6ZwxwjLRLXMsRRIWR1chBh45w3JRy0hj7PXD66G_rcLmMpaKoZNyLoZyfKgpBkKuIflERtl5Nmft7PgvY8dDFEKUcToFGbZ4b02qc_iNUyNltbtbsFe1J_EOcmREO9_E1tGtyS2kK2CpLomvhJFAOhBcRwVUUqd28W4yF9E4oHTnWi401j1jKY59Jc33ME3FPFhzkMF5uTSoKZndmISwPT4jlQ4',
    '3D technical blueprint layout wireframe',
    array['REACT', 'TYPESCRIPT', 'TAILWIND'],
    'Different product squads were reinventing components, creating visual drift, and shipping dashboards that felt unrelated to one another.',
    'We built a typed React component system, tokenized spacing and typography, and created a rollout kit for product teams to adopt the framework incrementally instead of through a risky rewrite.',
    array['UI consistency across multiple internal products', 'Faster dashboard delivery for new squads', 'Cleaner accessibility baseline for core interactions'],
    '[{"label":"Reusable Components","value":"48"},{"label":"Adoption Teams","value":"7 squads"},{"label":"UI Delivery Speed","value":"+35%"}]'::jsonb,
    array['Component library', 'Design token layer', 'Documentation site', 'Migration starter kit']
  )
on conflict (slug) do nothing;

insert into public.site_settings (
  id,
  site_title,
  site_description,
  whatsapp_number,
  ui_density,
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
  'compact',
  'YUNAKA TECH',
  false,
  false,
  null,
  null
)
on conflict (id) do nothing;
