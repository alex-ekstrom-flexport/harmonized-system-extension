import React, { useEffect, useState } from 'react'

const words: { [key: string]: string } = {
  extensions:
    'Extensions are software programs, built on web technologies (such as HTML, CSS, and JavaScript) that enable users to customize the Chrome browsing experience.',
  popup:
    "A UI surface which appears when an extension's action icon is clicked.",
}

const Sidepanel: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null)
  useEffect(() => {
    // Get the initial selected text from storage
    chrome.storage.local.get('selectedText', ({ selectedText }) => {
      setSelectedText(selectedText)
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

    chrome.storage.onChanged.addListener(handleStorageChange)

    // Cleanup listener on component unmount
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [])

  return (
    <div className="Sidepanel">
      <h1 id="selected-text">Selected text: {selectedText}</h1>
    </div>
  )
}

export default Sidepanel
