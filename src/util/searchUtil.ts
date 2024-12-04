import { searchByHsCode, type HsCodeData } from './fetchData'

export type HsCodeSearchResult = Readonly<
  [HsCodeData | null, ReadonlyArray<HsCodeData>]
>

export const findCodeWithPrimaryMatch = async (
  term: string
): Promise<HsCodeSearchResult> => {
  const result = await searchByHsCode(term)
  const index = result.findIndex(
    (data) => data.htsno === term || data.htsno.replace(/./g, '') === term
  )
  if (index === -1) {
    return [null, result]
  } else {
    return [
      result[index],
      [...result.slice(0, index), ...result.slice(index + 1)],
    ]
  }
}
