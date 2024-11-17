'use client'

import tmapAPI from '@/api/tmapAPI'
import { CarbonEmission } from '@/constants/emission'
import { useEffect, useRef, useState } from 'react'
import RouteInfoCard from './RouteInfoCard'

interface NaverMapProps {
  startX?: string
  startY?: string
  endX?: string
  endY?: string
}

export interface RouteData {
  legs: Array<{
    mode: string
    start: { lon: number; lat: number }
    end: { lon: number; lat: number }
    steps?: Array<{ linestring: string }>
    passShape?: { linestring: string }
    routeColor?: string
    distance: number
    route: string
    passStopList: { stationList: any[] }
  }>
}

declare global {
  interface Window {
    naver: any
  }
}

export default function NaverMap({ startX, startY, endX, endY }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [routeLegs, setRouteLegs] = useState<any[]>([])

  useEffect(() => {
    if (!mapRef.current || !window.naver) return

    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.5656, 126.9769),
      zoom: 14,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    })

    // 경로 검색이 요청된 경우
    if (startX && startY && endX && endY) {
      // Tmap API 호출
      const fetchRoute = async () => {
        try {
          const data: any = await tmapAPI('POST', 'https://apis.openapi.sk.com/transit/routes', {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
          })

          console.log(data)

          const routeData: RouteData = data.data.metaData.plan.itineraries[0]
          setRouteLegs(routeData.legs)

          // 시작점 마커
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(Number(startY), Number(startX)),
            map: map,
            icon: {
              content: '<div style="padding: 5px; background: #2196F3; color: white; border-radius: 50%;">출발</div>',
              anchor: new window.naver.maps.Point(20, 20),
            },
          })

          // 도착점 마커
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(Number(endY), Number(endX)),
            map: map,
            icon: {
              content: '<div style="padding: 5px; background: #F44336; color: white; border-radius: 50%;">도착</div>',
              anchor: new window.naver.maps.Point(20, 20),
            },
          })

          // 경로 그리기
          routeData.legs.forEach((leg) => {
            let totalEmission = 0

            if (leg.mode === 'WALK' && leg.steps) {
              // 도보 경로 그리기
              leg.steps.forEach((step) => {
                if (!step.linestring) return

                const coordinates = step.linestring.split(' ')
                const path = coordinates.map((coord) => {
                  const [lng, lat] = coord.split(',').map(Number)
                  return new window.naver.maps.LatLng(lat, lng)
                })

                new window.naver.maps.Polyline({
                  path,
                  strokeColor: '#666666',
                  strokeWeight: 5,
                  strokeOpacity: 0.8,
                  map,
                })

                // 탄소량 계산
                totalEmission += leg.distance * CarbonEmission.WALK_EMISSION
              })
            } else if (leg.passShape?.linestring) {
              // 대중교통 경로 그리기
              const coordinates = leg.passShape.linestring.split(' ')
              const path = coordinates.map((coord) => {
                const [lng, lat] = coord.split(',').map(Number)
                return new window.naver.maps.LatLng(lat, lng)
              })

              new window.naver.maps.Polyline({
                path,
                strokeColor: `#${leg.routeColor || '2196F3'}`,
                strokeWeight: 5,
                strokeOpacity: 0.8,
                map,
              })

              // 탄소량 계산
              totalEmission += leg.distance * CarbonEmission.BUS_EMISSION
            }
            console.log(totalEmission)
          })

          // 경로가 모두 보이도록 지도 영역 조정
          const bounds = new window.naver.maps.LatLngBounds(new window.naver.maps.LatLng(Number(startY), Number(startX)), new window.naver.maps.LatLng(Number(endY), Number(endX)))
          map.fitBounds(bounds)
        } catch (error) {
          console.error('Route fetch error:', error)
        }
      }

      fetchRoute()
    }

    return () => {
      map?.destroy()
    }
  }, [startX, startY, endX, endY])

  return (
    <div className="relative h-screen w-screen">
      <div ref={mapRef} className="h-full w-full" />
      {routeLegs.length > 0 && <RouteInfoCard legs={routeLegs} />}
    </div>
  )
}
