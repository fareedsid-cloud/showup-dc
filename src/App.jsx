import { useState, useEffect, useRef, useMemo } from "react";

/* ───────────────────────────────────────────────────────────────
   ShowUp DC — Find volunteer opportunities in Washington, DC
   ─────────────────────────────────────────────────────────────── */

// ── DATA: Edit this array to update listings ──────────────────
const LISTINGS = [
  {
    id: 1,
    org: "Capital Area Food Bank",
    title: "Warehouse Food Sorting & Packing",
    cause: "Food Insecurity",
    neighborhood: "Northeast",
    commitment: "One-time",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description: "Sort and pack donated food items and emergency food boxes at the region's largest hunger relief organization. Light to medium labor — be prepared to stand for 90-minute sessions. They even run a shuttle from Brookland/CUA Metro.",
    url: "https://volunteer.capitalareafoodbank.org/",
  },
  {
    id: 2,
    org: "Capital Area Food Bank",
    title: "Community Marketplace Volunteer",
    cause: "Food Insecurity",
    neighborhood: "Southeast",
    commitment: "Monthly",
    days: ["Saturday"],
    description: "Help set up, distribute food, and tear down at free monthly farmers' market-style food distributions across DC neighborhoods. Each event needs about 15 volunteers and serves hundreds of families.",
    url: "https://volunteer.capitalareafoodbank.org/community-market",
  },
  {
    id: 3,
    org: "DC Central Kitchen",
    title: "Meal Prep & Cooking Volunteer",
    cause: "Food Insecurity",
    neighborhood: "Southwest",
    commitment: "One-time",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    description: "Chop, peel, and prep fresh produce alongside culinary job training students at the Buzzard Point kitchen. Morning shifts start at 9am, weekday evenings from 6–8pm. No cooking experience needed — they prepare over 5,000 meals daily.",
    url: "https://dccentralkitchen.org/volunteer/",
  },
  {
    id: 4,
    org: "Martha's Table",
    title: "McKenna's Wagon Meal Delivery",
    cause: "Food Insecurity",
    neighborhood: "Northwest",
    commitment: "Weekly",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    description: "Deliver fresh meals to DC neighbors through Martha's Table's mobile food service, operating 365 days a year in downtown DC. A direct, hands-on way to help your neighbors every single day.",
    url: "https://marthastable.org/volunteer/",
  },
  {
    id: 5,
    org: "Martha's Table",
    title: "Joyful Food Markets Volunteer",
    cause: "Food Insecurity",
    neighborhood: "Southeast",
    commitment: "Weekly",
    days: ["Tuesday", "Thursday", "Saturday"],
    description: "Help run free food markets across Wards 7 and 8, setting up produce displays, assisting families, and creating a welcoming community space. Hours vary based on location. Minimum volunteer age is 12.",
    url: "https://marthastable.org/volunteer/",
  },
  {
    id: 6,
    org: "Bread for the City",
    title: "Food Pantry Distribution Volunteer",
    cause: "Food Insecurity",
    neighborhood: "Northwest",
    commitment: "Weekly",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    description: "Help distribute groceries and fresh produce at the NW Center on 7th Street (steps from Shaw/Howard Metro) or the SE Center. Also assist with clothing room sorting, mail services, and client support.",
    url: "https://breadforthecity.org/volunteer/",
  },
  {
    id: 7,
    org: "Thrive DC",
    title: "Breakfast & Services Volunteer",
    cause: "Food Insecurity",
    neighborhood: "Northwest",
    commitment: "Weekly",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    description: "Serve breakfast and assist with day services for people experiencing homelessness at the Columbia Heights center. Shifts run 7am–3pm, Monday through Friday. Watch the orientation video and take a short quiz to sign up.",
    url: "https://www.thrivedc.org/volunteer/",
  },
  {
    id: 8,
    org: "College Track",
    title: "Mock Interviewer for High School Juniors",
    cause: "Education",
    neighborhood: "Southeast",
    commitment: "One-time",
    days: ["Wednesday"],
    description: "Conduct practice interviews and give feedback to high school juniors preparing for college and career opportunities. A single session that can change a student's trajectory. Currently seeking volunteers through Serve DC.",
    url: "https://servedc.galaxydigital.com/need/",
  },
  {
    id: 9,
    org: "Martha's Table",
    title: "Healthy Happy Hour Wellness Facilitator",
    cause: "Health",
    neighborhood: "Southeast",
    commitment: "Weekly",
    days: ["Wednesday", "Thursday"],
    description: "Help set up, craft mocktails, and lead wellness activities during this weekly community relaxation event. A creative way to promote health and well-being in a fun, social atmosphere.",
    url: "https://marthastable.org/volunteer/",
  },
  {
    id: 10,
    org: "Casey Trees",
    title: "Community Tree Planting Crew",
    cause: "Environment",
    neighborhood: "Northeast",
    commitment: "Monthly",
    days: ["Saturday"],
    description: "Plant native trees across DC neighborhoods with the nonprofit that's put over 60,000 trees in the ground since 2001. Spring and fall planting seasons. In 2026, they're planting 250 trees in historic national parks for America's 250th anniversary.",
    url: "https://caseytrees.org/volunteer/",
  },
  {
    id: 11,
    org: "Casey Trees",
    title: "Garden Series Workshop Volunteer",
    cause: "Environment",
    neighborhood: "Northeast",
    commitment: "Monthly",
    days: ["Saturday", "Wednesday"],
    description: "Support the 2026 Garden Series running March through November — workshops held twice monthly on Saturday mornings and Wednesday evenings. Help DC residents learn to grow their own food and green their communities.",
    url: "https://caseytrees.org/volunteer/",
  },
  {
    id: 12,
    org: "Rock Creek Conservancy",
    title: "Extreme Cleanup — Litter & Restoration",
    cause: "Environment",
    neighborhood: "Northwest",
    commitment: "Monthly",
    days: ["Saturday"],
    description: "Join the annual April Extreme Cleanup or year-round stream team efforts to haul trash, remove invasive plants, and restore Rock Creek Park's 1,800 acres. Since 2009, volunteers have removed thousands of bags of trash and hundreds of tires from the creek.",
    url: "https://www.rockcreekconservancy.org/extreme-cleanup",
  },
  {
    id: 13,
    org: "Rock Creek Conservancy",
    title: "Weed Wrangle — Invasive Species Removal",
    cause: "Environment",
    neighborhood: "Northwest",
    commitment: "One-time",
    days: ["Saturday", "Sunday"],
    description: "Help rescue DC's public parks from invasive species like English ivy, porcelain berry, and bush honeysuckle during the annual Weed Wrangle each fall. No experience needed — the Conservancy provides tools and training.",
    url: "https://www.rockcreekconservancy.org/ways-to-volunteer",
  },
  {
    id: 14,
    org: "Habitat for Humanity DC-NOVA",
    title: "Build Day Crew Member",
    cause: "Housing",
    neighborhood: "Southeast",
    commitment: "One-time",
    days: ["Wednesday", "Thursday", "Friday", "Saturday"],
    description: "Join a construction crew building affordable homes for DC families. No experience required — all tools, materials, training, and supervision provided. Full-day commitment. Over 2,000 volunteers logged 38,000+ hours last year alone.",
    url: "https://www.habitatdcnova.org/get-involved/volunteer/",
  },
  {
    id: 15,
    org: "Habitat for Humanity DC-NOVA",
    title: "ReStore Volunteer",
    cause: "Housing",
    neighborhood: "Northeast",
    commitment: "Weekly",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description: "Help accept donations, organize inventory, and assist customers at the Habitat ReStore. Proceeds fund home construction for local families. Great for people who love thrifting, organizing, and talking to people.",
    url: "https://www.habitatdcnova.org/get-involved/volunteer/individual/",
  },
  {
    id: 16,
    org: "Humane Rescue Alliance",
    title: "PACK Dog Walking & Field Trips",
    cause: "Animals",
    neighborhood: "Northwest",
    commitment: "Weekly",
    days: ["Saturday"],
    description: "Spring adoptable dogs from the Oglethorpe Street shelter for morning exercise outings in Rock Creek Park. Volunteers are paired with dogs approved by HRA's medical and behavioral teams. Your notes help match dogs with forever homes.",
    url: "https://www.humanerescuealliance.org/volunteer",
  },
  {
    id: 17,
    org: "Humane Rescue Alliance",
    title: "Paws & Purpose Shelter Support",
    cause: "Animals",
    neighborhood: "Northwest",
    commitment: "Weekly",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    description: "Work alongside the animal care team cleaning kennels, doing laundry, feeding animals, and keeping the shelter running at 71 Oglethorpe St NW. Shifts available 7am–11am or 3pm–7pm daily — including weekends and holidays.",
    url: "https://www.humanerescuealliance.org/volunteer",
  },
  {
    id: 18,
    org: "StreetWise Partners",
    title: "Professional Career Mentor",
    cause: "Mentorship",
    neighborhood: "Northwest",
    commitment: "Weekly",
    days: ["Tuesday", "Wednesday", "Thursday"],
    description: "Pair up with an unemployed or underemployed adult for a 13-week mentoring program. Help them build confidence, develop job skills, and expand their professional network. 70% of mentees are employed within one year. Just 1 year of work experience required.",
    url: "https://www.streetwisepartners.org/mentors",
  },
  {
    id: 19,
    org: "StreetWise Partners",
    title: "Mock Interviewer (One-Time)",
    cause: "Mentorship",
    neighborhood: "Northwest",
    commitment: "One-time",
    days: ["Wednesday", "Thursday"],
    description: "Conduct mock interviews and provide feedback to job-seekers preparing for real interviews. StreetWise provides the job description and questions — you bring your professional experience and encouragement.",
    url: "https://www.streetwisepartners.org/volunteers/",
  },
  {
    id: 20,
    org: "Iona Senior Services",
    title: "Friendly Visitor & Meal Delivery",
    cause: "Elderly Care",
    neighborhood: "Northwest",
    commitment: "Weekly",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    description: "Visit homebound seniors for conversation and companionship, or deliver nutritious meals — Iona delivers nearly 48,000 meals annually to over 200 homebound older adults. Located near Tenleytown Metro. Serving DC since 1975.",
    url: "https://iona.org/",
  },
  {
    id: 21,
    org: "Iona Senior Services",
    title: "Wellness & Arts Center Support",
    cause: "Elderly Care",
    neighborhood: "Northwest",
    commitment: "Weekly",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    description: "Assist at Iona's adult day health program, supporting older adults with creative writing, visual art, fitness classes, and recreational activities. The center cares for 83 people daily, Monday through Friday, 8:30am–5pm.",
    url: "https://iona.org/",
  },
  {
    id: 22,
    org: "Catholic Charities DC",
    title: "Ongoing Service Volunteer",
    cause: "Health",
    neighborhood: "Northeast",
    commitment: "Monthly",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    description: "Commit to a 75-hour role across health and wellness, legal advocacy, economic education, or community engagement programs. Training provided. Spring and fall cohorts of 100 volunteers each. Mentors, tutors, and pro bono professionals all welcome.",
    url: "https://www.catholiccharitiesdc.org/get-involved/ways-to-volunteer/",
  },
  {
    id: 23,
    org: "Spark the Journey",
    title: "Youth Mentor (Virtual or In-Person)",
    cause: "Mentorship",
    neighborhood: "Capitol Hill",
    commitment: "Monthly",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    description: "Mentor young people in the DMV area on a flexible schedule — including a virtual 5-month pathway for unpredictable schedules. Multiple mentoring programs available through the Serve DC platform. Help empower the next generation of leaders.",
    url: "https://servedc.galaxydigital.com/need/",
  },
  {
    id: 24,
    org: "United Way NCA",
    title: "Tax Preparation Volunteer (VITA)",
    cause: "Education",
    neighborhood: "Northwest",
    commitment: "Weekly",
    days: ["Saturday"],
    description: "Use your financial expertise to help community members file their taxes for free through the Volunteer Income Tax Assistance program. Training provided. A direct way to put money back in the pockets of working families across the DC metro area.",
    url: "https://unitedwaynca.org/take-action/volunteer/",
  },
];

