'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    naver: any
  }
}

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // 스크립트 로딩 확인을 위한 인터벌 설정
    const initializeMap = () => {
      if (!mapRef.current || !window.naver) return false

      const location = new window.naver.maps.LatLng(37.5656, 126.9769)
      const mapOptions = {
        center: location,
        zoom: 14,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      }

      const map = new window.naver.maps.Map(mapRef.current, mapOptions)

      new window.naver.maps.Marker({
        position: location,
        map: map,
      })

      return true
    }

    // naver 객체가 로드될 때까지 대기
    const interval = setInterval(() => {
      if (initializeMap()) {
        clearInterval(interval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '500px',
        backgroundColor: '#E5E7EB', // 지도 로딩 전 배경색
      }}
    />
  )
}
