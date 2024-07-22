import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/chat/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/enum/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0077b6',
        primarySoft: '#00b4d8',
        secondary: {
          surface: '#90e0ef',
          surface10: '#ade8f4',
          base: '#03045e',
          surface50: '#caf0f8',
        },
        system: {
          error: '#FF6F6E',
          errorLight: '#FFEAEC',
          success: '#00BC52',
          successLight: '#ECFAF2',
          info: '#1592E6',
        },
        tertiary: {
          surface10: '#F1F1F3',
          surface15: '#E1E1E5',
          surface20: '#F3F3F3',
          surface25: '#F6F6F8',
          surface30: '#E7E0D6',
          tabDisabled: '#e9e9e9',
          base: '#CBCBCB',
          baseHover: '#CBCBCB4d',
          borderColor: '#cbcbcb80',
          inpBorder: '#ABABAB',
          surface50: '#FFEAEC',
        },
        typo: {
          700: '#010001',
          500: '#333',
          300: '#707070',
          250: '#ACACAC',
          200: '#CBCBCB',
          100: '#BEBEBE',
          title1: '#FF6F6E',
          title2: '#C9B8A0',
          title3: '#1CBBF9',
        },
      },
      boxShadow: {
        border: 'inset 0px -0.5px 0px #CBCBCB',
        borderT: 'inset 0px 0.5px 0px #CBCBCB',
        borderR: ' inset -0.5px -0.5px 0px #CBCBCB;',
        dropdown: '0px 2px 3px #CBCBCB',
      },
      borderRadius: {
        lg: '10px',
        base: '8px',
        btn: '6px',
        sm: '4px',
        modal: '20px',
      },
      zIndex: {
        hide: '-1',
        auto: 'auto',
        base: '1',
        fixedCont: '500',
        fixed: '1000',
        fixedNav: '1500',
        modal: '2000',
        toast: '3000',
      },
      fontSize: {
        navPC: [
          '1rem', //16px
          {
            lineHeight: '21px', //21px
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        navPCsub: [
          '0.875rem',
          {
            lineHeight: '17px', //17
            letterSpacing: '',
            fontWeight: '400',
          },
        ],
        sidebarDefault: [
          '1rem', //16px
          {
            lineHeight: '19px', //21px
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        navMo3depth: [
          '0.875rem', //14px
          {
            lineHeight: '17px', //17px
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        landingMobile: [
          '1.625rem', //32px
          {
            lineHeight: '31px',
            letterSpacing: '-0.91px',
            fontWeight: '500',
          },
        ],
        landing: [
          '2rem', //32px
          {
            lineHeight: '39px',
            letterSpacing: '-1.12px',
            fontWeight: '500',
          },
        ],
        centerBanner: [
          '1.75rem', //28px
          {
            lineHeight: '24px',
            letterSpacing: '-1.2px',
            fontWeight: '700',
          },
        ],
        title1: [
          '0.875rem', //14px
          {
            lineHeight: '17px', //17로변경
            letterSpacing: '-0.7px',
            fontWeight: '700',
          },
        ],
        body: [
          '0.875rem', //14px
          {
            lineHeight: '20px', //20
            letterSpacing: '-0.7px',
            fontWeight: '400',
          },
        ],
        body2: [
          '0.875rem', //14px
          {
            lineHeight: '17px', //20
            letterSpacing: '-0.7px',
            fontWeight: '400',
          },
        ],
        modalTitle: [
          '1.125rem', //18px
          {
            lineHeight: '21px', //20
            letterSpacing: '-0.45px',
            fontWeight: '700',
          },
        ],
        HelpTitle: [
          '1.125rem', //18px
          {
            lineHeight: '32px', //20
            letterSpacing: '-0.63px',
            fontWeight: '700',
          },
        ],
        bannerTitle: [
          '28px', //18px
          {
            lineHeight: '35px', //20
            letterSpacing: '-0.98px',
            fontWeight: '700',
          },
        ],
        chatTitle1: [
          '1rem', //16px
          {
            lineHeight: '22px', //20
            letterSpacing: '-0.56px',
            fontWeight: '500',
          },
        ],
        desc: [
          '10px',
          {
            lineHeight: '13px',
            letterSpacing: '-0.5px',
            fontWeight: '400',
          },
        ],
        desc2: [
          '12px',
          {
            lineHeight: '15px',
            letterSpacing: '-0.6px',
            fontWeight: '400',
          },
        ],
        selectBtn1: [
          '0.75rem', //12px ??
          {
            lineHeight: '15px',
            letterSpacing: '-0.5px',
            fontWeight: '400',
          },
        ],
        selectBtn2: [
          '1rem', //16px ??
          {
            lineHeight: '19px',
            letterSpacing: '-0.4px',
            fontWeight: '700',
          },
        ],
        selectItemActive: [
          '0.875rem', //14px
          {
            lineHeight: '17px',
            letterSpacing: '-0.35px',
            fontWeight: '700',
          },
        ],
        btn40: [
          '0.875rem', //14px
          {
            lineHeight: '17px',
            letterSpacing: '-0.7px',
            fontWeight: '500',
          },
        ],
      },
      animation: {
        'modal-bg-in': 'fadeIn 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'modal-bg-out': 'fadeOut 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'footer-modal-bottom-up': 'slideUp 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'footer-modal-bottom-down': 'slideDown 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'dialog-modal-bottom-up': 'semiSlideUp 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'dialog-modal-bottom-down': 'semiSlideDown 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'sequential-modal-come': 'slideCome 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'sequential-modal-back': 'slideBack 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'sequential-modal-leave': 'slideLeave 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'dropdown-slide-fade-in': 'slideFadeIn 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'processing-scale': 'processingScale 0.6s ease alternate infinite',
        flicker: 'flicker 2s infinite',
      },
      backgroundImage: {
        calendar: "url('/image/common/calendar.svg')",
        'calendar-disabled': "url('/image/common/calendar_disabled.svg')",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        semiSlideUp: {
          '0%': { transform: 'translateY(10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        semiSlideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(10%)', opacity: '0' },
        },
        slideCome: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideBack: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideLeave: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        slideFadeIn: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        processingScale: {
          '0%': { transform: 'scale(0.3)' },
          '100%': { transform: 'scale(1)' },
        },
        flicker: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '30%': { opacity: '1', transform: 'translateY(0)' },
          '70%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
