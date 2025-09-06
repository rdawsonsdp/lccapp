
import birthdateToCardData from "../data/Birthdate_to_Card_Official.json";
import forecastData from "../data/YearlyForecasts_Official.json";
import activitiesData from "../data/Card_to_Activities_Official.json";
import lccProfiles from "../data/LCC_Profiles_Official.json";
import compositeData from "../data/LCC_Composites_Official.json";

// Use the JSON data directly
const birthdateToCard = birthdateToCardData;

// STEP 2: Lookup Birth Cards
export function findBirthCard(month, day) {
  // Convert numeric month to month name
  const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthName = monthNames[month];
  const key = `${monthName} ${day}`;
  
  return birthdateToCard[key] || "5D"; // Fallback to 5D if not found
}

// STEP 5: Calculate current age
export function calculateAge(birthYear) {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}

// STEP 6: Retrieve Forecast Spread
export function getForecastSpread(birthCard, age) {
  const key = `${birthCard}_${age}`;
  const forecast = forecastData[key];
  
  if (!forecast) {
    return {
      yearly_outlook: [],
      planetary_cycles: [],
      error: "Wild Card... No forecast available"
    };
  }
  
  return {
    yearly_outlook: forecast.yearly_outlook || [],
    planetary_cycles: forecast.planetary_cycles || [],
    error: null
  };
}

// STEP 3: Get Card Profiles (4 key sections)
export function getCardProfile(cardCode) {
  const profile = lccProfiles[cardCode];
  
  if (!profile) {
    return {
      description: "Wild Card... No forecast available",
      how_they_love: "No data available",
      green_flags: [],
      red_flags: []
    };
  }
  
  return {
    description: profile.description,
    how_they_love: profile.how_they_love,
    green_flags: profile.green_flags,
    red_flags: profile.red_flags
  };
}

// STEP 4: Retrieve Composite Description
export function getCompositeDescription(birthCardA, birthCardB) {
  // Create sorted key alphabetically
  const cards = [birthCardA, birthCardB].sort();
  const key = `${cards[0]}_${cards[1]}`;
  
  const composite = compositeData[key];
  
  if (!composite) {
    return "Wild Card... No composite available!";
  }
  
  return composite.description;
}

// STEP 7: Return Card Descriptions for All Forecast Cards
export function getAllCardDescriptions(birthCard, age) {
  const forecast = getForecastSpread(birthCard, age);
  
  if (forecast.error) {
    return {
      birthCard: getCardProfile(birthCard),
      yearly_outlook: [],
      planetary_cycles: [],
      error: forecast.error
    };
  }
  
  // Birth Card description from LCC Card Profiles
  const birthCardProfile = getCardProfile(birthCard);
  
  // Yearly Outlook descriptions from Card to Activities LCC
  const yearlyOutlook = forecast.yearly_outlook.map(card => ({
    ...card,
    activities: activitiesData[card.code] || "No data available"
  }));
  
  // Planetary Cycles descriptions from Card to Activities LCC
  const planetaryCycles = forecast.planetary_cycles.map((card, index) => {
    // Generate dates for 2025 (current year)
    const startDate = new Date(2025, 0, 22); // January 22, 2025
    const periodStart = new Date(startDate.getTime() + (index * 52 * 24 * 60 * 60 * 1000));
    const formattedDate = `${(periodStart.getMonth() + 1).toString().padStart(2, '0')}/${periodStart.getDate().toString().padStart(2, '0')}/${periodStart.getFullYear()}`;
    
    return {
      ...card,
      date: formattedDate,
      activities: activitiesData[card.code] || "No data available"
    };
  });
  
  return {
    birthCard: birthCardProfile,
    yearly_outlook: yearlyOutlook,
    planetary_cycles: planetaryCycles,
    error: null
  };
}

// Main function to get complete person data
export function getPersonData(month, day, year) {
  const birthCard = findBirthCard(month, day);
  const age = calculateAge(year);
  const allDescriptions = getAllCardDescriptions(birthCard, age);
  
  // Debug logging
  console.log(`Getting person data for ${month}/${day}/${year}:`);
  console.log(`Birth card: ${birthCard}`);
  console.log(`Age: ${age}`);
  console.log(`Yearly outlook cards:`, allDescriptions.yearly_outlook);
  console.log(`Planetary cycles:`, allDescriptions.planetary_cycles);
  
  return {
    birthdate: `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`,
    age: age,
    birthCard: birthCard, // Keep as string
    birthCardProfile: allDescriptions.birthCard, // Profile object
    yearly_outlook: allDescriptions.yearly_outlook,
    planetary_cycles: allDescriptions.planetary_cycles,
    error: allDescriptions.error
  };
}

// Helper function to convert Unicode card symbols to image filenames
function convertCardCodeToFilename(cardCode) {
  if (!cardCode) return "5D";
  
  // Convert Unicode symbols to letter codes
  const symbolMap = {
    '♥': 'H',  // Hearts
    '♣': 'C',  // Clubs  
    '♦': 'D',  // Diamonds
    '♠': 'S'   // Spades
  };
  
  // Replace Unicode symbols with letters
  let filename = cardCode;
  for (const [symbol, letter] of Object.entries(symbolMap)) {
    filename = filename.replace(new RegExp(symbol, 'g'), letter);
  }
  
  return filename;
}

// Helper function to get card image path
export function getCardImagePath(cardCode) {
  if (cardCode && cardCode.length >= 2) {
    const filename = convertCardCodeToFilename(cardCode);
    const imagePath = `/cards/${filename}.png`;
    return imagePath;
  }
  return `/cards/5D.png`;
}

// Legacy functions for backward compatibility
export function getForecastCards(birthDate, age) {
  // Extract month and day from birthDate string
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const birthCard = findBirthCard(month, day);
  
  const forecast = getForecastSpread(birthCard, age);
  
  if (forecast.error) {
    return [{ code: birthCard, name: "Birth Card", description: "Birth Card" }];
  }
  
  return forecast.yearly_outlook.map(card => ({
    ...card,
    image: getCardImagePath(card.code)
  }));
}

export function getPlanetaryPeriodCards(birthDate, age, today) {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const birthCard = findBirthCard(month, day);
  
  const forecast = getForecastSpread(birthCard, age);
  
  if (forecast.error) {
    return [];
  }
  
  return forecast.planetary_cycles.map(card => ({
    ...card,
    image: getCardImagePath(card.code),
    isCurrent: true // Simplified for now
  }));
}

export function getCardDescription(card, label = "") {
  if (label === "Birth Card") {
    const profile = getCardProfile(card.code);
    return profile.description;
  }
  
  const activities = activitiesData[card.code];
  return activities || "No description found.";
}
