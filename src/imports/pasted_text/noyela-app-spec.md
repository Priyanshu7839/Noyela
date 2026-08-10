NOYELA — COMPLETE MOBILE APP
MASTER FIGMA MAKE PROMPT

Build the complete mobile-responsive NOYELA application from the six uploaded reference screens.

NOYELA is “Your Personalized Aesthetic Intelligence” — an agentic AI application that understands a user’s aesthetic goals, analyzes their face/skin/hair where appropriate, creates a personalized transformation plan, recommends routines/products/treatments, tracks progress, adapts recommendations over time, and connects the user with appropriate aesthetic professionals when needed.

IMPORTANT:
This is NOT a collection of static screens.

Build this as one coherent, interconnected, production-quality mobile application with reusable components, consistent navigation, realistic interactions, working state changes, drawers, modals, tabs, forms, chat interactions and connected user flows.

The primary target is a mobile-responsive web application designed for an iPhone Pro Max-sized viewport.

Use React + Tailwind CSS.

==================================================
1. THE SIX UPLOADED IMAGES ARE THE SOURCE OF TRUTH
==================================================

I have uploaded six existing NOYELA screens.

DO NOT treat them merely as inspiration.

They are the canonical visual design language of the product.

Analyze them before generating anything else.

Derive from them:

• typography hierarchy
• font pairing
• spacing
• margins
• card construction
• border radii
• shadows
• purple accent
• background treatment
• image treatment
• icon language
• button construction
• tabs
• inputs
• navigation
• information density
• product cards
• score/result cards
• AI insight treatment
• overall premium aesthetic

Every additional screen must look like it was created by the SAME DESIGN TEAM inside the SAME DESIGN SYSTEM.

Do not gradually change the visual language as more screens are created.

Do not introduce generic SaaS UI.

Do not introduce arbitrary gradients.

Do not make later screens more purple.

Do not make the interface overly feminine.

Do not turn NOYELA into a medical dashboard.

Do not turn NOYELA into an e-commerce marketplace.

Do not turn NOYELA into a static analytics/reporting application.

REFERENCE RESPONSIBILITIES:

REFERENCE 1 — LOGIN
Use as the source of truth for:
authentication,
minimal layouts,
typography,
inputs,
buttons,
spacing,
background treatment.

REFERENCE 2 — HOME
Use as the source of truth for:
primary application shell,
header,
hamburger,
personalized content,
hero treatment,
cards,
navigation,
Ask Noyela entry point.

REFERENCE 3 — FACE SCAN
Use as the source of truth for:
camera flows,
assessments,
guided interactions,
capture states,
instructional interfaces.

REFERENCE 4 — SCAN RESULT
Use as the source of truth for:
analysis results,
scores,
AI explanations,
result hierarchy,
progress visualization.

REFERENCE 5 — SKIN RECOMMENDATION
Use as the source of truth for:
agent-generated recommendations,
personalized plans,
routines,
next actions.

REFERENCE 6 — PRODUCT / CATEGORY SCREEN
Use as the source of truth for:
Skin/Hair/etc. module navigation,
products,
recommendation cards,
category selection,
product comparison,
pricing tiers.

==================================================
2. PRODUCT PHILOSOPHY
==================================================

NOYELA is NOT primarily an analysis application.

Analysis is an INPUT.

TRANSFORMATION is the product.

The fundamental user journey is:

ASSESS
↓
UNDERSTAND
↓
PLAN
↓
EXECUTE
↓
TRACK
↓
ADAPT

Every important screen should answer:

“What should I do next?”

Do not force users to study complicated reports.

The default experience should surface:

1. where the user is
2. what matters
3. what Noyela recommends
4. what the user should do next
5. whether it is working

Advanced analysis can exist behind:
“View Full Analysis”
or contextual drill-down.

NOYELA should progressively reveal information rather than displaying everything simultaneously.

==================================================
3. VISUAL IDENTITY
==================================================

Maintain the uploaded references.

Overall aesthetic:

premium
calm
intelligent
editorial
luxurious
minimal
gender-neutral
modern
American consumer product

Primary background:
pearl white / warm ivory.

Purple:
use as an accent only.

Use purple for:
primary CTA,
active states,
selected controls,
progress,
AI intelligence,
subtle highlights,
Noyela Orb.

DO NOT cover entire screens in lavender/purple.

Typography:
use the same visual typography system inferred from the references.

Use an elegant editorial serif where the references use one.

