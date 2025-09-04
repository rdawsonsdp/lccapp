# Love Cheat Code App

A Next.js application implementing the complete Love Cheat Code retrieval logic for love compatibility analysis using tarot card spreads and planetary periods.

## 🎯 **Love Cheat Code – Retrieval Logic**

### **STEP 1: User Inputs**
- **Person A**: Month, Day, Year (e.g., Jan 22, 1974)
- **Person B**: Month, Day, Year (e.g., Mar 28, 1985)

### **STEP 2: Lookup Birth Cards**
- Uses `Birthdate_to_Card.json` to convert MM-DD into Birth Card
- Person A → Card A (e.g., 9C for Jan 22)
- Person B → Card B (e.g., 9D for Mar 28)

### **STEP 3: Get Card Profiles**
- Uses `LCC_Profiles.json` to pull 4 key sections for each card:
  - **Description**: Card meaning and symbolism
  - **How They Love**: Love style and approach
  - **Green Flags**: Positive traits and strengths
  - **Red Flags**: Potential challenges and areas for growth

### **STEP 4: Retrieve Composite Description**
- Creates sorted key: Birth Card1|Birth Card2 (alphabetically sorted)
- Uses `LCC_Composites.json` to find compatibility analysis
- Returns detailed relationship insights

### **STEP 5: Determine Current Age**
- Calculates age using current date and full birthdate
- Formats age as string for matching in forecast table

### **STEP 6: Retrieve Forecast Spread**
- Finds row in `YearlyForecasts.json` where:
  - Birth Card = Person's card
  - AGE = Person's current age
- Returns **Yearly Energetic Outlook (6 Cards)**:
  - Birth Card, Long Range, Pluto, Result, Support, Development
- Returns **52-Day Energetic Cycles (7 Cards)**:
  - Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune

### **STEP 7: Return Card Descriptions**
- **Birth Card**: Full profile from LCC Card Profiles
- **Other Cards**: Activities and support guidance from Card to Activities LCC
- **Total**: 14 cards per person (1 Birth + 6 Yearly + 7 Planetary)

### **STEP 8: Output to UI**
- **Person A/B Output**: Full birthdate, age, birth card, yearly outlook, planetary cycles
- **Composite Output**: "Your Vibe" section with relationship compatibility analysis

### **STEP 9: Fallback Handling**
- Missing Composite → "Wild Card... No composite available!"
- Missing forecast card profile → "Wild Card... No forecast available"

## 🚀 **Features**

- **Complete LCC Implementation**: Follows exact Love Cheat Code methodology
- **Real Card Data**: Authentic tarot card meanings and interpretations
- **Dynamic Age Calculation**: Automatically calculates current age
- **Comprehensive Profiles**: 4-section card profiles with love insights
- **Planetary Cycles**: 7 planetary periods with card assignments
- **Composite Analysis**: Detailed relationship compatibility readings
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 **Getting Started**

### **Prerequisites**
- Node.js (version 14 or higher)
- npm or yarn

### **Installation**
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### **Running the Application**
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3001`

### **Building for Production**
```bash
npm run build
npm start
```

## 📊 **How to Use**

1. **Enter Person A's Information**:
   - Month (1-12)
   - Day (1-31)
   - Year (1900-2100)

2. **Enter Person B's Information**:
   - Month (1-12)
   - Day (1-31)
   - Year (1900-2100)

3. **View Results**:
   - Birth Card with full profile
   - Yearly Energetic Outlook (6 cards)
   - 52-Day Planetary Cycles (7 cards)
   - Composite compatibility analysis

4. **Interact with Cards**:
   - Click on any card to see detailed descriptions
   - Birth cards show full 4-section profiles
   - Other cards show activities and support guidance

## 📁 **Project Structure**

```
├── app/                           # Next.js app directory
│   ├── layout.js                 # Root layout
│   └── page.jsx                  # Main page component
├── src/
│   ├── components/               # UI components
│   │   └── ui/
│   │       └── input.jsx         # Input component
│   ├── data/                     # Love Cheat Code data files
│   │   ├── Birthdate_to_Card.json    # MM-DD to Birth Card mapping
│   │   ├── LCC_Profiles.json         # Card profiles (4 sections)
│   │   ├── Card_to_Activities_LCC.json # Card activities and support
│   │   ├── YearlyForecasts.json      # Yearly outlooks and planetary cycles
│   │   └── LCC_Composites.json       # Relationship compatibility data
│   ├── utils/                    # LCC retrieval logic
│   │   └── cardUtils.js          # Complete LCC implementation
│   ├── DualSpreadUI.jsx          # Main UI component
│   ├── LoveCheatCodeBackend.jsx  # App wrapper
│   └── styles.css                # Application styles
├── public/
│   └── cards/                    # Card image files
├── package.json                  # Dependencies and scripts
└── next.config.js                # Next.js configuration
```

## 🎴 **Data Files**

- **`Birthdate_to_Card.json`**: Complete MM-DD to Birth Card mapping (365 days)
- **`LCC_Profiles.json`**: Card profiles with Description, How They Love, Green Flags, Red Flags
- **`Card_to_Activities_LCC.json`**: Activities, challenges, and growth areas for each card
- **`YearlyForecasts.json`**: Yearly outlooks and planetary cycles for different ages
- **`LCC_Composites.json`**: Relationship compatibility analysis and advice

## 🔮 **Example Reading**

**Person A**: January 22, 1974
- **Birth Card**: 9C (9 of Clubs)
- **Age**: 50
- **Yearly Outlook**: 6 cards showing energetic themes
- **Planetary Cycles**: 7 cards for 52-day periods

**Person B**: March 28, 1985
- **Birth Card**: 9D (9 of Diamonds)
- **Age**: 39
- **Yearly Outlook**: 6 cards showing energetic themes
- **Planetary Cycles**: 7 cards for 52-day periods

**Composite**: "Your Vibe" analysis of 9C + 9D compatibility

## 🎨 **Technologies Used**

- **Next.js 13**: React framework with app directory
- **React 18**: UI library with hooks
- **CSS3**: Responsive styling with modern design
- **JSON**: Comprehensive data storage
- **Love Cheat Code**: Authentic tarot methodology

## 📱 **Responsive Design**

- **Desktop**: Full card layouts with hover effects
- **Mobile**: Optimized input fields and card displays
- **Tablet**: Adaptive layouts for medium screens

## 🚨 **Troubleshooting**

- **Port conflicts**: App runs on port 3001 by default
- **Data loading**: Ensure all JSON data files are present
- **Card images**: Verify images exist in `public/cards/` directory
- **Birth card mapping**: Check `Birthdate_to_Card.json` for MM-DD format

## 📚 **Love Cheat Code Methodology**

This application implements the authentic Love Cheat Code system, which:
- Uses specific birth date calculations to determine birth cards
- Provides comprehensive card profiles with love-focused interpretations
- Offers yearly and planetary period forecasts
- Analyzes relationship compatibility through composite readings
- Follows traditional tarot principles adapted for modern love analysis

## 📄 **License**

This project implements the Love Cheat Code methodology for educational and personal use.
