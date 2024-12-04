import React from 'react'
import {
  Box,
  Stack,
  IconButton,
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

interface ResultProps {
  htsno: string
  description: string
  general: string
  special: string
  other: string
}
const HSCodeResultCard: React.FC<ResultProps> = ({
  htsno,
  description,
  general,
  special,
  other,
}) => {
  const headers = ['General', 'Special', 'Other']

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 4,
        p: 1,
        margin: '0 auto',
      }}
    >
      <Accordion sx={{ backgroundColor: '#F4F2EF' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'coral' }} />}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Stack direction="column" sx={{ flexGrow: 1, width: '100%' }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: '100%', userSelect: 'text' }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#24303E',
                  fontFamily: 'HELVETICA NEUE',
                  flexGrow: 1,
                  userSelect: 'text',
                }}
              >
                {htsno}
              </Typography>
              <Link
                href={`https://hts.usitc.gov/search?query=${htsno}`}
                underline="always"
                target="_blank"
                variant="body1"
                color="text.primary"
                sx={{ fontWeight: 'bold', ml: 'auto', userSelect: 'text' }}
              >
                <IconButton aria-label="info">
                  <OpenInNewIcon sx={{ color: '#566AE5' }} />
                </IconButton>
              </Link>
            </Stack>
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
              {description}
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, flexGrow: 1, width: '100%' }}>
          <TableContainer component={Paper}>
            <Table
              sx={{
                '& .MuiTableCell-root': {
                  padding: '4px',
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={headers.length}
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '1.2em',
                    }}
                  >
                    Rates of Duty
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{ textAlign: 'center', width: '33.33%' }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                <TableRow>
                  {[general, special, other].map((rate, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{ textAlign: 'center', width: '33.33%' }}
                    >
                      {rate === '' ? '--' : rate}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default HSCodeResultCard
