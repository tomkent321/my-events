import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'
import { FaSleigh } from 'react-icons/fa'

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewport, setViewport] = useState({
    latitude: 39.90046573460172,
    longitude: -104.998696354362,
    width: '100%',
    height: '500px',
    zoom: 12,
  })

useEffect(()=>{
    //Get lat and long from address
Geocode.fromAddress(evt.address).then(
    (response)=> {
        const {lat, lng} = response.results[0].geometery.location;
        setLat(lat)
        setLng(lng)
        setViewport({...visualViewport, latitude: lat, longitude: lng})
        setLoading(false)
       
    },
    (error) => {
        console.log(error)
    }
);
}, [])


  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

  if(loading) return false 
  console.log(lat, lng)
  return <div>Map</div>
}