Use a clean modern sans-serif for:
UI,
body copy,
labels,
buttons,
navigation.

Use generous whitespace.

Avoid excessive borders.

Use soft shadows.

Use premium photography.

==================================================
4. REAL PEOPLE + SCULPTURE
==================================================

NOYELA has two visual worlds.

REAL PEOPLE:
used inside the actual product for:
personalization,
skin,
hair,
jawline,
progress,
doctors,
treatments,
results.

MARBLE / SCULPTURAL:
used selectively for:
onboarding,
brand moments,
transformation journey,
abstract intelligence,
special hero moments.

Do not make the entire application marble.

Users need to see real people.

Support both male and female users.

The UI and imagery should adapt appropriately to the user's profile.

Use diverse American users.

==================================================
5. NOYELA ORB
==================================================

The NOYELA Orb represents the AI.

It should feel:

pearl-like,
platinum,
softly illuminated,
slightly translucent,
intelligent,
premium,
alive.

Not:
cartoonish,
robotic,
cute,
childish.

Use the Orb for:

Ask Noyela
AI thinking
AI listening
AI recommendations
loading
agent actions
voice mode

The Orb may have subtle breathing/glowing animation.

==================================================
6. GLOBAL MOBILE SHELL
==================================================

Primary target:
iPhone Pro Max-sized mobile viewport.

Approximately 390–440px wide.

Use mobile-first responsive layout.

Allow natural vertical scrolling.

Do not shrink desktop dashboards into mobile screens.

GLOBAL HEADER:

Left:
hamburger

Center:
NOYELA

Right:
notification
profile/avatar where appropriate

Do NOT show every possible navigation layer simultaneously.

Avoid:
global tabs
+ module tabs
+ subtabs
+ filters
all appearing together.

Maximum visible navigation hierarchy should normally be TWO levels.

==================================================
7. HAMBURGER DRAWER
==================================================

Hamburger opens a clean full-height left drawer.

Include:

Home
My Profile
My Journey
Overall Roadmap
My Assessments
Progress
Progress Photos
Saved Products
My Routines
Doctors & Consultations
Reports
Documents
Connected Devices
Notifications
Subscription
Privacy & Data
Settings
Help & Support
Sign Out

Keep the drawer clean and hierarchical.

==================================================
8. HOME
==================================================

Home is the user’s personalized control center.

It is NOT the entire application.

Show:

personalized greeting

gender/profile-appropriate hero

Noyela Orb where appropriate

Ask Noyela entry

quick actions

Today with Noyela

current priority

roadmap status

recent activity

Do not overcrowd.

Quick actions can include:

Understand My Face
Skin Insights
Hair Health
Build My Plan
Track My Progress

The Home screen should immediately communicate:

Noyela knows me.
Noyela remembers me.
Noyela knows what I should do next.

==================================================
9. ASK NOYELA
==================================================

This screen must be EXTREMELY SIMPLE.

Think conversational AI simplicity.

Do NOT make it a dashboard.

Initial state:

large Noyela Orb

“Good morning, [Name].”

“How can I help you today?”

Maximum four contextual suggestions:

Review today’s roadmap
Analyze my skin
Ask about my hair
Check my progress

Bottom input:

Ask Noyela...

plus button
microphone

When conversation begins:

Orb becomes smaller.

Conversation becomes the primary interface.

PLUS BUTTON opens bottom sheet:

Take Photo
Upload Photo
Upload Report
Voice Note
Scan Product
Import Health Data

Noyela chat must understand context from the entire app.

Example:

User:
“Should I change my moisturizer?”

Noyela already knows:
their skin assessment,
existing products,
routine,
progress,
sensitivities,
budget.

==================================================
10. ONBOARDING / AUTH
==================================================

Create:

Splash
Onboarding 1
Onboarding 2
Onboarding 3
Sign In
Sign Up
Basic personalization

Onboarding should establish:

Noyela understands you.

Every face is different.

Your plan should be too.

Use premium marble/sculptural imagery based on the established references.

==================================================
11. FACE ASSESSMENT
==================================================

Flow:

Understand My Face
↓
Capture
↓
Processing
↓
Harmony Overview
↓
Top Opportunities
↓
Personalized Plan

Camera assessment should be realistic.

Capture:

Front
Left profile
Right profile

Optional:
short head-rotation video.

Do NOT pretend an iPhone camera can accurately measure skeletal anatomy to clinical precision.

