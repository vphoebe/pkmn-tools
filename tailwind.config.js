/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      normal: "#a8a878",
      fighting: "#c03028",
      flying: "#a890f0",
      poison: "#a040a0",
      ground: "#e0c068",
      rock: "#b8a038",
      bug: "#a8b820",
      ghost: "#705898",
      steel: "#b8b8d0",
      fire: "#f08030",
      water: "#6890f0",
      grass: "#78c850",
      electric: "#f8d030",
      psychic: "#f85888",
      ice: "#98d8d8",
      dragon: "#7038f8",
      dark: "#705848",
      fairy: "#ee99ac",
      blue: colors.blue,
      slate: colors.slate,
      double: "#23eb80",
      half: "#e6aa9a",
      quarter: "#804434",
      quad: "#c83dff",
    },
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|half|double|quarter|quad|slate|blue)/,
    },
  ],
};
