const fs = require("fs");
const path = require("path");

// Load the raw input JSON
const raw = require("./strings/binogi/countries-grades.json");

function transformCountryData(data) {
  const output = {};

  data.forEach(country => {
    const countryEntry = {
      country: country.title,
    };

    const hasRegions = country.school_types.some(st => st.region);

    if (!hasRegions) {
      countryEntry.region = "N/A";
      countryEntry.schoolTypes = country.school_types.map(st => ({
        title: st.title,
        grades: st.grades.map(g => g.title),
      }));
    } else {
      countryEntry.region = {};
      country.school_types.forEach(st => {
        const regionName = st.region || "Unknown Region";
        if (!countryEntry.region[regionName]) {
          countryEntry.region[regionName] = { schoolTypes: [] };
        }
        countryEntry.region[regionName].schoolTypes.push({
          title: st.title,
          grades: st.grades.map(g => g.title),
        });
      });
    }

    output[country.title] = countryEntry;
  });

  return output;
}

// Run transformation
const transformed = transformCountryData(raw);

// Save to a new file
const outputPath = path.join(__dirname, "./strings/binogi/transformed_country_data.json");
fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2), "utf-8");

console.log("✅ Transformed JSON saved to:", outputPath);
