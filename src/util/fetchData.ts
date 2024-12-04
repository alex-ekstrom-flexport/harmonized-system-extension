import axios from 'axios'
import { type HsCodeSearchResult } from '../util/searchUtil'

const searchByKeywordUrl = (term: string) =>
  `https://hts.usitc.gov/reststop/search?keyword=${term}`

export type HsCodeData = Readonly<{
  htsno: string
  description: string
  general: string
  special: string
  other: string
}>

export const searchByHsCode = async (
  term: string
): Promise<ReadonlyArray<HsCodeData>> => {
  const response = await fetch(searchByKeywordUrl(term), {
    headers: {
      accept: 'application/json, text/plain, */*',
    },
    method: 'GET',
    mode: 'cors',
  })
  return await response.json()
}

export const searchUkCommodity = async (
  term: string | null,
  exportCountry: string | null,
  importCountry: string | null
): Promise<HsCodeSearchResult> => {
  const res = await axios.post('http://localhost:5000/api/message', {
    term: term,
    exportCountry: exportCountry,
    importCountry: importCountry,
  })
  // Convert each data string to a JSON object
  return await res.data.map((jsonString: any) => JSON.parse(jsonString.data))
}
