import React, { useEffect, useState } from 'react'
import axios from 'axios'

import SearchBar from '../sidepanel/components/SearchBar'
import {
  findCodeWithPrimaryMatch,
  type HsCodeSearchResult,
} from '../util/searchUtil'
import HsCodeResultList from '../sidepanel/components/HsCodeResultList'

const Sidepanel: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [responseText, setResponseText] = useState<string | null>(null)
  const [searchData, setSearchData] = React.useState<HsCodeSearchResult>([
    null,
    [],
  ])

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
  }, [selectedText])

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
      <div className="Sidepanel">
        <SearchBar searchTerm={selectedText ?? ''} onChange={setSelectedText} />
        <HsCodeResultList hsCodeData={searchData} />
      </div>
    )
  }
}

export default Sidepanel
