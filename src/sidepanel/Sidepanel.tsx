import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Stack } from '@mui/material'

import SearchBar from '../sidepanel/components/SearchBar'
import LoadingSpinner from './components/LoadingSpinner'
import {
  findCodeWithPrimaryMatch,
  type HsCodeSearchResult,
} from '../util/searchUtil'
import { searchUkCommodity } from '../util/fetchData'
import HsCodeResultList from '../sidepanel/components/HsCodeResultList'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CountrySelectInput from './components/CountrySelectInput'

const Sidepanel: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [originCountry, setOriginCountry] = useState<string | null>('China')
  const [destinationCountry, setDestinationCountry] = useState<string | null>(
    'United States'
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchData, setSearchData] = React.useState<HsCodeSearchResult>([
    null,
    [],
  ])

  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  })

  // Listen for changes to the selected text in storage
  const handleStorageChange = (changes: {
    [key: string]: chrome.storage.StorageChange
  }) => {
    const selectedTextChange = changes['selectedText']

    if (selectedTextChange) {
      setSelectedText(selectedTextChange.newValue)
    }
  }

  // On component mount
  useEffect(() => {
    ;(async () => {
      const result = await chrome.storage.local.get('selectedText')
      if (result.selectedText) {
        setSelectedText(result.selectedText)
      }
      chrome.storage.onChanged.addListener(handleStorageChange)

      // Cleanup listener on component unmount
      return () => {
        chrome.storage.onChanged.removeListener(handleStorageChange)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (selectedText != null) {
        setIsLoading(true)
        let result: HsCodeSearchResult = [null, []]
        if (destinationCountry === 'United Kingdom') {
          result = await searchUkCommodity(
            selectedText,
            originCountry,
            destinationCountry
          )
        } else if (destinationCountry === 'United States') {
          result = await findCodeWithPrimaryMatch(selectedText)
        }
        setSearchData(result)
        setIsLoading(false)
      }
    })()
  }, [selectedText, originCountry, destinationCountry])

  return (
    <ThemeProvider theme={theme}>
      <div className="Sidepanel" style={{ height: '98vh' }}>
        <Stack spacing={2}>
          <SearchBar
            searchTerm={selectedText ?? ''}
            onChange={setSelectedText}
          />
          <Stack direction="row" spacing={1}>
            <CountrySelectInput
              country={originCountry}
              countryType="Origin"
              onChange={setOriginCountry}
            />
            <CountrySelectInput
              country={destinationCountry}
              countryType="Destination"
              onChange={setDestinationCountry}
            />
          </Stack>
        </Stack>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <HsCodeResultList hsCodeData={searchData} />
        )}
      </div>
    </ThemeProvider>
  )
}

export default Sidepanel
