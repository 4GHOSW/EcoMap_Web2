import { CarbonEmission } from '@/constants/emission'
import { RouteData } from './NaverMap'
import Image from 'next/image'
import { getImagePath } from '@/util/path'

const EMISSION_BY_MODE = {
  WALK: CarbonEmission.WALK_EMISSION,
  BUS: CarbonEmission.BUS_EMISSION,
  SUBWAY: CarbonEmission.TRAIN_EMISSION,
} as const

const TRANSPORT_ICONS = {
  WALK: {
    src: getImagePath('/image/common/walking.png'),
    alt: '도보',
  },
  BUS: {
    src: getImagePath('/image/common/bus.png'),
    alt: '버스',
  },
  SUBWAY: {
    src: getImagePath('/image/common/train.png'),
    alt: '지하철',
  },
} as const

const CloudBox = ({ value }: { value: string }) => (
  <div className="relative flex items-center justify-center">
    <div className="absolute -top-24 h-[60px] w-[100px]">
      <Image src={getImagePath('/image/common/cloud.png')} alt="cloud" fill className="object-contain" priority />
      <span className="absolute inset-0 z-10 flex items-center justify-center text-sm">{value}</span>
    </div>
  </div>
)

const RouteInfoCard = ({ legs }: { legs: RouteData['legs'] }) => {
  // 총 탄소량 계산
  const calculateTotalEmission = () => {
    return legs.reduce((total, leg) => {
      const emissionRate = EMISSION_BY_MODE[leg.mode] || 0
      const distanceInKm = leg.distance / 1000
      return total + emissionRate * distanceInKm
    }, 0)
  }

  // 표시 형식을 위한 유틸리티 함수
  const formatEmission = (emission: number) => {
    if (emission >= 1) {
      // 1kg 이상일 경우 kg으로 표시, 소수점 2자리까지
      return `${emission.toFixed(2)} kg CO₂`
    } else {
      // 1kg 미만일 경우 g으로 변환하여 표시
      const grams = emission * 1000
      return `${grams.toFixed(1)} g CO₂`
    }
  }

  return (
    <div className="fixed bottom-8 left-1/2 h-[250px] w-[340px] -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg">
      <div className="mb-4 text-sm font-medium">
        총 탄소 배출량
        <span className="float-right">{formatEmission(calculateTotalEmission())}</span>
      </div>

      {/* 경로 시각화 */}
      <div className="relative h-28">
        <div className="absolute bottom-0 left-0 right-0 flex w-full items-center">
          {legs.map((leg, index) => (
            <div key={index} className="relative flex-1">
              {/* 구름 모양 탄소 배출량 */}
              <CloudBox value={formatEmission((leg.distance / 1000) * (EMISSION_BY_MODE[leg.mode] || 0))} />

              {/* 경로 라인 */}
              <div
                className="h-2 flex-1"
                style={{
                  backgroundColor: leg.mode === 'WALK' ? '#666666' : leg.mode === 'SUBWAY' ? `#${leg.routeColor || 'FFA500'}` : '#4B0082',
                }}
              />

              {/* 교통수단 아이콘 */}
              <div className="absolute bottom-3 left-0">
                <div className="relative h-8 w-8 rounded-full bg-white shadow-md">
                  <Image src={TRANSPORT_ICONS[leg.mode].src} alt={TRANSPORT_ICONS[leg.mode].alt} fill className="object-contain p-1" priority />
                </div>
              </div>

              {/* 정류장/역 이름 */}
              {leg.mode !== 'WALK' ? (
                <div className="absolute -bottom-10 left-0 whitespace-nowrap text-xs">
                  {leg.route} {leg.mode === 'BUS' ? '번' : ''}
                </div>
              ) : (
                <div className="absolute -bottom-10 left-0 whitespace-nowrap text-xs">도보</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RouteInfoCard
