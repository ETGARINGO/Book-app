# Barbershop Booking System - Design Guidelines

## Design Approach
**Reference-Based Approach** drawing inspiration from premium service booking platforms like Booksy and modern barbershop brands that emphasize craftsmanship and style. The design should convey professionalism, masculine sophistication, and trustworthiness while maintaining excellent usability for the booking flow.

## Typography System
**Primary Font:** Inter or Montserrat (via Google Fonts CDN) - clean, modern sans-serif for UI elements
**Display Font:** Bebas Neue or Oswald - bold, impactful for headings and service names

**Hierarchy:**
- Hero Heading: Display font, text-6xl (lg:text-8xl), font-bold, uppercase
- Section Headings: Display font, text-4xl (lg:text-5xl), font-semibold
- Service Titles: Primary font, text-2xl, font-semibold
- Body Text: Primary font, text-base (lg:text-lg), font-normal
- UI Labels: Primary font, text-sm, font-medium, uppercase, tracking-wide
- Button Text: Primary font, text-base, font-semibold

## Layout System
**Spacing Units:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 (mobile), py-24 (desktop)
- Grid gaps: gap-6 to gap-8
- Container: max-w-7xl with px-6 (mobile), px-8 (desktop)

## Page Structure

### Hero Section (80vh)
Full-bleed background image showcasing a premium barbershop interior with atmospheric lighting and professional equipment. Image should feature shallow depth of field focusing on classic barber tools (scissors, clippers, razors) or a well-appointed barber chair.

**Content Layout:**
- Centered content with max-w-4xl
- Hero heading with strong value proposition: "CLASSIC CUTS. MODERN STYLE."
- Subheading: Brief description (1-2 lines) about premium service
- Primary CTA button: "Book Your Appointment" with backdrop-blur-sm background
- Trust indicators below CTA: "Over 2,000 satisfied clients • Expert barbers • Walk-ins welcome"

### Services Section (py-20)
**Grid Layout:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-8

Each service card features:
- Icon from Heroicons (scissors, user-circle, sparkles)
- Service name (text-2xl, font-semibold)
- Duration and brief description
- "Select Service" action
Cards with subtle hover elevation effect, border treatment, and rounded-xl corners

### Meet Our Barbers (py-24)
**Grid Layout:** grid-cols-1 md:grid-cols-2 lg:grid-cols-4, gap-6

Barber profile cards with:
- Square aspect ratio professional headshot (rounded-lg)
- Barber name (text-xl, font-semibold)
- Specialty/years of experience
- Selectable for booking flow
Professional, approachable photography showing barbers in action or confident portraits

### Booking Calendar Interface (py-16)
**Two-Column Layout (Desktop):** grid-cols-1 lg:grid-cols-3, gap-8
- Left column (lg:col-span-2): Interactive calendar showing 7-14 days ahead
- Right column: Booking summary card (sticky positioning)

**Calendar Design:**
- Week view with clear day headers
- Time slots in 30-minute increments
- Visual differentiation: available (interactive), booked (disabled/muted), selected (highlighted)
- Clear timezone indicator
- Navigation: Previous/Next week arrows

**Booking Summary Card:**
- Service selected with icon
- Barber selection with small avatar
- Selected date and time
- Customer form fields: Name, Phone, Email
- Terms acceptance checkbox
- "Confirm Booking" primary button
- Sticky on desktop (top-24)

### Why Choose Us Section (py-20)
**Three-Column Grid:** grid-cols-1 md:grid-cols-3, gap-12

Feature blocks with:
- Large icons from Heroicons (clock, shield-check, star)
- Benefit headline (text-xl, font-semibold)
- Supporting description
Icons displayed prominently (w-16 h-16) above text

### Footer (py-12)
**Multi-Column Layout:** grid-cols-1 md:grid-cols-4, gap-8

Sections:
- Business info with logo and tagline
- Quick links (Services, Barbers, Book Now, Contact)
- Contact information (address, phone, email with icons)
- Hours of operation
Bottom bar: Copyright and social media icons (Instagram, Facebook) using Heroicons

## Component Library

### Buttons
- **Primary:** Rounded-lg, px-8 py-4, font-semibold, backdrop-blur-sm when over images
- **Secondary:** Outlined variant, rounded-lg, px-6 py-3
- **Text buttons:** Underline on hover for inline actions

### Form Inputs
- Rounded-lg borders, px-4 py-3
- Focus ring with offset for clarity
- Label above input (text-sm, font-medium, uppercase, tracking-wide)
- Consistent spacing: space-y-4 for form groups

### Cards
- Rounded-xl with subtle border
- Padding: p-6 to p-8
- Hover: Subtle shadow elevation (transition-shadow duration-300)
- Consistent internal spacing with space-y-4

### Time Slot Buttons
- Grid display for time selection
- Rounded-md, px-4 py-3
- Clear states: available, selected, booked (disabled)
- Grid layout: grid-cols-3 md:grid-cols-4, gap-3

## Icons
Use **Heroicons** (outline style) via CDN for all UI icons:
- Navigation: menu, x-mark, chevrons
- Services: scissors, sparkles, clock
- Trust: shield-check, star, users
- Contact: phone, envelope, map-pin

## Images

**Hero Image:** High-quality barbershop interior photograph featuring vintage/modern aesthetic with professional lighting. Image should show depth and atmosphere - classic barber chairs, mirrors, tools displayed on counter. Aspect ratio: 16:9 or wider for desktop hero.

**Barber Portraits:** Professional headshots or action shots of barbers at work. Square aspect ratio (1:1) for consistency in grid layout. Should feel authentic and approachable - natural lighting, genuine smiles or focused concentration while cutting.

**Service Icons:** Use Heroicons instead of custom images for service type indicators.

## Animations
Minimal and purposeful:
- Smooth scroll behavior for navigation
- Hover elevation on cards (transform: translateY(-4px))
- Fade-in for booking confirmation message
- Loading state for calendar while fetching availability

## Accessibility
- All interactive elements keyboard navigable
- Focus indicators clearly visible
- Proper ARIA labels for calendar navigation
- Form validation with clear error messages
- Sufficient contrast ratios throughout
- Touch targets minimum 44x44px for mobile