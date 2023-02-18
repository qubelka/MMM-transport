/**
 * Runs on https://mmm-transport-mock0900.ghf789.repl.co/person/:id
 */
var express = require('express')
var cors = require('cors')
const morgan = require('morgan')
var app = express()

app.use(cors())
app.use(morgan('dev'))

transportData = {
  stop1: {
    name: "Stop 1",
    arrivalTimes: [
      {
        busNumber: 123,
        scheduledArrival: 32400
      },
      {
        busNumber: 232,
        scheduledArrival: 36000
      },
      {
        busNumber: 123,
        scheduledArrival: 39600
      },
      {
        busNumber: 232,
        scheduledArrival: 43200
      }
    ]
  },
  stop2: {
    name: "Stop 2",
    arrivalTimes: [
      {
        busNumber: 654,
        scheduledArrival: 32400
      },
      {
        busNumber: 123,
        scheduledArrival: 34200
      },
      {
        busNumber: 654,
        scheduledArrival: 36000
      },
      {
        busNumber: 123,
        scheduledArrival: 37800
      }
    ]
  },
  stop3: {
    name: "Stop 3",
    arrivalTimes: [
      {
        busNumber: 556,
        scheduledArrival: 32400
      },
      {
        busNumber: 123,
        scheduledArrival: 33300
      },
      {
        busNumber: 556,
        scheduledArrival: 34200
      },
      {
        busNumber: 123,
        scheduledArrival: 35100
      }
    ]
  },
  stop4: {
    stop4: "Stop 4",
    arrivalTimes: [
      {
        busNumber: 245,
        scheduledArrival: 32400
      },
      {
        busNumber: 245,
        scheduledArrival: 33000
      },
      {
        busNumber: 245,
        scheduledArrival: 33600
      },
      {
        busNumber: 245,
        scheduledArrival: 34200
      }
    ]
  }
}

app.get('/person/:id', function(req, res, next) {
  const id = parseInt(req.params.id)
  if (!id || id < 1 || id > 4) return res.status(400).send()
  return res.json({ ...transportData[`stop${id}`] })
})

app.listen(3000)