
# 🔮 Love Cheat Code – Retrieval Logic

## STEP 1: User Inputs
User enters:
- **Person A**: Month, Day, Year
- **Person B**: Month, Day, Year

Example:
- Person A: Jan 22, 1974 → `01-22`
- Person B: Mar 28, 1985 → `03-28`

---

## STEP 2: Lookup Birth Cards
Use `Birthdate to Card.csv` to convert MM-DD into a Birth Card:
- Person A → Card A (e.g., 5♦️)
- Person B → Card B (e.g., 8❤️)

---

## STEP 3: Get Card Profiles
Use `LCC Card Profiles.csv`:
- Description
- How They Love
- Green Flags
- Red Flags

---

## STEP 4: Retrieve Composite Description
- Create a sorted key: `Card1|Card2` (alphabetical)
- Use `Card Composites.csv`:
  - Card 1
  - Card 2
  - Composite Description

---

## STEP 5: Determine Current Age (for Forecasts)
- Calculate age from full birthdate and current date
- Format age as string to match `Yearly Forecasts.csv`

---

## STEP 6: Retrieve Forecast Spread from `Yearly Forecasts.csv`
**For each person:**

### Yearly Energetic Outlook (6 Cards)
- Birth Card
- Long Range
- Pluto
- Result
- Support
- Development

### 52-Day Energetic Cycles (7 Cards)
- Mercury
- Venus
- Mars
- Jupiter
- Saturn
- Uranus
- Neptune

---

## STEP 7: Return Card Descriptions

### For the Birth Card
Use `LCC Card Profiles.csv`:
- Description
- How They Love
- Green Flags
- Red Flags

### For the 13 Other Cards (6+7)
Use `Card to Activities LCC.csv`:
- What They’re Going Through
- How to Support Them

➡️ **Total cards per person: 14**

---

## STEP 8: Output to UI

### Person A & B Outputs:
- MM-DD-YYYY format (editable)
- Age (editable)
- Birth Card (image w/ flip description)
- Yearly Energetic Outlook (6 cards)
- 52-Day Energetic Cycles (7 cards)

### ❤️ Composite Description
- Output box: “Your Vibe”
- Description only (no card shown)

---

## STEP 9: Fallback Handling

- Missing composite? → `“Wild Card… No composite available!”`
- Missing forecast card? → `“Wild Card… No forecast available”`