Do not ask users to use rulers or Vernier calipers.

Explain that:

Noyela uses visual AI assessment.

Professional imaging may be needed for precise anatomical measurements.

==================================================
12. HARMONY / FACE RESULTS
==================================================

Do not create an endless report.

Primary result:

Harmony Score

Short AI interpretation

Top 3 improvement opportunities

Estimated improvement potential

CTA:
Build My Transformation Plan

Examples:

Improve skin texture
Improve hair density
Increase jaw definition

Advanced metrics live behind:
View Full Analysis

==================================================
13. TRANSFORMATION PLAN
==================================================

The transformation plan connects the entire product.

Main categories:

Skin
Hair
Jawline
Sleep
Nutrition

Each category should be revisitable.

Noyela remembers progress and updates recommendations.

Do not make the user rebuild plans repeatedly.

==================================================
14. SKIN
==================================================

Create:

Skin Overview
Skin Products
Morning Routine
Afternoon Routine
Night Routine
Skin Progress

SKIN OVERVIEW:

goal
current status
one important insight
next action

Avoid overwhelming analysis.

PRODUCTS:

Group products by functional need.

Examples:

Cleanser
Treatment Serum
Moisturizer
Sunscreen
Optional Treatment

For each required product category provide THREE alternatives:

Premium
Best Value
Budget

Products should have comparable functional purpose / active requirements.

This prevents Noyela from appearing biased toward one brand.

Noyela may select:

“Noyela’s Pick”

Explain why.

Include:

I already own this

If user owns a suitable product:

“Your current moisturizer already fits this step. There’s no need to buy another.”

This behavior is important.

MORNING:

ordered routine.

AFTERNOON:

only necessary actions such as SPF reapplication or hydration.

NIGHT:

ordered nighttime routine.

PROGRESS:

photo comparison
texture
hydration
radiance
consistency
AI insight

==================================================
15. HAIR
==================================================

Create:

Hair Overview
Hair Products
Hair Morning
Hair Night
Professional Treatments
At-Home Devices
Hair Progress

OVERVIEW:

hair health
density
hairline
shedding
scalp health

Keep it outcome-focused.

PRODUCTS:

same Premium / Best Value / Budget philosophy where relevant.

PROFESSIONAL:

PRP
microneedling
appropriate clinician-led procedures
other relevant professional treatments

AT-HOME DEVICES:

LLLT / LED cap
laser comb
scalp devices
appropriate consumer devices

Professional procedures and at-home devices must be clearly differentiated.

PROGRESS:

photos
density trend
shedding
scalp
milestones

==================================================
16. JAWLINE
==================================================

Correct sequence:

Assessment
↓
Overview
↓
Plan
↓
Treatments
↓
Exercises
↓
Progress

JAWLINE PLAN:

Do NOT build a huge report.

Show:

goal
current status
Noyela’s recommendation
today’s tasks
small progress indicator

Links:

Exercises
Treatments
Progress

TREATMENTS:

Tabs:

Recommended
Non-invasive
Clinical
Surgical

Recommended is DEFAULT.

Do not show “All” by default.

Treatment cards show:

name
Noyela Match
why recommended
expected result
invasiveness
downtime where applicable
professional required
timeline

Use match language:

Excellent Match
Possible Option
Not Recommended

EXERCISES:

short guided routine.

PROGRESS:

before/after
score trend
milestones

==================================================
17. SLEEP
==================================================

Sleep supports aesthetic outcomes.

Do not turn Noyela into a dedicated sleep tracker.

Create a simple Sleep Overview.

Show:

Sleep Score
Last Night
Total Sleep
Deep Sleep
Awake Time
Recommended Bedtime
one Noyela insight

Allow optional:

Connect Apple Health / wearable

Potential subviews:

Overview
Routine
Insights
Progress

Keep them minimal.

==================================================
18. NUTRITION
==================================================

Nutrition exists to support:

skin
hair
recovery
body composition
overall aesthetic outcomes.

Do NOT build MyFitnessPal.

Focus on:

Protein
Hydration
Skin Supplements
Hair Supplements
Overall Health Supplements

Create:

Nutrition Overview
Supplements

Supplement tabs:

Skin
Hair
Overall

Show:

supplement
purpose
dose
timing
why Noyela recommends

Use appropriate caution where professional guidance is needed.

==================================================
19. OVERALL ROADMAP
==================================================

The Overall Roadmap sits ABOVE individual modules.

