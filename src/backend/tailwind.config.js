module.exports = {
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
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
                'switch-account-icon-white': "url('/images/switch-account-icon-white.png')",
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
                'card-visa-icon': "url('/images/visa.png')",
                'card-mastercard-icon': "url('/images/mastercard.png')",
                'card-jcb-icon': "url('/images/jcb.png')",
                'card-amex-icon': "url('/images/amex.png')",
                'card-diners-icon': "url('/images/diners.png')"
            },
            colors:{
                mainbg: '#F2F2F2',
                secondaryBg: '#c1cbc4',
                primary: {
                    50: "#f3faf6",
                    100:'#5EDF89',
                    200:'#1D9E48',
                },
                secondary:{
                    100:'#DC5858',
                    200:'#DE0A0A',
                },
                cyan: '#43bbb3',
                orange: '#ffbc03',
                lightGreen: '#6ad48d',
                greenOld: "#95A199",
                'table-header-Gray-100': '#ececec',
                'table-header-Gray-400': '#a5a5a5',
                lime:{
                    'primary':'#22AC38',
                    200:'#D9F99D',
                    300:'#BEF264',
                    400:'#A3E635',
                    500:'#84CC16',
                    600:'#65A30D',
                    700:'#4D7C0F',
                    800:'#3F6212',
                },
                customGray: '#685d5e',
            },
            fontSize: {
                xxs:['0.60rem', { lineHeight: '.75rem' }],
                'widget-xs': "10px"
            },

            height: {
                'widgetBody-sm': 'calc(100% - 2.50rem)',
                widgetBody: 'calc(100% - 6.50rem)',
                'widgetBody-lg': 'calc(100% - 3rem)',
                'detail-height': '34rem'
            },

            width: {
                widgetBody: 'calc(100% - 3rem)'
            },

            lineHeight: {
                '5': '5rem'
            },

            minHeight: {
                'widget-item' : '80px',
                'table-height' : '740px'
            },

            maxWidth: {

            },

            boxShadow: {
                '4xl': '0 40px 100px -20px rgba(0, 0, 0, 0.3)',
            },
            spacing: {
                200: '350px'
            },
            skew: {
                'rectangle-skew': '-53deg'
            },
            gridTemplateRows: {
               '12': 'repeat(12, minmax(0, 1fr))',
            },
            gridTemplateColumns: {
               '16': 'repeat(16, minmax(0, 1fr))',
            },
            gridRow: {
                'span-8': 'span 8 / span 8',
                'span-12': 'span 12 / span 12',
                'span-16': 'span 16 / span 16',
            },
            gridColumn: {
                'span-16': 'span 16 / span 16',
            },
            zIndex: {
                '-1': '-1',
            }
            

        },
        fontFamily: {
            'sans': ['Meiryo-UI'],
            'meiryo': ['Meiryo-UI']
        }
    },
    variants: {
        extend: {
            backgroundImage: ['group-hover'],
            display: ['group-hover'],
            borderWidth: ['hover', 'focus'],
            backgroundColor: ['checked', 'active'],
            borderColor: ['checked']
        },
    },
    plugins: []
}
