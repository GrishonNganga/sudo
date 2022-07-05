// * You may uncomment one of these modules:
const express = require('express');
// const koa = require('koa');
const Joi = require('@hapi/joi');
// const restify = require('restify');
const WebSocket = require('ws');
const app = express();
const moment = require('moment');

module.exports = (stepService) => {
  const REST_PORT = 8080;

  app.get('/users/:username/steps', (req, res) => {
    const user = stepService.get(req.params.username)
    console.log("User", user);

    if (user === undefined) {
      return res.status(404).json({ "error": "User doesn't exist" })
    }
    return res.status(200).json(user)
  })

  // * TODO: Return object containing `close()` method for shutting down the server

  const ws = new WebSocket("ws://localhost:8081")
  ws.addEventListener('open', async () => {

    console.log("Connected to WS");

    let date = moment();
    const timestamp = date.format('YYYYMMDDhhmmss');

    const data = { update_id: (timestamp + Math.random() * 1000).toString(), username: "kishy", ts: timestamp, newSteps: 20 }

    await dataValidation.validateAsync(data).catch(reason => {
      return
    })

    ws.send(JSON.stringify(data))
  })

  app.listen(REST_PORT, () => {
    console.log("listening on ", REST_PORT);
  })

  const dataValidation = Joi.object({
    update_id: Joi.string().required(),
    username: Joi.string().required(),
    ts: Joi.number().required(),
    newSteps: Joi.number().required(),
  })
};