Therefore:

DO NOT show Skin/Hair/Jawline/Sleep/Nutrition navigation across the top of the roadmap.

Only use:

Today
Journey
Timeline

TODAY:

transformation hero
today’s 3–5 highest-impact actions
overall progress
next milestone
Noyela insight

JOURNEY:

show phases such as:

Foundation
Elevate
Refine
Master

Show current phase.

Show major milestones.

TIMELINE:

chronological transformation history:

completed
current
upcoming

Keep filters minimal.

==================================================
20. PROGRESS HUB
==================================================

Create one overall Progress screen.

First viewport:

overall transformation progress

Harmony evolution

before/after

current milestone

Then drill down into:

Skin
Hair
Jawline
Sleep
Nutrition

Do not display every chart simultaneously.

==================================================
21. DOCTOR DISCOVERY
==================================================

Doctor Discovery should feel like AI MATCHING.

Not Yelp.

Heading:

Doctors Recommended for You

Explain:

Noyela selected these doctors based on your goals, roadmap, treatment needs and location.

Doctor card:

photo
name
verified status
specialty
location
rating
experience
Noyela Match %
relevant expertise
why recommended

Actions:

View Profile
Save

==================================================
22. DOCTOR PROFILE
==================================================

Create:

doctor portrait
name
verified status
specialty
AI Match
why Noyela recommends
experience
qualifications
location
specialties
procedures
before & after
reviews
consultation price

Persistent:

Book Consultation

==================================================
23. TREATMENT DETAIL
==================================================

Example:

Jawline Filler

Show:

hero
Noyela Match

procedure time
downtime
pain
longevity
risk
estimated price

Then:

What it does
Who it may suit
Before/After
Noyela personalized insight
Recommended doctors

CTA:

Book Consultation

==================================================
24. BOOKING FLOW
==================================================

Create connected booking:

Doctor
↓
Clinic / Location
↓
Date
↓
Time
↓
Consultation Type
↓
Details
↓
Review
↓
Confirmation

Allow:

In-person
Virtual

Optional:
upload photos.

Keep booking extremely clean.

==================================================
25. BOOKING CONFIRMATION
==================================================

Show:

Confirmed

Doctor
Clinic
Date
Time
Consultation Type

Actions:

Add to Calendar
Prepare for Appointment
Upload Documents
Message Clinic

==================================================
26. NOTIFICATIONS
==================================================

Create contextual notifications.

Examples:

Morning routine due
SPF reminder
Take progress photo
Hair treatment tonight
Sleep target
Doctor appointment
Noyela updated your roadmap

==================================================
27. PROFILE / ACCOUNT
==================================================

Create:

Profile
Goals
Assessment History
Treatment History
Products
Supplements
Connected Devices
Documents
Reports
Subscription
Privacy
Settings

Keep sensitive information appropriately separated.

==================================================
28. REUSABLE COMPONENT SYSTEM
==================================================

DO NOT individually reinvent screens.

Create reusable components first.

Required components:

Global Header
Hamburger Drawer
Bottom Navigation
Noyela Orb
Primary Button
Secondary Button
Ghost Button
AI Insight Card
Module Hero
Score Card
Progress Card
Product Card
Product Comparison Card
Treatment Card
Doctor Card
Routine Step
Tabs
Segmented Control
Pill
Chip
Chat Composer
Chat Bubble
Bottom Sheet
Modal
Drawer
Upload Area
Camera Capture
Photo Comparison
Before/After Slider
Timeline Item
Calendar
Notification
Empty State
Loading State
Success State

Use variants.

==================================================
29. AGENTIC BEHAVIOR
==================================================

This is CRITICAL.

NOYELA is an AGENT, not a dashboard.

Noyela remembers:

user goals
assessments
existing products
routines
budget
preferences
skin sensitivity
hair progress
sleep
supplements
previous treatments
doctors
appointments
progress

Use memory throughout the interface.

Examples:

“Your current moisturizer already fits this step, so I haven’t recommended another.”

“Your skin barrier has improved enough to introduce your next active.”

“You slept poorly last night, so I’ve adjusted today’s recovery recommendations.”

“Your hair shedding increased this week. Let’s review your protocol.”

“Based on your progress, I’ve moved this treatment to next month.”

The application should feel like it is continuously thinking about the user.

==================================================
30. MOBILE INFORMATION-DENSITY RULE
==================================================

