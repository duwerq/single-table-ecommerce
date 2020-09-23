
// import theme from './src/theme'



// const { colors } = theme
// console.log('colors: ', colors)

// const { primary, secondary } = colors

module.exports = {
  theme: {
    extend: {
      screens: {
        'mobile': '600px',
        'c_large': '1200px',
        'desktop': '1440px'
      },
      width: {
        '28': '7rem',
        'c_large': '1200px',
        "38":"10rem",
        "48":"12rem",
        "52":"13rem",
        "56":"14rem",
        "60":"15rem",
        "64": "16rem",
        "68": "17rem",
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
        'flex-half': "calc((100%/2) - 15px)",
        'flex-fourth': "calc((100% / 4) - 20px)"
      },
      inset: {
       'flexiblemargin': "calc((100vw - 1420px) / 2)",
       '100': '100px',
       '200': '200px',
       '250': '250px',
       '300': '300px',
       '400': '400px',
       '20': '20px',
       '30': '30px',
       '35': '35px',
       '40': '40px',
       '45': '45px',
       '45': '45px',
       '46': '46px',
       '47': '47px',
       '48': '48px',
       '49': '49px',
       '50': '50px',
       '55': '55px',
       '60': '60px'
      },
      height: {
        'hero': '600px',
        "48":"12rem",
        "52":"13rem",
        "56":"14rem",
        "60":"15rem",
        "64": "16rem",
        "68":"17rem",
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
        "fw": "1440px"
      },
      spacing: {
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
        "fw": "1440px"
      },
      fontSize: {
        'xxs': '.6rem',
        'smaller': '.8rem'
      },
      padding: {
        ".5": ".125rem"
      },
      maxWidth: {
        "48":"12rem",
        "52":"13rem",
        "56":"14rem",
        "60":"15rem",
        "64": "16rem",
        "68":"17rem",
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
        "fw": "1440px",
        'c_large': '1200px'
      },
      maxHeight: {
        "36":"9rem",
        "40":"10rem",
        "44":"11rem",
        "48":"12rem",
        "52":"13rem",
        "56":"14rem",
        "60":"15rem",
        "64": "16rem",
        "68":"17rem",
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
        "fw": "1440px"
      },
      fontFamily: {
        'light': ['Eina Light']
      },
      zIndex: {
       '-2': '-2',
       '-4': '-4',
       '-6': '-6',
       '-12': '-12',
      },
      textColor: {
        'primary': '#000000',
        'secondary': '#00baa6',
      }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#000000',
      'secondary': '#00baa6',
      'light': '#f5f5f5',
      'light-200': '#f0f0f0',
      'light-300': '#e8e8e8'
    })
  },
  variants: {},
  plugins: [],
}