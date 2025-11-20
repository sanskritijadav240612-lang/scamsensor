import express from 'express';
import {GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import cors from 'cors';

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const CACHE_DIR = './cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function generateCacheKey(topic, sub_topic, tags) {
  const data = JSON.stringify({ topic, sub_topic, tags });
  return crypto.createHash('md5').update(data).digest('hex');
}

function getCacheFilePath(cacheKey) {
  return path.join(CACHE_DIR, `${cacheKey}.json`);
}

function getCachedResponse(cacheKey) {
  try {
    const filePath = getCacheFilePath(cacheKey);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const cached = JSON.parse(fileContent);

    const now = Date.now();
    if (now - cached.timestamp > CACHE_DURATION) {
      fs.unlinkSync(filePath);
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

function setCachedResponse(cacheKey, data) {
  try {
    const filePath = getCacheFilePath(cacheKey);
    const cacheData = {
      timestamp: Date.now(),
      data: data
    };
    fs.writeFileSync(filePath, JSON.stringify(cacheData, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

function cleanOldCache() {
  try {
    if (!fs.existsSync(CACHE_DIR)) return;

    const files = fs.readdirSync(CACHE_DIR);
    const now = Date.now();

    files.forEach(file => {
      const filePath = path.join(CACHE_DIR, file);
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const cached = JSON.parse(fileContent);
        
        if (now - cached.timestamp > CACHE_DURATION) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        console.error(`Error processing cache file ${file}:`, error);
      }
    });
  } catch (error) {
    console.error('Error cleaning cache:', error);
  }
}

setInterval(cleanOldCache, 60 * 60 * 1000);

app.post('/generate', async (req, res) => {
  try {

    if(!req.body) {
      return res.status(400).json({ error: 'No body provided' });
    }
    const { topic, sub_topic, tags } = req.body;

    if (!topic || !sub_topic || !tags) {
      return res.status(400).json({ error: 'topic, sub_topic, and tags are required' });
    }

    const cacheKey = generateCacheKey(topic, sub_topic, tags);
    const cachedResponse = getCachedResponse(cacheKey);

    if (cachedResponse) {
      console.log('Returning cached response');
      return res.json(cachedResponse);
    }

    const prompt = `You are a Fraud Awareness Guide for ScamSense, a platform that teaches people about scams using very simple, calm, friendly English that even a 12-year-old or an elder person can understand.



Your goal is to keep users safe without scaring them.

## Tone Rules

* Use short, simple, everyday English.

* Stay friendly, calm, and supportive.

* Never use technical or expert words.

* Forbidden terms include:

  "API", "server", "database", "SSL", "protocol", "backend", "firewall",

  "algorithm", "DNS", "IP address", "encryption", "spoofing",

  "malware", "system error", "gateway", "security tool",

  or any technical concept.

* No fear-based or dramatic warnings.

* Never blame the user or imply it was their fault.

## Content Rules

* Never rename, remove, change, or reinterpret the given:

  * topic

  * sub_topic

  * tags

* Use maximum 3 bullet points for every list field.

* Each bullet must be short (only one simple sentence).

* Keep explanations clear, non-technical, and easy to understand.

* Use Indian examples only when giving real-world examples.

* Give only everyday actions, not technical details.

* Do NOT add new scam types or ideas outside the given topic/sub_topic/tags.

* "important_tips" must include general Indian safety habits

  (e.g., not sharing OTP, keeping documents safe, checking payment links).

* In \`tags_used\`, include exactly the tags from input—no additions or removals.

## JSON Output Rules

You must respond only with valid JSON.

Keys must appear in this exact order:

1. topic

2. sub_topic

3. tags_used

4. overview

5. important_tips

6. how_it_works

7. red_flags

8. prevention_steps

9. real_world_examples

10. what_to_do_if_you_are_a_victim

11. safe_checklist

12. legal_help_and_reporting

13. ai_confidence

Additional rules:

* No extra keys.

* No missing keys.

* No renaming keys.

* No trailing commas anywhere.

* JSON must be strictly valid.

## ai_confidence Rule

* Must be a number between 0 and 1, such as \`0.87\`.

* No words, no explanation.

## INPUT Format

Topic: "${topic}"

Category: "${sub_topic}"

Tags: "${tags}"

## OUTPUT Format

Only strict JSON, for example:

{

  "topic": "...",

  "sub_topic": "...",

  "tags_used": [...],

  ...

  "ai_confidence": 0.92

}`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const text = response.text;

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    let jsonResponse;
    
    if (jsonMatch) {
      jsonResponse = JSON.parse(jsonMatch[0]);
    } else {
      jsonResponse = JSON.parse(text);
    }

    setCachedResponse(cacheKey, jsonResponse);
    console.log('Response cached successfully');
    
    res.json(jsonResponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

