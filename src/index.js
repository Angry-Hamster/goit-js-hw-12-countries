import css from "./css/style.css";
import debounce from "lodash.debounce"
import fetchCountries from "./js/fetchCountries.js"
import refs from "./js/countryRefs.js"
import countryItem from "./templates/countryItem.hbs"
import countryList from "./templates/countryList.hbs"

import { error } from "@pnotify/core"
import "@pnotify/core/dist/PNotify.css"
import "@pnotify/core/dist/BrightTheme.css"

refs.input.addEventListener('input', debounce((event)=>{
  refs.ul.innerHTML=""
  let query = event.target.value
  // console.log(query)
  fetchCountries(query).then(data =>{
    // console.log(data)
    if(data.length >= 2 && data.length <= 10){
      const item = countryList(data)
      refs.ul.insertAdjacentHTML("beforeend", item)
    } else if(data.length===1){
      const item = countryItem(data)
      // console.log(item)
      refs.ul.insertAdjacentHTML("beforeend", item)
    } else {
      error({
        title: "Attetion!",
        text: "Too many matches found. Please enter a more specific query",
        delay: 2000
      })
    }
  })
  refs.input.value=""
}, 1000))