-- Insert a sample port
INSERT INTO ports (name, location, description, contact_email)
VALUES 
  ('Port of Haapsalu', 'Haapsalu, Läänemaa', 'A beautiful and historic port in western Estonia.', 'info@haapsaluport.ee'),
  ('Old City Harbour', 'Tallinn', 'The biggest passenger harbour in Estonia.', 'tallinn@port.ee');

-- Insert some sample berths for Port of Haapsalu
INSERT INTO berths (port_id, name, max_length_m, max_draft_m, price_per_night, amenities, status)
SELECT 
  id, 'Berth A1', 12.5, 3.0, 35.00, ARRAY['power', 'water', 'wifi'], 'available'
FROM ports WHERE name = 'Port of Haapsalu';

INSERT INTO berths (port_id, name, max_length_m, max_draft_m, price_per_night, amenities, status)
SELECT 
  id, 'Berth A2', 15.0, 4.0, 50.00, ARRAY['power', 'water'], 'occupied'
FROM ports WHERE name = 'Port of Haapsalu';

INSERT INTO berths (port_id, name, max_length_m, max_draft_m, price_per_night, amenities, status)
SELECT 
  id, 'Berth B1 - Deep', 24.0, 6.5, 120.00, ARRAY['power', 'water', 'wifi', 'pump-out'], 'available'
FROM ports WHERE name = 'Old City Harbour';

-- Insert dummy agent settings for those ports
INSERT INTO agent_settings (port_id, system_prompt, mode, language_hint)
SELECT 
  id, 
  'You are the harbour assistant for Port of Haapsalu. Be friendly but exact. Maximum stay is 14 days without prior arrangement. Speed limit is 3 knots.', 
  'full_booking', 
  'auto'
FROM ports WHERE name = 'Port of Haapsalu';
