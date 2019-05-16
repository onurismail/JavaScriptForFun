;(function() {

  /*TODO: We can separate DOM manipulations, endpoint calls and user interactions to different .js files */

  /*Basically I tried to separate the functionailies in the methods to reuse them again for the next */
  /*implementations. I used fetch() to simplify, created constant values, removed css styles and created them in .css */
  /*refactored two nested ? and for loop, created methods to pass variables by parameter */

  /*Added const values to simplify and remove duplicates and reuse them again*/
  const API_URL = 'https://swapi.co/api/'
  const CUSTOM_RESOURCE = 'Custom Resource'

  const bannerDOMEl = document.getElementById('banner')
  const resultDOMEl = document.getElementById('result')
  const formDOMEl = document.getElementById('form')
  const resourceDOMEl = document.getElementById('resource')

  const customResourceWrapperDOMEl = document.getElementById(
    'customResourceWrapper'
  )

  let isCustomResource = false

  /*fetch() is simpler and cleaner API, easier than XMLHttpRequest, but i think async calls doesn't work on IE*/
  async function getResource(url) {
    try {
      const response = await window.fetch(url)
      const json = await response.json()
      const stringifiedJSON = JSON.stringify(json, null, 2)
      writeResultsToDOM(stringifiedJSON)
    } catch (e) {
      displayError(e)
    }
  }

  /*clean innerHTML by default or assign the parameter passed */
  function writeResultsToDOM (html = '') {
    resultDOMEl.innerHTML = html
  }

  /*Removed .css modifications to styles.css class and simplified the method */
  function displayError(e) {
    bannerDOMEl.innerText = `There was an error with request: ${e.toString()}`
    toggleVisibilityDOMEl(bannerDOMEl, {show: true})
  }

  /*create links to call in  */
  function appendSelectOptions(selectId, ...options) {
    const selectBoxDOMEl = document.getElementById(selectId)
    const createPath = option => (option === 'root' ? '' : `${option}/`)

    options.forEach(option => {
      const optionDOMEl = document.createElement('option')
      const isCustomResource = option === CUSTOM_RESOURCE

      optionDOMEl.value = isCustomResource
        ? option
        : `${API_URL}${createPath(option)}`

      optionDOMEl.innerHTML = option
      selectBoxDOMEl.appendChild(optionDOMEl)
    })
  }

  /*get selected value from dropdown box */
  function getSelectedValue() {
    return resourceDOMEl.options[resourceDOMEl.selectedIndex].value
  }

  /*shows or removes the visibility of objects passed by parameter */
  function toggleVisibilityDOMEl(DOMEl, {show}) {
    const classMethod = show ? 'remove' : 'add'
    DOMEl.classList[classMethod]('is-hidden')
  }

  /*onSubmit method */
  formDOMEl.onsubmit = function(e) {
    e.preventDefault()

    toggleVisibilityDOMEl(bannerDOMEl, {show: false})
    writeResultsToDOM()

    const resourceUrl = isCustomResource
      ? document.getElementById('customResource').value
      : getSelectedValue()

    getResource(resourceUrl)
  }

  /*onChange method */
  resourceDOMEl.onchange = function() {
    isCustomResource = getSelectedValue() == CUSTOM_RESOURCE
    toggleVisibilityDOMEl(customResourceWrapperDOMEl, {show: isCustomResource})
  }

  appendSelectOptions(
    'resource',
    'root',
    'people',
    'planets',
    'films',
    'species',
    'vehicles',
    'starships',
    'Custom Resource'
  )
})()  