const CAUSES = [
  "Food Insecurity", "Education", "Environment", "Housing",
  "Mentorship", "Animals", "Elderly Care", "Health",
];
const NEIGHBORHOODS = [
  "Northwest", "Northeast", "Southeast", "Southwest",
  "Capitol Hill", "Adams Morgan",
];
const COMMITMENTS = ["One-time", "Weekly", "Monthly"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CAUSE_EMOJI = {
  "Food Insecurity": "🍎",
  Education: "📚",
  Environment: "🌿",
  Housing: "🏠",
  Mentorship: "🤝",
  Animals: "🐾",
  "Elderly Care": "💛",
  Health: "💊",
};

// ── STYLES ────────────────────────────────────────────────────
const css = `
:root {
  --coral: #E8472A;
  --coral-light: #FF6B52;
  --coral-dark: #C93A22;
  --off-white: #FAFAF8;
  --charcoal: #1C1C1C;
  --charcoal-80: #1C1C1Ccc;
  --warm-gray: #F0EFEB;
  --mid-gray: #A8A5A0;
  --border: #E5E3DE;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--off-white);
  color: var(--charcoal);
  overflow-x: hidden;
  line-height: 1.6;
}

/* ── NAV ─────────────────────────────── */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--off-white);
  border-bottom: 1px solid var(--border);
  transition: box-shadow 0.3s;
}
.nav.scrolled {
  box-shadow: 0 2px 20px rgba(0,0,0,0.06);
}
.nav-logo {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--charcoal);
  cursor: pointer;
  display: flex;
  align-items: baseline;
  gap: 0;
}
.nav-logo .dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  background: var(--coral);
  border-radius: 50%;
  margin-left: 3px;
  margin-bottom: 2px;
}
.nav-links {
  display: flex;
  gap: 8px;
  align-items: center;
}
.nav-link {
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--charcoal);
  transition: all 0.2s;
  text-decoration: none;
}
.nav-link:hover {
  background: var(--warm-gray);
}
.nav-link.primary {
  background: var(--coral);
  color: white;
}
.nav-link.primary:hover {
  background: var(--coral-dark);
}

/* Mobile menu */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.mobile-menu-btn span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--charcoal);
  margin: 5px 0;
  border-radius: 2px;
  transition: all 0.3s;
}
.mobile-nav {
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: var(--off-white);
  border-bottom: 1px solid var(--border);
  padding: 16px 24px;
  z-index: 99;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}
.mobile-nav.open { display: flex; }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-menu-btn { display: block; }
}

/* ── HERO ────────────────────────────── */
.hero {
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 100px 24px 60px;
  position: relative;
  overflow: hidden;
  background: var(--off-white);
}
.hero::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -20%;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, #E8472A10 0%, transparent 70%);
  pointer-events: none;
}
.hero::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: -15%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, #E8472A08 0%, transparent 70%);
  pointer-events: none;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--coral);
  color: white;
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 32px;
  animation: fadeInUp 0.6s ease both;
}
.hero-badge .pulse {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s ease infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}
.hero h1 {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: clamp(42px, 7vw, 80px);
  line-height: 1.05;
  color: var(--charcoal);
  max-width: 800px;
  margin-bottom: 20px;
  animation: fadeInUp 0.6s ease 0.1s both;
}
.hero h1 .coral { color: var(--coral); }
.hero-sub {
  font-size: clamp(17px, 2.2vw, 20px);
  color: var(--mid-gray);
  max-width: 520px;
  margin-bottom: 40px;
  line-height: 1.6;
  font-weight: 400;
  animation: fadeInUp 0.6s ease 0.2s both;
}

/* Search bar */
.hero-search {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 100px;
  padding: 6px 6px 6px 24px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.08), 0 0 0 1px var(--border);
  animation: fadeInUp 0.6s ease 0.3s both;
  transition: box-shadow 0.3s;
}
.hero-search:focus-within {
  box-shadow: 0 4px 30px rgba(232,71,42,0.12), 0 0 0 2px var(--coral);
}
.hero-search input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
  background: transparent;
  color: var(--charcoal);
  min-width: 0;
}
.hero-search input::placeholder { color: var(--mid-gray); }
.hero-search button {
  background: var(--coral);
  color: white;
  border: none;
  border-radius: 100px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}
.hero-search button:hover { background: var(--coral-dark); }

.hero-stats {
  display: flex;
  gap: 40px;
  margin-top: 48px;
  animation: fadeInUp 0.6s ease 0.4s both;
}
.hero-stat {
  text-align: center;
}
.hero-stat-num {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 28px;
  color: var(--charcoal);
}
.hero-stat-label {
  font-size: 13px;
  color: var(--mid-gray);
  margin-top: 2px;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── FEATURED CAUSES ─────────────────── */
.causes-strip {
  padding: 0 24px 60px;
  max-width: 900px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease 0.5s both;
}
.causes-strip h3 {
  text-align: center;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--mid-gray);
  margin-bottom: 20px;
  font-weight: 500;
}
.causes-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.cause-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.cause-chip:hover {
  border-color: var(--coral);
  color: var(--coral);
  background: #E8472A08;
}
.cause-chip.active {
  border-color: var(--coral);
  background: var(--coral);
  color: white;
}

/* ── LISTINGS SECTION ────────────────── */
.listings-section {
  padding: 60px 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
}
.listings-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}
.listings-header h2 {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: clamp(28px, 4vw, 36px);
}
.listings-count {
  font-size: 14px;
  color: var(--mid-gray);
}

/* Filters */
.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}
.filter-dropdown {
  position: relative;
}
.filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: white;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  color: var(--charcoal);
}
.filter-btn:hover { border-color: var(--mid-gray); }
.filter-btn.active {
  border-color: var(--coral);
  background: #E8472A0A;
  color: var(--coral);
}
.filter-btn svg {
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
}
.filter-btn.open svg { transform: rotate(180deg); }
.filter-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  padding: 12px;
  min-width: 220px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: dropIn 0.15s ease;
}
@keyframes dropIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
.filter-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  font-family: 'DM Sans', sans-serif;
  color: var(--charcoal);
}
.filter-option:hover { background: var(--warm-gray); }
.filter-check {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  flex-shrink: 0;
}
.filter-option.selected .filter-check {
  background: var(--coral);
  border-color: var(--coral);
}
.clear-filters {
  padding: 10px 18px;
  border-radius: 100px;
  border: none;
  background: var(--warm-gray);
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  color: var(--charcoal);
  font-weight: 500;
  transition: all 0.2s;
}
.clear-filters:hover { background: #E5E3DE; }

/* ── CARDS ───────────────────────────── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}
@media (max-width: 400px) {
  .cards-grid { grid-template-columns: 1fr; }
}
.card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.25s;
  animation: cardIn 0.4s ease both;
  position: relative;
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--coral);
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: left;
}
.card:hover::before { transform: scaleX(1); }
.card:hover {
  border-color: transparent;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.card-org {
  font-size: 13px;
  font-weight: 600;
  color: var(--coral);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.card-emoji {
  font-size: 28px;
  line-height: 1;
}
.card h3 {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.3;
  color: var(--charcoal);
}
.card-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  flex: 1;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.card-tag {
  padding: 5px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  background: var(--warm-gray);
  color: var(--charcoal);
}
.card-tag.cause {
  background: #E8472A12;
  color: var(--coral);
}
.card-bottom {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}
.card-days {
  font-size: 12px;
  color: var(--mid-gray);
}
.card-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 24px;
  border-radius: 100px;
  background: var(--charcoal);
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  width: 100%;
  white-space: nowrap;
}
.card-cta:hover {
  background: var(--coral);
}
.card-cta svg { width: 14px; height: 14px; }

.no-results {
  text-align: center;
  padding: 80px 24px;
  grid-column: 1 / -1;
}
.no-results h3 {
  font-family: 'Fraunces', serif;
  font-size: 24px;
  margin-bottom: 8px;
}
.no-results p {
  color: var(--mid-gray);
  font-size: 15px;
}

/* ── ABOUT SECTION ───────────────────── */
.about-section {
  padding: 80px 24px;
  background: var(--charcoal);
  color: white;
}
.about-inner {
  max-width: 800px;
  margin: 0 auto;
}
.about-section h2 {
  font-family: 'Fraunces', serif;
  font-size: clamp(32px, 5vw, 44px);
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.15;
}
.about-section h2 .coral { color: var(--coral); }
.about-section p {
  font-size: 17px;
  line-height: 1.75;
  color: #B0ADA8;
  margin-bottom: 16px;
}
.about-section p strong { color: white; font-weight: 600; }

/* ── ADD ORG FORM ────────────────────── */
.form-section {
  padding: 80px 24px;
  max-width: 680px;
  margin: 0 auto;
}
.form-section h2 {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  margin-bottom: 8px;
}
.form-section .form-sub {
  color: var(--mid-gray);
  font-size: 16px;
  margin-bottom: 36px;
}
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 500px) {
  .form-row { grid-template-columns: 1fr; }
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-field label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--charcoal);
}
.form-field input,
.form-field select,
.form-field textarea {
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  font-size: 15px;
  font-family: 'DM Sans', sans-serif;
  background: white;
  color: var(--charcoal);
  outline: none;
  transition: border 0.2s;
}
.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--coral);
}
.form-field textarea {
  resize: vertical;
  min-height: 100px;
}
.form-submit {
  padding: 16px 36px;
  border-radius: 100px;
  background: var(--coral);
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}
.form-submit:hover { background: var(--coral-dark); }
.form-success {
  padding: 16px 20px;
  background: #E8F5E9;
  border-radius: 12px;
  color: #2E7D32;
  font-weight: 500;
  font-size: 15px;
}

/* ── EMAIL SIGNUP ────────────────────── */
.signup-section {
  padding: 80px 24px;
  text-align: center;
  background: var(--warm-gray);
}
.signup-section h2 {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  margin-bottom: 8px;
}
.signup-section p {
  color: var(--mid-gray);
  font-size: 16px;
  margin-bottom: 28px;
}
.signup-form {
  display: flex;
  max-width: 480px;
  margin: 0 auto;
  gap: 8px;
}
.signup-form input {
  flex: 1;
  padding: 14px 20px;
  border-radius: 100px;
  border: 1px solid var(--border);
  font-size: 15px;
  font-family: 'DM Sans', sans-serif;
  outline: none;
  background: white;
  min-width: 0;
}
.signup-form input:focus { border-color: var(--coral); }
.signup-form button {
  padding: 14px 28px;
  border-radius: 100px;
  background: var(--coral);
  color: white;
  border: none;
  font-size: 15px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}
.signup-form button:hover { background: var(--coral-dark); }
@media (max-width: 500px) {
  .signup-form { flex-direction: column; }
}

/* ── FOOTER ──────────────────────────── */
.footer {
  padding: 40px 24px;
  text-align: center;
  border-top: 1px solid var(--border);
}
.footer-logo {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 6px;
}
.footer p {
  font-size: 13px;
  color: var(--mid-gray);
}

/* ── SCROLL ANIMATIONS ───────────────── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
`;

// ── CHEVRON SVG ───────────────────────────────────────────────
const Chevron = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3.5 5.5L7 9L10.5 5.5" />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 7h8M8 4l3 3-3 3" />
  </svg>
);
const Check = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
    <path d="M3.5 7.5L6 10L11 4.5" />
  </svg>
);

