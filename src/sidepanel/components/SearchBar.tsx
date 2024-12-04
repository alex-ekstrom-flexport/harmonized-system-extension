import React from 'react'

import { TextField } from '@mui/material'

type Props = Readonly<{
  searchTerm: string
  onChange: (arg0: string) => void
}>

const SearchBar: React.FC<Props> = ({ searchTerm, onChange }: Props) => {
  const [term, setTerm] = React.useState<string>('')

  React.useEffect(() => {
    setTerm(searchTerm)
  }, [searchTerm])

  return (
    <TextField
      label="Search"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      onBlur={() => onChange(term)}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter') {
          ev.preventDefault()
          onChange(term)
        }
      }}
      fullWidth
    />
  )
}

export default SearchBar
