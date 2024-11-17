import { CarbonEmission } from '@/constants/emission'
import { RouteData } from './NaverMap'

const RouteInfoCard = ({ legs }: { legs: RouteData['legs'] }) => {
  const calculateTotalEmission = () => {
    return legs.reduce((total, leg) => {
      const emission = leg.mode === 'WALK' ? leg.distance * CarbonEmission.WALK_EMISSION : leg.distance * CarbonEmission.BUS_EMISSION
      return total + emission
    }, 0)
  }

  return (
    <div className="fixed bottom-8 left-1/2 w-[340px] -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg">
      <div className="mb-4 text-sm font-medium">
        총 탄소 배출량
        <span className="float-right">{calculateTotalEmission().toFixed(1)} mg</span>
      </div>

      <div className="flex items-center space-x-1">
        {legs.map((leg, index) => (
          <div key={index} className="flex flex-1 items-center">
            {/* 교통수단 아이콘 */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
              {leg.mode === 'WALK' ? <span className="text-xs">🚶</span> : leg.mode === 'SUBWAY' ? <span className="text-xs">🚇</span> : <span className="text-xs">🚌</span>}
            </div>

            {/* 경로 라인 */}
            {index < legs.length - 1 && (
              <div
                className="h-[2px] flex-1"
                style={{
                  backgroundColor: leg.routeColor ? `#${leg.routeColor}` : '#666666',
                }}
              />
            )}

            {/* 탄소 배출량 */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-white px-2 py-1 text-xs shadow-sm">
              {(leg.distance * (leg.mode === 'WALK' ? CarbonEmission.WALK_EMISSION : CarbonEmission.BUS_EMISSION)).toFixed(1)}mg
            </div>
          </div>
        ))}
      </div>

      {/* 정류장 정보 */}
      <div className="mt-4 text-xs text-gray-600">
        {legs.map((leg, index) => (
          <div key={index} className="mb-1 flex items-center space-x-2">
            <span className={`h-2 w-2 rounded-full ${leg.mode === 'WALK' ? 'bg-gray-400' : `bg-[#${leg.routeColor || '666666'}]`}`} />
            <span>{leg.mode === 'WALK' ? '도보' : leg.route}</span>
            {leg.mode !== 'WALK' && (
              <span className="text-gray-400">
                {leg.passStopList?.stationList[0].stationName} → {leg.passStopList?.stationList[leg.passStopList.stationList.length - 1].stationName}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RouteInfoCard
