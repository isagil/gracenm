-- ====================================================================
-- GRACENM CONSULTANTS & CONSTRUCTION COMPANY LTD
-- SUPABASE DATABASE INITIAL SCHEMATION SCRIPT WITH PHOTO ATTACHMENTS
-- ====================================================================
-- This SQL script sets up the full database schemas on your Supabase 
-- PostgreSQL instance. It configures the corresponding tables, types,
-- Row Level Security (RLS), and custom photo-related relationships.
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. EXTENSIONS
-- --------------------------------------------------------------------
-- Ensure UUID generator is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 2. CONTACT SUBMISSIONS
-- --------------------------------------------------------------------
-- Stores entries received from the contact forms (Contact page)
DROP TABLE IF EXISTS public.contact_submissions CASCADE;
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- A. Allow anyone (including anonymous web traffic) to submit contact entries
CREATE POLICY "Allow anonymous submission insertions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- B. Restrict reading/viewing entries to authorized administrative users only
CREATE POLICY "Restrict submissions viewing to admins" 
ON public.contact_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated');


-- --------------------------------------------------------------------
-- 3. PROJECT QUOTE REQUESTS (BRIEFS)
-- --------------------------------------------------------------------
-- Stores engineering briefs and detailed cost estimates requests (Quote page)
DROP TABLE IF EXISTS public.quote_requests CASCADE;
CREATE TABLE public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    service VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    budget VARCHAR(100) NOT NULL,
    timeline VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- A. Allow prospective clients/investors to submit project briefs
CREATE POLICY "Allow public brief submissions" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- B. Only authenticated engineers/admins can review financial bid requests
CREATE POLICY "Restrict brief reading to authenticated staff" 
ON public.quote_requests 
FOR SELECT 
USING (auth.role() = 'authenticated');


-- --------------------------------------------------------------------
-- 4. DYNAMIC PROJECT PORTFOLIOS
-- --------------------------------------------------------------------
-- To transition the client-side projects state into a dynamic database
DROP TABLE IF EXISTS public.projects CASCADE;
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- "Building Construction", "Architecture", etc.
    location VARCHAR(255) NOT NULL,
    year VARCHAR(10) NOT NULL,
    image_url TEXT NOT NULL, -- The main hero / thumbnail photo of the project
    description TEXT NOT NULL,
    stats JSONB DEFAULT '{}'::jsonb, -- Area, floors, status
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- A. Highly public: Anyone can view delivered projects on the web
CREATE POLICY "Allow public read access to projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- B. Fully write-protected: Only authenticated back-office administrators can write/update/delete
CREATE POLICY "Restrict project editing to authenticated staff" 
ON public.projects 
FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');


-- --------------------------------------------------------------------
-- 5. THE PHOTOS & GALLERY TABLE (One-to-Many with Projects)
-- --------------------------------------------------------------------
-- This table handles extra project photos, making a detail gallery possible
DROP TABLE IF EXISTS public.project_photos CASCADE;
CREATE TABLE public.project_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,          -- Path to CDN / storage bucket
    caption VARCHAR(255),             -- Optional photo description
    display_order INT DEFAULT 0,      -- For controlling slider order
    is_hero_alternate BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for project photos
ALTER TABLE public.project_photos ENABLE ROW LEVEL SECURITY;

-- Policies for project photos
CREATE POLICY "Allow public read access to project photos"
ON public.project_photos
FOR SELECT
USING (true);

CREATE POLICY "Restrict photo uploading/editing to authenticated staff"
ON public.project_photos
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');


-- --------------------------------------------------------------------
-- 6. GENERAL GALLERY / SITE MEDIA TABLE
-- --------------------------------------------------------------------
-- For storing generic images like site inspection snapshots, drone shots,
-- machinery equipment, and social/team building captures.
DROP TABLE IF EXISTS public.gallery CASCADE;
CREATE TABLE public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    photo_url TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General', -- e.g. 'Site Inspection', 'Team', 'Drone Shot'
    captured_by VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for general gallery
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Policies for general gallery
CREATE POLICY "Allow public read access to general gallery"
ON public.gallery
FOR SELECT
USING (true);

CREATE POLICY "Restrict general gallery editing to authenticated staff"
ON public.gallery
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');


-- --------------------------------------------------------------------
-- 7. SEED INITIAL DATA INSERTION
-- --------------------------------------------------------------------

