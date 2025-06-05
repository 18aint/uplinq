-- Sample data for testing the client portal
-- Run this after setting up the main database schema

-- Sample project for testing (you'll need to replace client_id with actual user ID after signup)
-- This is just a template - you'll need to update the client_id after a user signs up

INSERT INTO public.projects (
    name,
    description,
    status,
    progress,
    start_date,
    due_date,
    live_url,
    staging_url,
    client_id,
    priority,
    budget,
    spent
) VALUES (
    'E-commerce Website Redesign',
    'Complete redesign of the company e-commerce platform with modern UI/UX, improved performance, and mobile optimization.',
    'development',
    65,
    '2024-01-15T09:00:00.000Z',
    '2024-03-15T17:00:00.000Z',
    'https://demo-store.uplinq.digital',
    'https://staging-demo-store.uplinq.digital',
    'user-id-here', -- Replace with actual user ID after signup
    'high',
    15000.00,
    9750.00
);

-- Sample project phases (you'll need to update project_id after creating the project)
INSERT INTO public.project_phases (
    project_id,
    name,
    description,
    status,
    progress,
    start_date,
    due_date,
    deliverables
) VALUES 
(
    'project-id-here', -- Replace with actual project ID
    'Discovery & Planning',
    'Initial project planning, requirements gathering, and technical specifications.',
    'completed',
    100,
    '2024-01-15T09:00:00.000Z',
    '2024-01-22T17:00:00.000Z',
    ARRAY['Project brief', 'Technical requirements', 'Timeline', 'Wireframes']
),
(
    'project-id-here', -- Replace with actual project ID
    'Design Phase',
    'UI/UX design, mockups, and design system creation.',
    'completed',
    100,
    '2024-01-23T09:00:00.000Z',
    '2024-02-05T17:00:00.000Z',
    ARRAY['Design mockups', 'Design system', 'User flow diagrams', 'Prototype']
),
(
    'project-id-here', -- Replace with actual project ID
    'Development',
    'Frontend and backend development, API integration, and feature implementation.',
    'active',
    70,
    '2024-02-06T09:00:00.000Z',
    '2024-03-01T17:00:00.000Z',
    ARRAY['Frontend development', 'Backend API', 'Payment integration', 'Admin panel']
),
(
    'project-id-here', -- Replace with actual project ID
    'Testing & Launch',
    'Quality assurance testing, bug fixes, and website launch.',
    'pending',
    0,
    '2024-03-02T09:00:00.000Z',
    '2024-03-15T17:00:00.000Z',
    ARRAY['QA testing', 'Bug fixes', 'Performance optimization', 'Go-live']
);

-- Sample comments (you'll need to update project_id and author_id)
INSERT INTO public.comments (
    project_id,
    author_id,
    author_name,
    author_role,
    content,
    type
) VALUES 
(
    'project-id-here', -- Replace with actual project ID
    'user-id-here', -- Replace with actual user ID
    'Client Name',
    'client',
    'The design looks fantastic! I love the modern approach. Could we possibly adjust the color scheme to match our brand guidelines a bit more closely?',
    'comment'
),
(
    'project-id-here', -- Replace with actual project ID
    'developer-id-here', -- Replace with actual developer ID
    'Wayne (Developer)',
    'developer',
    'Absolutely! I''ll prepare a few color scheme variations that align with your brand. I''ll have those ready for review by tomorrow.',
    'comment'
);

-- Sample messages (you'll need to update project_id and sender_id)
INSERT INTO public.messages (
    project_id,
    sender_id,
    sender_name,
    subject,
    content,
    category,
    priority
) VALUES 
(
    'project-id-here', -- Replace with actual project ID
    'developer-id-here', -- Replace with actual developer ID
    'Wayne (Developer)',
    'Development Progress Update - Week 3',
    'Great progress this week! We''ve completed the product catalog functionality and started working on the shopping cart integration. The staging site is updated with the latest changes. Please review when you have a chance.',
    'updates',
    'normal'
),
(
    'project-id-here', -- Replace with actual project ID
    'developer-id-here', -- Replace with actual developer ID
    'Wayne (Developer)',
    'Ready for Design Review',
    'The homepage design is now ready for your review on the staging site. All the feedback from our last meeting has been incorporated. Looking forward to your thoughts!',
    'milestones',
    'high'
);

-- Sample meeting (you'll need to update project_id and created_by)
INSERT INTO public.meetings (
    project_id,
    title,
    description,
    meeting_type,
    start_time,
    duration_minutes,
    meeting_url,
    status,
    created_by
) VALUES 
(
    'project-id-here', -- Replace with actual project ID
    'Mid-Project Review & Feedback Session',
    'Review current progress, discuss any adjustments needed, and plan the final phase of development.',
    'project_review',
    '2024-02-20T14:00:00.000Z',
    60,
    'https://meet.google.com/abc-defg-hij',
    'scheduled',
    'developer-id-here' -- Replace with actual developer ID
);

-- Note: To use this sample data:
-- 1. First sign up a user through the app
-- 2. Get the user ID from the profiles table
-- 3. Create a project and get the project ID
-- 4. Replace the placeholder IDs in this script
-- 5. Run the updated script in Supabase SQL Editor 