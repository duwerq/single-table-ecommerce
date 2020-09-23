/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import Amplify from 'aws-amplify'
import awsconfig from './src/aws-exports';

// You can delete this file if you're not using it
import "./src/styles/site.css"
import "./src/layouts/layout.css"




// Amplify.Logger.LOG_LEVEL = 'DEBUG';

// if (Object.keys(Amplify._config).length < 1) {

  Amplify.configure(awsconfig)
// }