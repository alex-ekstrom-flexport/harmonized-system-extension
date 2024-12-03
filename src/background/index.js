import {findCodeWithPrimaryMatch} from '../util/searchUtil'

function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'searchHSCodeInfo',
    title: 'Lookup HS Code Information',
    contexts: ['selection'],
  })
}

chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu()
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
})

chrome.contextMenus.onClicked.addListener((data, tab) => {
  // Store the last word in chrome.storage.session.
  chrome.storage.session.set({ selectedText: data.selectionText })

  // Make sure the side panel is open.
  chrome.sidePanel.open({ tabId: tab.id })
})
