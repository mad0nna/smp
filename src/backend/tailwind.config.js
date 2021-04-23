module.exports = {
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
          colors:{
            mainbg: '#F2F2F2',
            primary: {
              100:'#5EDF89',
              200:'#1D9E48',
            },
            secondary:{
              100:'#DC5858',
              200:'#DE0A0A',
            }
          },
          fontSize: {
            xxs:['0.60rem', { lineHeight: '.75rem' }],
          },
            boxShadow: {
            '4xl': '0 40px 100px -20px rgba(0, 0, 0, 0.3)',
            },
            spacing: {
              63:'250px'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    
}