// ── FILTER DROPDOWN COMPONENT ─────────────────────────────────
function FilterDropdown({ label, options, selected, onToggle, isOpen, setOpen }) {
  const ref = useRef(null);
  const hasSelection = selected.length > 0;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setOpen]);

  return (
    <div className="filter-dropdown" ref={ref}>
      <button
        className={`filter-btn ${hasSelection ? "active" : ""} ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      >
        {label}{hasSelection ? ` (${selected.length})` : ""}
        <Chevron />
      </button>
      {isOpen && (
        <div className="filter-panel" onMouseDown={(e) => e.stopPropagation()}>
          {options.map((opt) => {
            const isSel = selected.includes(opt);
            return (
              <button
                key={opt}
                className={`filter-option ${isSel ? "selected" : ""}`}
                onClick={(e) => { e.stopPropagation(); onToggle(opt); }}
              >
                <span className="filter-check">{isSel && <Check />}</span>
                {CAUSE_EMOJI[opt] ? `${CAUSE_EMOJI[opt]} ` : ""}{opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── REVEAL ON SCROLL HOOK ─────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", as: Tag = "div" }) {
  const ref = useReveal();
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function ShowUpDC() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [filterCause, setFilterCause] = useState([]);
  const [filterHood, setFilterHood] = useState([]);
  const [filterCommit, setFilterCommit] = useState([]);
  const [filterDay, setFilterDay] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const listingsRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navigate = (p) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggle = (arr, setArr) => (val) => {
    setArr((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  };

  const clearFilters = () => {
    setFilterCause([]);
    setFilterHood([]);
    setFilterCommit([]);
    setFilterDay([]);
    setSearch("");
  };

  const filtered = useMemo(() => {
    return LISTINGS.filter((l) => {
      if (search && !`${l.org} ${l.title} ${l.cause} ${l.neighborhood} ${l.description}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterCause.length && !filterCause.includes(l.cause)) return false;
      if (filterHood.length && !filterHood.includes(l.neighborhood)) return false;
      if (filterCommit.length && !filterCommit.includes(l.commitment)) return false;
      if (filterDay.length && !l.days.some((d) => filterDay.includes(d))) return false;
      return true;
    });
  }, [search, filterCause, filterHood, filterCommit, filterDay]);

  const hasFilters = search || filterCause.length || filterHood.length || filterCommit.length || filterDay.length;

  const scrollToListings = () => {
    if (listingsRef.current) listingsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const heroSearch = (e) => {
    e.preventDefault();
    scrollToListings();
  };

  const selectCauseFromHero = (cause) => {
    setFilterCause([cause]);
    setTimeout(scrollToListings, 50);
  };

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => navigate("home")}>
          ShowUp DC<span className="dot" />
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => { navigate("home"); setTimeout(scrollToListings, 100); }}>Browse</button>
          <button className="nav-link" onClick={() => navigate("about")}>About</button>
          <button className="nav-link" onClick={() => navigate("add")}>Add Org</button>
          <button className="nav-link primary" onClick={() => navigate("home")}>Get Started</button>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <button className="nav-link" onClick={() => { navigate("home"); setTimeout(scrollToListings, 100); }}>Browse Opportunities</button>
        <button className="nav-link" onClick={() => navigate("about")}>About</button>
        <button className="nav-link" onClick={() => navigate("add")}>Add Your Organization</button>
      </div>

      <div style={{ paddingTop: 64 }}>
        {/* ── HOME ─────────────────────────── */}
        {page === "home" && (
          <>
            {/* Hero */}
            <section className="hero">
              <div className="hero-badge">
                <span className="pulse" />
                Washington, DC
              </div>
              <h1>
                Your city needs<br />you to <span className="coral">show up</span>
              </h1>
              <p className="hero-sub">
                Find meaningful volunteer opportunities near you.
                One search. Real impact. Let's go.
              </p>
              <form className="hero-search" onSubmit={heroSearch}>
                <input
                  type="text"
                  placeholder="Search causes, orgs, neighborhoods…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-num">{LISTINGS.length}+</div>
                  <div className="hero-stat-label">Opportunities</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-num">{new Set(LISTINGS.map(l => l.neighborhood)).size}</div>
                  <div className="hero-stat-label">Neighborhoods</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-num">{CAUSES.length}</div>
                  <div className="hero-stat-label">Cause Areas</div>
                </div>
              </div>
            </section>

            {/* Cause chips */}
            <div className="causes-strip">
              <h3>Browse by cause</h3>
              <div className="causes-row">
                {CAUSES.map((c) => (
                  <button
                    key={c}
                    className={`cause-chip ${filterCause.includes(c) ? "active" : ""}`}
                    onClick={() => selectCauseFromHero(c)}
                  >
                    {CAUSE_EMOJI[c]} {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Listings */}
            <section className="listings-section" ref={listingsRef}>
              <div className="listings-header">
                <div>
                  <h2>Volunteer Opportunities</h2>
                  <p className="listings-count">{filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"} found</p>
                </div>
              </div>

              <div className="filters-bar">
                <FilterDropdown
                  label="Cause"
                  options={CAUSES}
                  selected={filterCause}
                  onToggle={toggle(filterCause, setFilterCause)}
                  isOpen={openFilter === "cause"}
                  setOpen={(v) => setOpenFilter(v ? "cause" : null)}
                />
                <FilterDropdown
                  label="Neighborhood"
                  options={NEIGHBORHOODS}
                  selected={filterHood}
                  onToggle={toggle(filterHood, setFilterHood)}
                  isOpen={openFilter === "hood"}
                  setOpen={(v) => setOpenFilter(v ? "hood" : null)}
                />
                <FilterDropdown
                  label="Commitment"
                  options={COMMITMENTS}
                  selected={filterCommit}
                  onToggle={toggle(filterCommit, setFilterCommit)}
                  isOpen={openFilter === "commit"}
                  setOpen={(v) => setOpenFilter(v ? "commit" : null)}
                />
                <FilterDropdown
                  label="Day"
                  options={DAYS}
                  selected={filterDay}
                  onToggle={toggle(filterDay, setFilterDay)}
                  isOpen={openFilter === "day"}
                  setOpen={(v) => setOpenFilter(v ? "day" : null)}
                />
                {hasFilters && (
                  <button className="clear-filters" onClick={clearFilters}>
                    Clear all
                  </button>
                )}
              </div>

              <div className="cards-grid">
                {filtered.length === 0 ? (
                  <div className="no-results">
                    <h3>No matches found</h3>
                    <p>Try adjusting your filters or search term.</p>
                  </div>
                ) : (
                  filtered.map((l, i) => (
                    <div
                      className="card"
                      key={l.id}
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <div className="card-top">
                        <span className="card-org">{l.org}</span>
                        <span className="card-emoji">{CAUSE_EMOJI[l.cause]}</span>
                      </div>
                      <h3>{l.title}</h3>
                      <p className="card-desc">{l.description}</p>
                      <div className="card-tags">
                        <span className="card-tag cause">{l.cause}</span>
                        <span className="card-tag">{l.neighborhood}</span>
                        <span className="card-tag">{l.commitment}</span>
                      </div>
                      <div className="card-bottom">
                        <span className="card-days">{l.days.join(", ")}</span>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="card-cta">
                          Learn More <Arrow />
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Email signup */}
            <Reveal>
              <section className="signup-section">
                <h2>Stay in the loop</h2>
                <p>Get new volunteer opportunities delivered to your inbox. No spam, ever.</p>
                {emailSent ? (
                  <p style={{ color: "var(--coral)", fontWeight: 600 }}>You're in! We'll be in touch.</p>
                ) : (
                  <div className="signup-form">
                    <input type="email" placeholder="your@email.com" />
                    <button onClick={() => setEmailSent(true)}>Subscribe</button>
                  </div>
                )}
              </section>
            </Reveal>
          </>
        )}

        {/* ── ABOUT ────────────────────────── */}
        {page === "about" && (
          <Reveal>
            <section className="about-section">
              <div className="about-inner">
                <h2>DC is full of people<br />who want to <span className="coral">show up</span>.</h2>
                <p>
                  <strong>ShowUp DC</strong> was born from a simple frustration: finding volunteer opportunities in Washington, DC shouldn't require digging through outdated government websites and clunky nonprofit directories.
                </p>
                <p>
                  We believe volunteering should feel as easy as booking a restaurant reservation. Search, find something that fits your schedule and passions, and go do something meaningful this weekend.
                </p>
                <p>
                  <strong>Our mission</strong> is to connect every DC resident with the organizations that need them most — across every ward, every neighborhood, and every cause area. Whether you've got one Saturday morning or want to commit weekly, there's a place for you.
                </p>
                <p>
                  ShowUp DC is an independent community project. We don't charge organizations to list, and we don't take a cut. We just want to make it ridiculously easy for good people to do good things.
                </p>
                <p style={{ marginTop: 32 }}>
                  <strong>Ready to get started?</strong>
                </p>
                <button className="nav-link primary" style={{ marginTop: 12, fontSize: 16, padding: "14px 32px" }} onClick={() => navigate("home")}>
                  Browse Opportunities
                </button>
              </div>
            </section>
          </Reveal>
        )}

        {/* ── ADD ORG ──────────────────────── */}
        {page === "add" && (
          <Reveal>
            <section className="form-section">
              <h2>Add Your Organization</h2>
              <p className="form-sub">
                Submit your volunteer opportunity for review. We'll get it listed within a few days.
              </p>
              {formSubmitted ? (
                <div className="form-success">
                  Thanks for submitting! We'll review your listing and be in touch soon.
                </div>
              ) : (
                <div className="form-grid">
                  <div className="form-row">
                    <div className="form-field">
                      <label>Organization Name</label>
                      <input type="text" placeholder="e.g. DC Central Kitchen" />
                    </div>
                    <div className="form-field">
                      <label>Contact Email</label>
                      <input type="email" placeholder="you@org.com" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Opportunity Title</label>
                    <input type="text" placeholder="e.g. Weekend Meal Prep Volunteer" />
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Cause Area</label>
                      <select>
                        <option value="">Select…</option>
                        {CAUSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Neighborhood</label>
                      <select>
                        <option value="">Select…</option>
                        {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Time Commitment</label>
                      <select>
                        <option value="">Select…</option>
                        {COMMITMENTS.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Website URL</label>
                      <input type="url" placeholder="https://…" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Description</label>
                    <textarea placeholder="Tell us about the opportunity — what will volunteers do? What should they expect?" />
                  </div>
                  <button className="form-submit" onClick={() => setFormSubmitted(true)}>
                    Submit for Review
                  </button>
                </div>
              )}
            </section>
          </Reveal>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="footer-logo nav-logo" style={{justifyContent:'center',fontSize:18,cursor:'default'}}>ShowUp DC<span className="dot" /></div>
          <p>Made with ❤️ in Washington, DC</p>
        </footer>
      </div>
    </>
  );
}
