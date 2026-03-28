-- 1. Appointments Table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  is_for_self BOOLEAN DEFAULT true,
  other_person_name TEXT,
  date_option TEXT NOT NULL, -- 'soonest', 'specific', 'range'
  date TEXT,
  date_range_start TEXT,
  date_range_end TEXT,
  time_option TEXT NOT NULL, -- 'soonest', 'specific', 'range'
  time TEXT,
  time_range_start TEXT,
  time_range_end TEXT,
  duration INTEGER NOT NULL,
  total_price NUMERIC NOT NULL DEFAULT 0,
  services TEXT[] NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'alternative_offered'
  alternative_date TEXT,
  alternative_time TEXT,
  notes TEXT,
  image_urls TEXT[],
  consent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Services Table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Business Hours Table
CREATE TABLE business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day TEXT NOT NULL,
  open_time TEXT NOT NULL,
  close_time TEXT NOT NULL,
  is_closed BOOLEAN DEFAULT false
);

-- 4. Salon Events Table
CREATE TABLE salon_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  registration_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Event Registrations Table
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES salon_events(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Gallery Images Table
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE salon_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public Policies (Allowing everyone to read and insert as needed for the salon)
CREATE POLICY "Public Read Access" ON services FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON business_hours FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON salon_events FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON gallery_images FOR SELECT USING (true);

CREATE POLICY "Public Insert Access" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Access" ON appointments FOR SELECT USING (true);
CREATE POLICY "Public Update Access" ON appointments FOR UPDATE USING (true);

CREATE POLICY "Public Insert Access" ON event_registrations FOR INSERT WITH CHECK (true);
