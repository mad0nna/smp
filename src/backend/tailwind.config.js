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
        'kot-logo': "url('/images/KOT-menu-logo.png')",
        'dashboard-icon': "url('/images/dashboard-normal.png')",
        'dashboard-icon-hover': "url('/images/dashboard-hover.png')",
        'contract-icon': "url('/images/contract-normal.png')",
        'contract-icon-hover': "url('/images/contract-hover.png')",
        'billing-icon': "url('/images/billing-normal.png')",
        'billing-icon-hover': "url('/images/billing-hover.png')",
        'settings-icon': "url('/images/settings-icon.png')",
        'settings-icon-hover': "url('/images/settings-hover.png')",
        'call-icon-white': "url('/images/call-icon-white.png')",
        'profile-icon-white': "url('/images/profile-icon-white.png')",
        'settings-icon-white': "url('/images/settings-icon-white.png')",
        'switch-account-icon-white':
          "url('/images/switch-account-icon-white.png')",
        'notification-icon': "url('/images/notification-icon.png')",
        'notification-normal': "url('/images/notif-alert-hnt.png')",
        'notification-active': "url('/images/notification-active.png')",
        'notification-invoice': "url('/images/notif-alert-invoice.png')",
        'arrow-down': "url('/images/arrowdown.png')",
        'cart-icon': "url('/images/cart-icon.png')",
        'history-icon': "url('/images/history-icon.png')",
        'pdf-icon': "url('/images/pdf-icon.png')",
        'ellipsis-icon': "url('/images/ellipsis.png')",
        'signout-icon': "url('/images/signout.png')",
        'account-list-icon': "url('/images/AccountList-normal.png')",
        'account-list-icon-hover': "url('/images/AccountList-hover.png')",
        'document-icon': "url('/images/document-normal.png')",
        'document-icon-hover': "url('/images/document-hover.png')",
        'sort-icon-inactive': "url('/images/sort-inactive.png')",
        'sort-icon-active': "url('/images/sort-active.png')",
        'company-icon-gray': "url('/images/company-icon-gray.png')",
        'company-icon-white': "url('/images/company-icon-white.png')",
        'all-accounts-icon-white': "url('/images/all-accounts-icon.png')",
        'widget-settings-icon': "url('/images/widget-settings.png')",
        'card-VISA-icon': "url('/images/visa.png')",
        'card-MasterCard-icon': "url('/images/mastercard.png')",
        'card-JCB-icon': "url('/images/jcb.png')",
        'card-AMEX-icon': "url('/images/amex.png')",
        'card-Diners-icon': "url('/images/diners.png')",
        'unpaid-billing-icon': "url('/images/unpaid-billing-icon.png')",
        'arrow-left': "url('/images/arrow-left.png')",
        paper: "url('/images/paper.png')"
      },
      colors: {
        primaryBg: '#F2F2F2',
        secondaryBg: '#C1CBC4',
        primary: {
          100: '#007B5333', // Changed To: lightGreen
          200: '#007B5366', // Changed To: tertiary-500
          300: '#007B5399',
          400: '#007B53CC',
          500: '#065F46'
        },
        secondary: {
          100: '#17A8A433', // Change To: red-500
          200: '#17A8A466', // Change To: red-600
          300: '#17A8A499',
          400: '#17A8A4CC',
          500: '#17A8A4' // From: 900, Changed To: teal-500
        },
        tertiary: {
          100: '#1D9E4833',
          200: '#1D9E4866',
          300: '#1D9E4899',
          400: '#1D9E48',
          500: '#1D9E48'
        },
        body: {
          100: '#76807033',
          200: '#76807066',
          300: '#76807099',
          400: '#768070CC',
          500: '#768070'
        },
        sideBar: 'rgba(0, 123, 83, 0.03)',
        active: 'rgba(6, 95, 70, 0.1)',
        cyan: '#43BBB3',
        orange: '#FFBC03',
        lightGreen: '#6AD48D',
        greenOld: '#95A199',
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
        customGray: '#685D5E',
        'table-header-Gray-100': '#ECECEC',
        'table-header-Gray-400': '#A5A5A5'
      },
      fontSize: {
        xxs: ['0.60rem', { lineHeight: '.75rem' }],
        'widget-xs': 10
      },
      height: {
        'widgetBody-sm': 'calc(100% - 2.50rem)',
        widgetBody: 'calc(100% - 6.50rem)',
        'widgetBody-lg': 'calc(100% - 3rem)',
        'detail-height': '34rem'
      },
      width: {
        widgetBody: 'calc(100% - 3rem)',
        sideBar: 260,
        sideBarBtn: 242
      },
      lineHeight: {
        5: '5rem'
      },
      minHeight: {
        'widget-item': 80,
        'table-height': 740
      },
      maxWidth: {},
      boxShadow: {
        '4xl': '0 40px 100px -20px rgba(0, 0, 0, 0.3)'
      },
      spacing: {
        200: 350
      },
      borderRadius: {
        xs: 6
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
      sans: ['Meiryo-UI'],
      meiryo: ['Meiryo-UI']
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
