import { ReactNode } from 'react'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import type { SwiperModule } from 'swiper/types'
import 'swiper/css/bundle'

interface Props extends SwiperProps {
  slides: ReactNode[]
  swiperModules?: SwiperModule[]
}

/*
 * https://swiperjs.com/react
 * */
const BasicSwiper = ({ slides, swiperModules, ...rest }: Props) => {
  return (
    <Swiper
      modules={swiperModules ?? [Scrollbar]}
      slidesPerView={rest.slidesPerView ?? 1}
      scrollbar={{ draggable: true }}
      spaceBetween={rest.spaceBetween ?? 0}
      // navigation
      // pagination={{ clickable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      {...rest}
    >
      {slides.map((childComponent, idx) => (
        <SwiperSlide key={`swiper-${idx}`}>{childComponent}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default BasicSwiper
