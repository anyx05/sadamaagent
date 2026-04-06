-- SadamaAgent - Professional Grade Row Level Security Base

-- Enable RLS on all highly sensitive tables
ALTER TABLE ports ENABLE ROW LEVEL SECURITY;
ALTER TABLE berths ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- 1. PORTS RLS
-- Anyone can view ports (required for public landing page)
CREATE POLICY "Ports are completely viewable by public" 
ON ports FOR SELECT USING (true);

-- Only authenticated users who own the port can update it
CREATE POLICY "Port owners can update their ports" 
ON ports FOR UPDATE USING (auth.uid() = owner_id);

-- Only authenticated users who own the port can delete it
CREATE POLICY "Port owners can delete their ports" 
ON ports FOR DELETE USING (auth.uid() = owner_id);

-- 2. BERTHS RLS
-- Public can view active berths
CREATE POLICY "Berths are viewable by public" 
ON berths FOR SELECT USING (is_active = true);

-- Port owners can do full CRUD on their berths
CREATE POLICY "Port owners can manage their berths" 
ON berths FOR ALL USING (
  EXISTS (
    SELECT 1 FROM ports 
    WHERE ports.id = berths.port_id AND ports.owner_id = auth.uid()
  )
);

-- 3. BOOKINGS RLS
-- Bookings are private. They shouldn't be publicly visible.
-- Port owners can view bookings for their berths.
CREATE POLICY "Port owners can view internal bookings" 
ON bookings FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM berths 
    JOIN ports ON ports.id = berths.port_id 
    WHERE berths.id = bookings.berth_id AND ports.owner_id = auth.uid()
  )
);

-- The service_role key (Edge Function AI) can insert bookings bypassing RLS, 
-- but if we want direct table inserts from UI later:
CREATE POLICY "Service Role can insert bookings" 
ON bookings FOR INSERT WITH CHECK (true); 

-- 4. AGENT SETTINGS RLS
-- Settings are strictly available only to owners and the AI service role
CREATE POLICY "Port owners can manage agent settings" 
ON agent_settings FOR ALL USING (
  EXISTS (
    SELECT 1 FROM ports 
    WHERE ports.id = agent_settings.port_id AND ports.owner_id = auth.uid()
  )
);

-- 5. CHAT HISTORY
-- Internal audit logging, strictly private to operators
CREATE POLICY "Port operators can read chat history" 
ON chat_history FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM ports 
    WHERE ports.id = chat_history.port_id AND ports.owner_id = auth.uid()
  )
);
