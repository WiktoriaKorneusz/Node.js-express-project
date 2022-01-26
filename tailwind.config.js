module.exports = {
  //adding tailwind to html, js and ejs files
  content: ["./views/**/*.{html,js,ejs}"],
  theme: { extend: {
    //custom colors
    colors: {
      'body': '#252849',
      'selected-text': '#F04F91',
      'txt': '#F1EFFD',
      'pink': '#F04F91', 
      'darkpink': '#B00F51', 
      'blue': '#4776F8',
      'purple': '#7A36F8',
    },
    //custom fonts
    fontFamily: { 
      'monsterrat' : ["'Montserrat', sans-serif"],
      'sans': ["'Source Sans Pro', sans-serif"]
    }
  } },
  plugins: [],
};
