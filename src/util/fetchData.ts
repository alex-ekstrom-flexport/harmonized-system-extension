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
