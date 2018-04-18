const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const app = express();

const appUrl = 'destiny-cff1c.firebaseapp.com';
const renderUrl = 'https://destiny-cff1c.appspot.com/render';

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
    'google search console',
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
    'W3C_Validator',
    'discordbot'
  ]
  const agent = userAgent.toLowerCase()

  for (const bot of bots) {
    if (agent.indexOf(bot) > -1) {
      console.log('bot detected', bot, agent)
      return true
    }
  }
  console.log('no bots found', agent)
  return false
}

app.get('*', (req, res) => {
  const isBot = detectBot(req.headers['user-agent']);

  if (isBot) {
    const botUrl = generateUrl(req);
    console.log(botUrl);
    fetch(`${renderUrl}/${botUrl}`)
      .then(res => res.text())
      .then(body => {
        res.set('Cache-Control', 'no-cache');
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
});

exports.app = functions.https.onRequest(app);