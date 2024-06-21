import React, {useState, useEffect, FC, useCallback, ChangeEvent, useRef} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Box, Button, Card, Link, TextField } from '@mui/material'
import { useLocation } from '../../common/hooks'

interface ILocationProps {}

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
})

const reg = /^-?\d{0,2}(\.\d{0,7})?$/

export const Location: FC<ILocationProps> = () => {
  const [getLocation, setGetLocation] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [latitudeQuery, setLatitudeQuery] = useState('')
  const [longitudeQuery, setLongitudeQuery] = useState('')
  const [coords, setCoords] = useState<LatLngTuple>([0, 0])
  
  const latitudeQueryHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.currentTarget.value
    if (value.length === 10) return
    if (reg.test(value)) {
      setLatitudeQuery(value)
    }
  }
  const longitudeQueryHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.currentTarget.value
    if (value.length === 10) return
    if (reg.test(value)) {
      setLongitudeQuery(value)
    }
  }

  const getLocationHandler = () => {
    setGetLocation((loc) => !loc)
  }
  const setLocation = () => {
    setCoords([+latitudeQuery, +longitudeQuery])
    setShowMap(true)
  }

  const { location, error } = useLocation(getLocation, getLocationHandler)

  useEffect(() => {
    if (location) {
      setLatitudeQuery(location.latitude.toString())
      setLongitudeQuery(location.longitude.toString())
    }
    return () => {}
  }, [location])
  useEffect(() => {
    if (latitudeQuery && longitudeQuery) {
      setCoords([+latitudeQuery, +longitudeQuery])
    }
    return () => {}
  }, [latitudeQuery, longitudeQuery])

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          width: '300px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '200px',
          }}
        >
          <span>Enter your Location</span>
          <TextField
            label="Latitude"
            value={latitudeQuery}
            onChange={latitudeQueryHandler}
          />
          <TextField
            label="Longitude"
            value={longitudeQuery}
            onChange={longitudeQueryHandler}
          />
        </Box>
        <Box>
          <Button onClick={setLocation}>Set</Button>
        </Box>
      </Box>

      {error && <p>{error}</p>}
      {location && (
        <span
          style={{ marginBottom: '10px', width: '270px' }}
          onClick={() => setShowMap(true)}
        >
          Your location -{' '}
          <Link sx={{ cursor: 'pointer' }}>
            {latitudeQuery}, {longitudeQuery}
          </Link>
        </span>
      )}

      {latitudeQuery && longitudeQuery && showMap && (
        <Box sx={{ width: '100%' }}>
          <MapContainer
            center={coords}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={coords} icon={icon}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        </Box>
      )}
      <Button onClick={getLocationHandler}>Get Location</Button>
    </Card>
  )
}