EXTREMELY IMPORTANT.

Many AI-generated screens become too crowded.

DO NOT DO THIS.

A mobile screen should normally contain:

ONE dominant idea
ONE primary CTA
2–4 supporting blocks before scrolling.

Use progressive disclosure.

If content becomes large:

create another screen,
bottom sheet,
accordion,
drawer,
detail view,
or contextual conversation.

Never squeeze an entire report into one mobile viewport.

==================================================
31. NAVIGATION RULE
==================================================

Avoid excessive tabs.

Do NOT simultaneously show:

global category tabs
+
feature tabs
+
sub-tabs
+
time filters

unless absolutely necessary.

Maximum two visible navigation levels.

Context should determine the rest.

==================================================
32. PRODUCT NEUTRALITY
==================================================

NOYELA must feel trustworthy.

When recommending products:

do not make the experience feel sponsored.

Where appropriate show three comparable options:

Premium
Best Value
Budget

Explain selection based on:

ingredients
goal
skin/hair profile
budget
availability
existing products

The AI recommendation should be based on suitability, not branding.

==================================================
33. CORE SCREEN INVENTORY
==================================================

Build approximately 50 connected mobile screens.

AUTH / ONBOARDING

01 Splash
02 Onboarding 1
03 Onboarding 2
04 Onboarding 3
05 Sign In
06 Sign Up
07 Personalization

CORE

08 Home
09 Ask Noyela
10 Active Chat
11 Attachment Bottom Sheet

FACE

12 Understand My Face
13 Camera Capture
14 Processing
15 Harmony Result
16 Full Analysis

SKIN

17 Skin Overview
18 Skin Products
19 Morning Routine
20 Afternoon Routine
21 Night Routine
22 Skin Progress

HAIR

23 Hair Overview
24 Hair Products
25 Hair Morning
26 Hair Night
27 Professional Treatments
28 At-Home Devices
29 Hair Progress

JAWLINE

30 Jawline Assessment
31 Jawline Overview
32 Jawline Plan
33 Jawline Treatments
34 Jawline Exercises
35 Jawline Progress

SLEEP

36 Sleep Overview

NUTRITION

37 Nutrition Overview
38 Supplements

ROADMAP

39 Today
40 Journey
41 Timeline

PROGRESS

42 Overall Progress

PROFESSIONAL CARE

43 Doctor Discovery
44 Doctor Profile
45 Treatment Detail
46 Booking
47 Booking Review
48 Booking Confirmation

ACCOUNT

49 Notifications
50 Profile / Hamburger / Settings

==================================================
34. PROTOTYPE CONNECTIONS
==================================================

Connect the screens logically.

Examples:

Home → Understand My Face

Home → Ask Noyela

Home → Roadmap

Understand My Face → Camera

Camera → Processing

Processing → Harmony Result

Harmony Result → Transformation Plan

Transformation Plan → Skin/Hair/Jawline/Sleep/Nutrition

Skin → Products/Routines/Progress

Hair → Products/Routines/Treatments/Devices/Progress

Jawline → Assessment/Plan/Treatments/Exercises/Progress

Treatment → Doctor Discovery

Doctor Discovery → Doctor Profile

Doctor Profile → Booking

Booking → Confirmation

Roadmap → Today/Journey/Timeline

Progress → module progress

Orb → Ask Noyela

Hamburger → account/navigation drawer

All back buttons and CTAs should behave logically.

==================================================
35. INTERACTION STATES
==================================================

Include appropriate states for:

loading
thinking
listening
uploading
processing
selected
completed
disabled
success
error
empty

Noyela Orb should visually communicate:

idle
listening
thinking
speaking
success

==================================================
36. FINAL QUALITY BAR
==================================================

The finished product must feel like:

Apple-level consumer UX
+
premium aesthetic intelligence
+
conversational AI
+
personal transformation operating system.

The uploaded six screens establish the design quality.

DO NOT lower that quality on screens that were not supplied.

Do not make every screen look different.

Do not add unnecessary UI.

Do not over-explain.

Do not create excessive dashboards.

Do not use placeholder lorem ipsum.

Use realistic product copy.

Use realistic data where examples are necessary.

Preserve consistency.

The user should feel:

“Noyela understands me, knows where I want to go, and tells me exactly what to do next.”

Before building the screens, internally derive a consistent component system from the six uploaded references and then reuse that system across the entire application.

Build the complete connected mobile-responsive NOYELA experience now.