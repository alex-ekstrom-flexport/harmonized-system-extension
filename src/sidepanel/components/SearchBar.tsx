import React from 'react'

import { createUseStyles } from 'react-jss'

type Props = Readonly<{
  searchTerm: string,
  onChange: (arg0: string) => void,
}>

const SearchBar: React.FC<Props> = ({searchTerm, onChange}: Props) => {
  const styles = useStyles()
  const [term, setTerm] = React.useState<string>("")

  React.useEffect(() => {
    setTerm(searchTerm)
  }, [searchTerm])

  return (
    <input className={styles.input} value={term} onChange={e => setTerm(e.target.value)} onBlur={() => onChange(term)} />
  )
}

const useStyles = createUseStyles({
    input: {
      height: '1em',
      borderRadius: '3px',
    },
  })

export default SearchBar