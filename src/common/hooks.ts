import {ChangeEvent, useEffect, useState} from 'react'

export const useLocation = (determPos: boolean = true, callback?: Function) => {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (determPos) {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser')
        return
      }

      const success = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setLocation({ latitude, longitude })
        callback && callback()
      }

      const geoError = () => {
        setError('Unable to retrieve your location')
      }
      navigator.geolocation.getCurrentPosition(success, geoError)
    }
  }, [determPos, callback])
  return { location, error }
}
