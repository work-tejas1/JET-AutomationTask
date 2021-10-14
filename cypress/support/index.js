// https://on.cypress.io/configuration
Cypress.Server.defaults({
  ignore: xhr => true
})


// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-wait-until';
import 'cypress-dark';
import 'cypress-xpath'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// require('cypress-xpath')
//require('cypress-dark')