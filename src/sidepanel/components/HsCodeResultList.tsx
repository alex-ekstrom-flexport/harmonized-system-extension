import React from 'react'

import { createUseStyles } from 'react-jss'

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
        <div className={styles.labeledGroup}>
            <span className={styles.label}>Primary Match</span>
            <HSCodeResult heading={primaryResult.htsno} description={primaryResult.description} suffix='' hsRates=''/>
        </div>
        )}
        {otherResults.length > 0 && (
          <div className={styles.labeledGroup}>
            <span className={styles.label}>{primaryResult != null ? "Similar Results" : "Results"}</span>
            {otherResults.map(result => (
                <HSCodeResult heading={result.htsno} description={result.description} suffix='' hsRates=''/>
            ))}
          </div>
        )}
    </div>
  )
}

const useStyles = createUseStyles({
    labeledGroup: {
      display: 'flex',
      flexDirection: "column",
    },
    label: {
      color: 'grey',
      fontSize: '0.75em',
    }
  })

export default HsCodeResultList