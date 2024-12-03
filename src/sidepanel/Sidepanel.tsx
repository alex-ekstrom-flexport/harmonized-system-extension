import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Stack } from '@mui/material'

import SearchBar from '../sidepanel/components/SearchBar'
import {
  findCodeWithPrimaryMatch,
  type HsCodeSearchResult,
} from '../util/searchUtil'
import HsCodeResultList from '../sidepanel/components/HsCodeResultList'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CountrySelectInput from './components/CountrySelectInput'

const Sidepanel: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [originCountry, setOriginCountry] = useState<string | null>('United Kingdom')
  const [destinationCountry, setDestinationCountry] = useState<string | null>('United States')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [responseText, setResponseText] = useState<string | null>(null)
  const [searchData, setSearchData] = React.useState<HsCodeSearchResult>([
    null,
    [],
  ])

  const theme = createTheme({
    typography: {
      fontFamily: "Helvetica Neue",}
  });

  const sendMessage = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/message', {
        text: selectedText,
      })
      setResponseText(res.data.response)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

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
        const result = await findCodeWithPrimaryMatch(selectedText)
        setSearchData(result)
        sendMessage()
        setIsLoading(false) // Set loading to false after data is loaded
      }
    })()
  }, [selectedText])
  if (isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <ThemeProvider theme={theme}>
      <div className="Sidepanel">
        <Stack spacing={2}>
          <p>{responseText}</p>
          <SearchBar searchTerm={selectedText ?? ''} onChange={setSelectedText} />
          <Stack direction="row" spacing={1}>
            <CountrySelectInput country={originCountry} countryType='Origin' onChange={setOriginCountry}/>
            <CountrySelectInput country={destinationCountry} countryType='Destination' onChange={setDestinationCountry}/>
          </Stack>
        </Stack>
        <HsCodeResultList hsCodeData={searchData} />
      </div>
        </ThemeProvider>
    )
  }
}

export default Sidepanel
