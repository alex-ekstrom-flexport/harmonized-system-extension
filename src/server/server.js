require('dotenv').config({ path: 'src/server/.env' })
const express = require('express')
const cors = require('cors')
const OpenAI = require('openai')
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000 // Default to 3000 if PORT isn't set in .env

app.post('/api/message', async (req, res) => {
  const { text } = req.body
  const exportCountry = 'Russia'
  const importCountry = 'United Kingdom'

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert customs broker in international freight forwarding. ' +
            'You will be provided either an HS code or a description of the good to determine a report of the possible import controls, import duties, import VAT, and excise for every commodity containing this HS code or product descriptions in the HS code database for the given country. ' +
            'Please provide a summary of the results in one sentence especially rate fields. ' +
            "For example, search query  '9002' would return results for all commodities with the chapter '9002' at the start of its HS code. " +
            "Additionally, search query 'books', would return every commodity with the word 'books' in its description" +
            'provide the most up to date information as possible.',
        },
        {
          role: 'user',
          content:
            'Provide a report for the good or HS code ' +
            text +
            ' when the export country is  ' +
            exportCountry +
            ' and the import country is ' +
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
              goods_information: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    descriptionOfGood: {
                      description: 'Description of good that is being imported',
                      type: 'string',
                    },
                    hsCode: {
                      description: 'HS Code of the good that is being imported',
                      type: 'string',
                    },
                    importDuties: {
                      description: 'Import Duty Rate for the good.',
                      type: 'string',
                    },
                    exportCountry: {
                      description: 'Country of export for import duty.',
                      type: 'string',
                    },
                    importCountry: {
                      description: 'Country of import for import duty.',
                      type: 'string',
                    },
                    measureType: {
                      description:
                        'Any law that has an effect on the trade of goods.',
                      type: 'string',
                    },
                    importVAT: {
                      description: 'Import VAT Rate for the good.',
                      type: 'string',
                    },
                    importControls: {
                      description: 'Import Controls for the good.',
                      type: 'string',
                    },
                    importExcise: {
                      description: 'Import Excise for the good.',
                      type: 'string',
                    },
                    importSuspensions: {
                      description: 'Suspensions for the good',
                      type: 'string',
                    },
                    linkToSource: {
                      description:
                        'Link to the page where I can find more information of the exact good. Please provide the link in the following format https://www.trade-tariff.service.gov.uk/commodities/{hs_code_here}',
                      type: 'string',
                    },
                  },
                },
                additionalProperties: false,
                required: [
                  'descriptionOfGood',
                  'hsCode',
                  'importDuties',
                  'exportCountry',
                  'importCountry',
                  'linkToSource',
                ],
              },
            },
          },
        },
      },
    })

    res.json({
      response: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error('Error creating completion:', error)
    res.status(500).json({ error: 'Failed to create completion' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
