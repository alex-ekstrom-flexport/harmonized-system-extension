import React from 'react'

import { Autocomplete, TextField } from '@mui/material'
import CountryJs from 'country-list-js'

type Props = Readonly<{
  country: string | null,
  countryType: "Origin" | "Destination"
  onChange: (arg0: string | null) => void,
}>

const CountrySelectInput: React.FC<Props> = ({ country, countryType, onChange }: Props) => {
  const countries = countryType === "Origin"
    ? CountryJs.names()
    : ["United States", "United Kingdom"] 

  return <Autocomplete
    disablePortal
    options={countries}
    sx={{width: '100%'}}
    value={country}
    onChange={(event: any, newValue: string | null) => {
        onChange(newValue);
    }}
    renderInput={(params) => (
        <TextField {...params} 
            label={`${countryType} Country`}
            fullWidth
        />)}
    />
}

export default CountrySelectInput;