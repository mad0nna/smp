const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./resources/**/*.blade.php', './resources/**/*.js'],
  darkMode: false,
  theme: {
    screens: {
      xs: 370,
      ...defaultTheme.screens
    },
    extend: {
      backgroundImage: {
        paper: "url('/images/paper.png')",
        'cart-icon': "url('/images/cart-icon.png')",
        'arrow-down': "url('/images/arrow-down.png')",
        'ellipsis-icon': "url('/images/ellipsis.png')",
        'history-icon': "url('/images/history-icon.png')",
        'sort-icon-active': "url('/images/sort-active.png')",
        'sort-icon-inactive': "url('/images/sort-inactive.png')",
        'notification-icon': "url('/images/notification-icon.png')",
        'notification-active': "url('/images/notification-active.png')",
        'notification-normal': "url('/images/notification-alert-hnt.png')",
        'notification-invoice': "url('/images/notification-alert-invoice.png')"
      },
      colors: {
        primaryBg: '#F7F8F9',
        secondaryBg: '#C1CBC4',
        // region > Unstructured, untidy & improper hex colors used by random XD files that did not reflect on Style guide goes here...
        hex: {
          A8A8A8: '#A8A8A8',
          F5F5F5: '#F5F5F5',
          F1F1F1: '#F1F1F1',
          D8F3EA: '#D8F3EA',
          D8D8D8: '#D8D8D8',
          E8E8E8: '#E8E8E8',
          FF0000: '#FF0000',
          FF9898: '#FF9898',
          FEE5E5: '#FEE5E5',
          D5DBE0: '#D5DBE0',
          474747: '#474747',
          333333: '#333333',
          '67D5D1': '#67D5D1',
          '0ABBB5': '#0ABBB5',
          '3A3A3A': '#3A3A3A',
          '7ECBB2': '#7ECBB2',
          '9D9D9D': '#9D9D9D',
          '2D2D2D': '#2D2D2D'
        },
        // endregion
        primary: {
          100: '#007B5333',
          200: '#007B5366',
          300: '#387F6B',
          400: '#007B53CC',
          500: '#065F46',
          600: '#007B53'
        },
        secondary: {
          100: '#17A8A433',
          200: '#17A8A466',
          300: '#17A8A499',
          400: '#17A8A4CC',
          500: '#17A8A4'
        },
        tertiary: {
          100: '#1D9E4833',
          200: '#1D9E4866',
          300: '#1D9E4899',
          400: '#1E9E47',
          500: '#1D9E48'
        },
        body: {
          100: '#76807033',
          200: '#76807066',
          300: '#76807099',
          400: '#768070CC',
          500: '#768070',
          600: '#808080'
        },
        whiteTint: {
          500: '#ECEEF1',
          600: '#E2EDE9',
          700: '#F4F8F7',
          800: '#F3F7F6',
          900: '#F2F7F5'
        },
        header: '#2A853508',
        lightGreen: '#6AD48D',
        lime: {
          primary: '#22AC38',
          200: '#D9F99D',
          300: '#BEF264',
          400: '#A3E635',
          500: '#84CC16',
          600: '#65A30D',
          700: '#4D7C0F',
          800: '#3F6212'
        },
        errorColor: '#DC2626',
        'table-header-Gray-100': '#ECECEC',
        'table-header-Gray-400': '#A5A5A5'
      },
      fontSize: {
        '2.5xl': ['1.75rem', { lineHeight: '2rem' }],
        xxs: ['0.60rem', { lineHeight: '.75rem' }],
        'widget-xs': 10,
        // region > Specific font-size in pixels unit (ASC order)
        '11px': 11,
        '20px': 20,
        '22px': 22,
        '23px': 23
        // endregion
      },
      height: {
        'widgetBody-sm': 'calc(100% - 2.50rem)',
        widgetBody: 'calc(100% - 6.50rem)',
        'widgetBody-lg': 'calc(100% - 3rem)',
        'detail-height': '34rem',
        checkBox: 20,
        // region > Specific height in pixels unit (ASC order)
        '21px': 21,
        '26px': 26,
        '27px': 27,
        '28px': 28,
        '30px': 30,
        '43px': 43,
        '48px': 48,
        '51px': 51,
        '58px': 58,
        '130px': 130,
        '282px': 282
        // endregion
      },
      width: {
        widgetBody: 'calc(100% - 3rem)',
        checkBox: 20,
        // region > Specific width in pixels unit (ASC order)
        '21px': 21,
        '26px': 26,
        '27px': 27,
        '30px': 30,
        '123px': 123,
        '130px': 130,
        '143px': 143,
        '165px': 165,
        '202px': 202,
        '251px': 251,
        '318px': 318,
        '322px': 322,
        '432px': 432,
        '590px': 590
        //endregion
      },
      lineHeight: {
        5: '5rem'
      },
      minHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        3.5: '0.875rem',
        9: '2.25rem',
        10: '2.5rem',
        14: '3.5rem',
        'widget-item': 80,
        'table-height': 740,
        // region > Undeclared specific pixel sizes in Style Guide goes here...
        '402px': 422,
        '500px': 500,
        '607px': 607
        // endregion
      },
      maxWidth: {},
      boxShadow: {
        '4xl': '0 40px 100px -20px rgba(0, 0, 0, 0.3)',
        '5xl': '0px 15px 30px rgba(0, 0, 0, 0.16)'
      },
      opacity: {
        88: '0.88'
      },
      spacing: {
        200: 350,
        // region > Specific spacing (margin, padding) in pixels unit (ASC order)
        '7px': 7,
        '9px': 9,
        '11px': 11,
        '12px': 12,
        '13px': 13,
        '20px': 20,
        '22px': 22,
        '25px': 25,
        '29px': 29,
        '37px': 37,
        '39px': 39,
        '42px': 42,
        '50px': 50,
        '55px': 55,
        '62px': 62,
        '72px': 72,
        '78px': 78,
        '80px': 80,
        '88px': 88,
        '95px': 95
        // endregion
      },
      borderRadius: {
        xs: 6,
        '3px': 3,
        '8px': 8,
        '9px': 9,
        '10px': 10
      },
      borderWidth: {
        '3px': 3
      },
      skew: {
        'rectangle-skew': '-53deg'
      },
      gridTemplateRows: {
        12: 'repeat(12, minmax(0, 1fr))'
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))'
      },
      gridRow: {
        'span-8': 'span 8 / span 8',
        'span-12': 'span 12 / span 12',
        'span-16': 'span 16 / span 16'
      },
      gridColumn: {
        'span-16': 'span 16 / span 16'
      },
      zIndex: {
        '-1': '-1'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'Noto Sans JP', '"Meiryo-UI"', 'sans-serif']
    }
  },
  variants: {
    extend: {
      backgroundImage: ['group-hover'],
      display: ['group-hover'],
      borderWidth: ['hover', 'focus'],
      backgroundColor: ['checked', 'active'],
      borderColor: ['checked']
    }
  },
  plugins: []
}