-- A. Insert Projects
INSERT INTO public.projects (id, title, category, location, year, image_url, description, stats) VALUES
(
    'a3be8eb9-3610-4f5d-9c3f-ee72b2ff5001',
    'The Oasis Residencies', 
    'Building Construction', 
    'Kampala, Uganda', 
    '2024', 
    '/src/assets/images/modern_building_uganda_1779222673896.png', 
    'A luxury multi-unit residential development featuring sustainable materials and smart home systems.', 
    '{"area": "8,500 sqm", "units": "32", "status": "Completed"}'::jsonb
),
(
    'b4ce9eb9-3610-4f5d-9c3f-ee72b2ff5002',
    'Apex Business Hub', 
    'Architecture', 
    'Entebbe, Uganda', 
    '2023', 
    '/src/assets/images/architectural_render_3d_1779222706847.png', 
    'Futuristic office complex design with parametric facade and energy-efficient climate control.', 
    '{"area": "15,000 sqm", "floors": "10", "status": "Design Phase"}'::jsonb
),
(
    'c5de0eb9-3610-4f5d-9c3f-ee72b2ff5003',
    'Victoria Industrial Site', 
    'Engineering', 
    'Jinja, Uganda', 
    '2022', 
    '/src/assets/images/construction_site_hero_1779222656099.png', 
    'Complex structural engineering for an industrial facility with heavy-load requirements and modern site logistics.', 
    '{"capacity": "500 Tonnes", "lifespan": "100+ Years", "status": "Completed"}'::jsonb
);

-- B. Insert Project Photos (Connecting extra images to above seed projects)
INSERT INTO public.project_photos (project_id, photo_url, caption, display_order) VALUES
-- Photos for The Oasis Residencies
('a3be8eb9-3610-4f5d-9c3f-ee72b2ff5001', '/src/assets/images/modern_corporate_interior_1779226296836.png', 'Finished high-end corporate lobby & reception desk', 1),
('a3be8eb9-3610-4f5d-9c3f-ee72b2ff5001', '/src/assets/images/blueprint_draft_table_1779226245180.png', 'Site structural layout drafts and structural metrics', 2),

-- Photos for Apex Business Hub
('b4ce9eb9-3610-4f5d-9c3f-ee72b2ff5002', '/src/assets/images/construction_crane_skyline_1779226263430.png', 'Foundation staging work and steel reinforcement structures', 1),

-- Photos for Victoria Industrial Site
('c5de0eb9-3610-4f5d-9c3f-ee72b2ff5003', '/src/assets/images/blueprint_draft_table_1779226245180.png', 'Civil drafts and soil testing logs', 1);


-- C. Insert General Gallery Photos
INSERT INTO public.gallery (title, photo_url, category, captured_by) VALUES
('Kampala Skyline Crane Operation', '/src/assets/images/construction_crane_skyline_1779226263430.png', 'Drone Shot', 'Eng. Alvin'),
('Corporate Office Interior Final Inspection', '/src/assets/images/modern_corporate_interior_1779226296836.png', 'Interior', 'Eng. John'),
('Engineering Design Workshop Desk', '/src/assets/images/blueprint_draft_table_1779226245180.png', 'Site Office', 'Arch. Grace');


-- --------------------------------------------------------------------
-- 8. LEADERSHIP & TEAM MEMBERS
-- --------------------------------------------------------------------
-- Stores team members details and high-resolution picture links
DROP TABLE IF EXISTS public.team_members CASCADE;
CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(150) NOT NULL,                  -- 'Managing Director', 'Technical Director', etc.
    image_url TEXT NOT NULL,                     -- URL or placeholder path to the executive picture file
    description TEXT NOT NULL,                   -- Professional bio/credentials
    display_order INT DEFAULT 0,                 -- Sort index (e.g. 1 for MD, 2 for Tech Director...)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for team members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Policies for team members
CREATE POLICY "Allow public read access to team members"
ON public.team_members
FOR SELECT
USING (true);

CREATE POLICY "Restrict team member editing to authenticated staff"
ON public.team_members
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');


-- D. Insert Leadership Profiles
INSERT INTO public.team_members (name, role, image_url, description, display_order) VALUES
(
    'Miruts Tesfaye Gebrekidan', 
    'Managing Director', 
    '/src/assets/images/miruts_gebrekidan_1781614046333.jpg',
    'Exemplary leader steering the firm with strong governance, strategic foresight, and over 15 years of industry excellence.',
    1
),
(
    'Tsega Tadesse Hagos', 
    'Technical Director', 
    '/src/assets/images/tsega_hagos_1781614065993.jpg',
    'Meticulous engineering authority directing complex project designs, feasibility evaluations, and BIM twin integration.',
    2
),
(
    'Musika Johnson', 
    'Chief Operations Officer', 
    '/src/assets/images/musika_johnson_1781614085015.jpg',
    'Operations mastermind driving strict project timelines, resource optimization, and premium workmanship qualities on site.',
    3
);


-- --------------------------------------------------------------------
-- 9. DYNAMIC SITE SETTINGS / CUSTOMIZATION
-- --------------------------------------------------------------------
-- Stores global system visual layouts, logo text, branding and custom-uploaded pictures
DROP TABLE IF EXISTS public.site_settings CASCADE;
CREATE TABLE public.site_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'primary_settings',
    config JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to the dynamic settings
CREATE POLICY "Allow public read access to settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Allow public update to settings so that changes from the live customizer write directly
CREATE POLICY "Allow public updates to settings" 
ON public.site_settings 
FOR ALL
USING (true)
WITH CHECK (true);


-- ====================================================================
-- SUCCESSFUL COMPLETION
-- ====================================================================
