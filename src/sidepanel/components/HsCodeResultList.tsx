import React from 'react'

import { createUseStyles } from 'react-jss'
import { Stack, Typography } from '@mui/material'

import type { HsCodeSearchResult } from '../../util/searchUtil'
import HSCodeResultCard from './HSCodeResultCard'

type Props = Readonly<{
  hsCodeData: HsCodeSearchResult,
}>

const HsCodeResultList: React.FC<Props> = ({hsCodeData}: Props) => {
  const styles = useStyles()

  const primaryResult = hsCodeData[0]
  const otherResults = hsCodeData[1]

  return (
    <div>
        {primaryResult != null && (
        <Stack>
            <Typography className={styles.label}>Primary Match</Typography>
            <HSCodeResultCard htsno={primaryResult.htsno} description={primaryResult.description} general={primaryResult.general} special={primaryResult.special} other={primaryResult.other} />
        </Stack>
        )}
        {otherResults.length > 0 && (
          <Stack>
            <Typography className={styles.label}>{primaryResult != null ? "Similar Results" : "Results"}</Typography>
            <Stack>
              {otherResults.map(result => (
                  <HSCodeResultCard htsno={result.htsno} description={result.description} general={result.general} special={result.special} other={result.other}/>
              ))}
            </Stack>
          </Stack>
        )}
    </div>
  )
}

const useStyles = createUseStyles({
    label: {
      color: 'grey',
      paddingTop: '0.5em',
    }
  })

export default HsCodeResultList