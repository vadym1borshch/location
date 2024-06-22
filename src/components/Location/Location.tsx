import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { Icon, IconOptions, LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { TextField, Button, Box, Card } from '@mui/material'
import { locationStyles } from './locationStyles'
import { useCurrentLocation } from '../../common/hooks'
import { TransitionsModal } from '../Modal/Modal'

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
})

interface ILocationProps {
  zoom?: number
  icon?: Icon<IconOptions>
}

export const Location: React.FC<ILocationProps> = ({
  zoom = 13,
  icon = DefaultIcon,
}) => {
  const [latitude, setLatitude] = useState<number | string>('')
  const [longitude, setLongitude] = useState<number | string>('')
  const [location, setLocation] = useState<LatLngTuple | null>(null)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  const {
    location: currentLocation,
    error: geoError,
    getCurrentLocation,
  } = useCurrentLocation()

  const validateCoordinates = (lat: number, lng: number): boolean => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
  }

  const handleSetLocation = () => {
    const lat = Number(latitude)
    const lng = Number(longitude)
    if (validateCoordinates(lat, lng)) {
      setLocation([lat, lng])
      if (mapRef.current) {
        mapRef.current.setView([lat, lng], zoom)
      }
      setError(null)
    } else {
      setError(
        'Invalid coordinates. Latitude must be between -90 and 90, and Longitude must be between -180 and 180.',
      )
    }
  }

  const resetError = () => {
    setError(null)
    setLatitude('')
    setLongitude('')
  }

  useEffect(() => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation
      setLatitude(latitude)
      setLongitude(longitude)
      setLocation([latitude, longitude])
      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], zoom)
      }
    }
  }, [currentLocation])

  useEffect(() => {
    if (geoError) setError(geoError)
  }, [geoError])

  return (
    <Card sx={locationStyles}>
      <TransitionsModal
        open={!!error}
        close={resetError}
        buttonChildren="Close"
      >
        {error} Example: Latitude 48.8584, Longitude 2.2945 (Eiffel Tower).
      </TransitionsModal>
      <Box className="textAreasContainer">
        <Box className="textAreas">
          <span>Enter your Location</span>
          <TextField
            label="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <TextField
            label="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSetLocation}
          >
            Set Location
          </Button>
        </Box>
      </Box>
      {location && (
        <Box className="mapContainer">
          <MapContainer
            className="mapContainer"
            center={location}
            zoom={zoom}
            //@ts-ignore
            whenReady={(event) => {
              if (event) mapRef.current = event.target
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location} icon={icon}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        </Box>
      )}
      <Button
        sx={{ width: '250px', alignSelf: 'center', marginBottom: '5px' }}
        variant="contained"
        color="secondary"
        onClick={getCurrentLocation}
      >
        Get Current Location
      </Button>
    </Card>
  )
}
