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
                'notification-active': "url('/images/notification-active.png')",
                'notification-inactive': "url('/images/notification-inactive.png')",
                'arrow-down': "url('/images/arrowdown.png')"
            },
            colors:{
                mainbg: '#F2F2F2',
                primary: {
                    50: "#f3faf6",
                    100:'#5EDF89',
                    200:'#1D9E48',
                },
                secondary:{
                    100:'#DC5858',
                    200:'#DE0A0A',
                },
                greenOld: "#95A199"
            },
            fontSize: {
                xxs:['0.60rem', { lineHeight: '.75rem' }],
            },

            height: {
                widgetBody: 'calc(100% - 6.50rem)'
            },

            width: {
                widgetBody: 'calc(100% - 3rem)'
            },

            lineHeight: {
                '5': '5rem'
            },

            maxWidth: {

            },

            boxShadow: {
                '4xl': '0 40px 100px -20px rgba(0, 0, 0, 0.3)',
            }
        },
        fontFamily: {
            'sans': ['Arial']
        }
    },
    variants: {
        extend: {
            backgroundImage: ['group-hover']
        },
    },
    plugins: [],

}
