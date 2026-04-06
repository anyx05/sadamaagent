-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PORTS ───────────────────────────────────────────────────────
create table ports (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  location      text not null,           -- e.g. "Haapsalu, Läänemaa"
  description   text,
  contact_email text not null,
  owner_id      uuid references auth.users(id) on delete cascade,
  created_at    timestamptz default now()
);

-- ─── BERTHS ──────────────────────────────────────────────────────
create table berths (
  id              uuid primary key default uuid_generate_v4(),
  port_id         uuid references ports(id) on delete cascade,
  name            text not null,           -- e.g. "Berth A3"
  max_length_m    numeric(5,1) not null,   -- vessel length constraint
  max_draft_m     numeric(4,2) not null,   -- vessel draft constraint
  max_beam_m      numeric(5,1),            -- optional beam constraint
  price_per_night numeric(10,2) not null,
  amenities       text[],                  -- ['power', 'water', 'wifi']
  status          text default 'available' check (status in ('available','occupied','maintenance')),
  is_active       boolean default true,
  created_at      timestamptz default now()
);

-- ─── BOOKINGS ────────────────────────────────────────────────────
create table bookings (
  id               uuid primary key default uuid_generate_v4(),
  berth_id         uuid references berths(id) on delete restrict,
  customer_name    text not null,
  customer_email   text not null,
  vessel_name      text not null,
  vessel_length_m  numeric(5,1) not null,
  vessel_draft_m   numeric(4,2),
  arrival_date     date not null,
  departure_date   date not null,
  status           text default 'confirmed'   -- confirmed | cancelled
                   check (status in ('confirmed','cancelled','pending')),
  total_price      numeric(10,2),
  notes            text,
  created_at       timestamptz default now(),
  -- Prevent arrival >= departure
  constraint valid_dates check (departure_date > arrival_date)
);

-- ─── AGENT SETTINGS ──────────────────────────────────────────────
create table agent_settings (
  id            uuid primary key default uuid_generate_v4(),
  port_id       uuid references ports(id) on delete cascade unique,
  system_prompt text not null,
  mode          text default 'full_booking'
                check (mode in ('info_only', 'full_booking')),
  language_hint text default 'auto',  -- 'auto' | 'en' | 'et' | 'ru'
  updated_at    timestamptz default now()
);

-- ─── CHAT HISTORY (audit) ─────────────────────────────────────────
create table chat_history (
  id          uuid primary key default uuid_generate_v4(),
  session_id  text not null,
  port_id     uuid references ports(id) on delete cascade,
  role        text not null check (role in ('user','assistant','tool')),
  content     text not null,
  tool_name   text,    -- populated when role = 'tool'
  created_at  timestamptz default now()
);

-- ─── INDEXES ─────────────────────────────────────────────────────
create index on bookings (berth_id, arrival_date, departure_date);
create index on bookings (status);
create index on chat_history (session_id);
create index on berths (port_id, is_active);

-- ─── DOUBLE-BOOKING PREVENTION ───────────────────────────────────
create or replace function check_berth_availability(
  p_port_id       uuid,
  p_arrival       date,
  p_departure     date,
  p_vessel_length numeric default 0,
  p_vessel_draft  numeric default 0
)
returns table (
  berth_id      uuid,
  berth_name    text,
  max_length_m  numeric,
  max_draft_m   numeric,
  price_per_night numeric,
  amenities     text[]
) as $$
begin
  return query
  select
    b.id,
    b.name,
    b.max_length_m,
    b.max_draft_m,
    b.price_per_night,
    b.amenities
  from berths b
  where
    b.port_id    = p_port_id
    and b.is_active = true
    and b.max_length_m >= p_vessel_length
    and b.max_draft_m  >= p_vessel_draft
    and not exists (
      select 1 from bookings bk
      where
        bk.berth_id = b.id
        and bk.status != 'cancelled'
        and not (bk.departure_date <= p_arrival or bk.arrival_date >= p_departure)
    );
end;
$$ language plpgsql stable;

-- RLS Policies omitted for brevity in spec but will be applied on DB init
