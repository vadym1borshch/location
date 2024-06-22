import { SxProps, Theme } from '@mui/material'

export const locationStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: 1,
  position: 'relative',
  '& .textAreasContainer': {
    display: 'flex',
    gap: 1,
    width: '300px',
    alignItems: 'center',
    '& .textAreas': {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      width: '200px',
    },
  },
  '& .coordsContainer': {
    marginBottom: '10px',
    width: '270px',
    '& a': {
      cursor: 'pointer',
    },
  },
  '& .mapContainer': {
    width: '100%',
    margin: '5px 0',
    '& .leaflet-container': {
      height: '400px',
      width: '100%',
    },
  },
}
