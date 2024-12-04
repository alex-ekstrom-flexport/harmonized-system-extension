require('dotenv').config({ path: 'src/server/.env' })
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const OpenAI = require('openai')
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
const countryCodeLookup = require('country-code-lookup')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000 // Default to 3000 if PORT isn't set in .env

// Function to strip non-number characters from text
function stripNonNumberCharacters(text) {
  return text.replace(/\D/g, '').padEnd(10, '0')
}

app.post('/api/message', async (req, res) => {
  const { term, exportCountry, importCountry } = req.body
  const cleanedText = stripNonNumberCharacters(term)
  console.log('Cleaned text:', cleanedText)
  console.log('Export country:', exportCountry)
  console.log('Import country:', importCountry)
  let url =
    'https://www.trade-tariff.service.gov.uk/commodities/' +
    cleanedText +
    '/?currency=EUR'
  const exportCountryCode = countryCodeLookup.byCountry(exportCountry)?.iso2
  if (exportCountryCode) {
    url += '&country=' + exportCountryCode
  }
  try {
    responseHTML = await axios.get(url)
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Error 404: Resource not found')
      res.status(404).json({ error: 'Resource not found' })
    } else {
      console.error('Error fetching HTML:', error)
      res.status(500).json({ error: 'Failed to fetch HTML' })
    }
  }
  const parsedJson = await createCommodityCompletion(
    responseHTML.data,
    exportCountry,
    importCountry
  )
  console.log('Parsed JSON:', parsedJson)
  res.status(200).json([parsedJson])
})

async function testFunction() {
  const { term, exportCountry, importCountry } = {
    term: '9603.21',
    exportCountry: 'Russia',
    importCountry: 'United Kingdom',
  }
  const cleanedText = stripNonNumberCharacters(term)
  console.log('Cleaned text:', cleanedText)
  console.log('Export country:', exportCountry)
  console.log('Import country:', importCountry)
  let url =
    'https://www.trade-tariff.service.gov.uk/commodities/' +
    cleanedText +
    '/?currency=EUR'
  const exportCountryCode = countryCodeLookup.byCountry(exportCountry)?.iso2
  if (exportCountryCode) {
    url += '&country=' + exportCountryCode
  }
  try {
    responseHTML = await axios.get(url)
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Error 404: Resource not found')
      res.status(404).json({ error: 'Resource not found' })
    } else {
      console.error('Error fetching HTML:', error)
      res.status(500).json({ error: 'Failed to fetch HTML' })
    }
  }
  const parsedJson = await createCommodityCompletion(
    responseHTML.data,
    exportCountry,
    importCountry
  )
  console.log('Parsed JSON:', parsedJson)
  //res.status(200).json(parsedJson)
}

// Helper function to create OpenAI completion
async function createCommodityCompletion(
  responseData,
  exportCountry,
  importCountry
) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert customs broker' +
            'You will be provided the html of a page detailing commodititys information. Your job is to determine a report of the possible import controls, import duties, import VAT, and excise for this HS code in the HS code database for the given country. ' +
            'You are only allowed one sentence for each field. You need to be concise and accurate as possible. ',
        },
        {
          role: 'user',
          content:
            'Provide a report for this page: ' +
            responseData +
            '. You will be importing from ' +
            exportCountry +
            ' to ' +
            importCountry +
            '.',
        },
      ],
      response_format: {
        // See /docs/guides/structured-outputs
        type: 'json_schema',
        json_schema: {
          name: 'response_schema',
          schema: {
            type: 'object',
            properties: {
              description: {
                description: 'Description of good that is being imported',
                type: 'string',
              },
              htsno: {
                description:
                  'HS Code of the good that is being imported. Please parse this like an HS code in the format of `####.##.##.##`. Omit any double zeros from the HS code.',
                type: 'string',
              },
              general: {
                description:
                  'Import Duty for the good. Take the first one you see. Take the first one you see and should take the format of an exact percentage i.e. 10%. Put 0% if there are none. Do not include any words in this.',
                type: 'string',
              },
              special: {
                description:
                  'This is any VAT or excise duty for the good. Take the first one you see. Take the first one you see and should take the format of an exact percentage i.e. 10%. Put 0% if there are none. Do not include any words in this.',
                type: 'string',
              },
              other: {
                description:
                  'This is any Trade remedies, safeguards and retaliatory duties for the good if applicable for the export country. Take the first one you see and should take the format of an exact percentage i.e. 10%. Put 0% if there are none. Do not include any words in this.',
                type: 'string',
              },
            },
          },
        },
      },
    })

    if (
      completion &&
      completion.choices &&
      completion.choices[0] &&
      completion.choices[0].message
    ) {
      console.log('Response:', completion.choices[0].message.content)
      return {
        data: completion.choices[0].message.content,
      }
    } else {
      throw new Error('Invalid response from OpenAI')
    }
  } catch (error) {
    console.error('Error creating completion:', error)
    throw new Error('Failed to create completion')
  }
}

app.listen(PORT, async () => {
  // console.log('Testing function...')
  // console.log('Response:', await testFunction())
  console.log(`Server running on port ${PORT}`)
})
