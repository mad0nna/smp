/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap')

const files = require.context('./components', true, /\.js$/i)
files.keys().map((key) => {
  require(`./components${key.substring(1)}`)
})

/* For future use, we will use these v2 JS components */
const v2 = require.context('./v2', true, /\.js$/i)
v2.keys().map((key) => {
  require(`./v2${key.substring(1)}`)
})
