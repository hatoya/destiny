import * as functions from 'firebase-functions'
import * as express from 'express'
import * as fetch from 'node-fetch'
import * as url from 'url'

const app = express()
const appUrl = 'destiny-cff1c.firebaseapp.com'
const renderUrl = 'destiny-cff1c.firebaseapp.com/render'

function generateUrl(request) {
  return url.format({
    protocol: request.protocol,
    host: appUrl,
    pathname: request.originalUrl
  });
}

function detectBot(userAgent) {
  const bots = [
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'slurp',
    'twitterbot',
    'facebookexternalhit',
    'linkedinbot',
    'embedly',
    'baiduspider',
    'pinterest',
    'slackbot',
    'vkShare',
    'facebot',
    'outbrain',
    'W3C_Validator'
  ]
  const agent = userAgent.toLowerCase()
  for (const bot of bots) {
    if (agent.indexOf(bot) > -1) true
  }
  return false
}

app.get('*', (req, res) => {
  const isBot = detectBot(req.headers['user-agent']);
  if (isBot) {
    const botUrl = generateUrl(req);
    fetch(`${renderUrl}/${botUrl}`)
      .then(res => res.text())
      .then(body => {
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        res.set('Vary', 'User-Agent');
        res.send(body.toString())
      });
  } else {
    fetch(`https://${appUrl}`)
      .then(res => res.text())
      .then(body => {
        res.send(body.toString());
      })
  }
})

export const ssr = functions.https.onRequest(app)