const express = require("express");
const router = express.Router();
const path = require("path");
const oneSkyData = require(path.join(__dirname, "../strings/binogi/OneSky.json")); 

// Helper function to find translations
function findTranslations(textToFind) {
    const result = {};
  
    const enTranslations = oneSkyData["en"]?.translation;
    if (!enTranslations) {
      throw new Error("English translations not found.");
    }
  
    let matchedKey = null;
  
    const normalizedTextToFind = textToFind.trim().toLowerCase();
  
    // Step 1: Find the KEY for the given English text (case insensitive + contains)
    function findKey(obj, parentKey = "") {
      for (const key in obj) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === "object") {
          const found = findKey(obj[key], fullKey);
          if (found) return found;
        } else {
          const value = (obj[key] || "").trim().toLowerCase();
          if (value.includes(normalizedTextToFind)) {
            return fullKey; // Return the full path to the matching key
          }
        }
      }
      return null;
    }
  
    matchedKey = findKey(enTranslations);
  
    if (!matchedKey) {
      throw new Error(`❌ No matching key found in English for text: "${textToFind}"`);
    }
  
    // Step 2: Fetch the value for that key from each language
    for (const lang of Object.keys(oneSkyData)) {
      const translations = oneSkyData[lang]?.translation;
      if (!translations) {
        result[lang] = null;
        continue;
      }
  
      const value = getValueByPath(translations, matchedKey);
      result[lang] = value || null;
    }
  
    return result;
  }
  

function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }
  


// GET /translate route
router.get("/translate", (req, res) => {
  const query = req.query.text;
  let translations = null;
  
  if (query) {
    translations = findTranslations(query);
  }
  
  res.render("translation", { query, translations });
});

module.exports = router;