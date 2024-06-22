import { useState } from 'react'

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        setError(null)
      },
      () => {
        setError('Unable to retrieve your location')
      },
    )
  }

  return { location, error, getCurrentLocation }
}
