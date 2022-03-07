import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'
import { FaDivide } from 'react-icons/fa'

function Mapped() {
  const googlemap = useRef(null)
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      // version: 'weekly',
    })
    let map
    loader.load().then(() => {
      map = new google.maps.Map(googlemap.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      })
    })
  })
  return (
    // <div id='map' ref={googlemap} />
    <div id='map' ref={googlemap}>
      There should be a map here
    </div>
  )
}
export default Mapped
