import React from 'react'

import { createUseStyles } from 'react-jss'
import { Stack, Typography } from '@mui/material'

import HSCodeResult from './HSCodeResult'
import type { HsCodeSearchResult } from '../../util/searchUtil'

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
            <HSCodeResult heading={primaryResult.htsno} description={primaryResult.description} suffix='' hsRates=''/>
        </Stack>
        )}
        {otherResults.length > 0 && (
          <Stack>
            <Typography className={styles.label}>{primaryResult != null ? "Similar Results" : "Results"}</Typography>
            <Stack>
              {otherResults.map(result => (
                  <HSCodeResult heading={result.htsno} description={result.description} suffix='' hsRates=''/>
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