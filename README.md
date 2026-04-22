# KitHub
A mobile system that identifies products from photos and shows customer-specific prices. AI detects the item, and the backend retrieves its details and correct price from a database, making product lookup fast, accurate, and easy.

Design a modern mobile UI for a retail inventory management app called StockHub, used by shop staff in a craft supply store selling yarn, string, ribbon, and beads.

Key product characteristics:
    - Products have multiple variants
    - Variants are defined by:
        - Color
        - Size / thickness
        - Material / type
        - Unit (meters, rolls, pieces, grams)

Core screens to design:
    - Home dashboard
    - Camera-based item scanning screen
    - Product details screen with variant selector
    - Inventory search & filter screen
    - Order creation screen (receipt-style)
    - Order summary / receipt preview

Product details screen requirements:
    - Visual color swatches for color selection
    - Size and material shown as selectable chips or tags
    - Variant-specific stock count and unit
    - Clear separation between product group and specific SKU
    - Fast stock adjustment controls (+ / – and numeric input)

Order creation feature:
    - Staff can add products from a searchable list
    - Each product line allows:
        - Variant selection
        - Quantity adjustment
        - Price level selection (retail, wholesale, member, custom)
    - Clean receipt-style order summary
    - Emphasis on clarity and speed

Visual style:
    - Earth-tone, brownish theme
    - Warm browns, beige, muted olive accents
    - Calm, grounded, trustworthy aesthetic
    - Minimalist, professional, staff-focused
    - Rounded cards, soft shadows, natural textures

UX principles:
    - Designed for frequent daily use
    - Visual-first variant selection (color & size)
    - Minimal cognitive load
    - Error-resistant workflows
    
Platform: mobile-first, iOS and Android, suitable for React Native / Expo.

=============================================================================================

## Setup and Running
For detailed instructions on installation, database setup, and how to run the project, please refer to the [manual.md](manual.md) file.

### Quick Start
1. **Root**: `npm install`
2. **Backend**: `cd backend && python -m venv venv && .\venv\Scripts\activate && pip install -r requirements.txt`
3. **Frontend**: `cd frontend/KitHub && npm install`
4. **Run**: `npm run dev` (from root)

> [!IMPORTANT]
> Ensure both your mobile device and computer are on the same Wi-Fi network and update the API IP addresses in the frontend code.