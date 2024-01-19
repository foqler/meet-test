const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const meetings = require('./meetings')()
const port = 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  allowEIO3: true,
  cors: {
    origin: 'http://localhost:8080',
    credentials: true
  }
})

app.get('/api/meetings/', (req, res) => {
  // отдаем замокканые данные
  res.status(200).json(meetings.getAll())
})

io.on('connection', socket => {
  socket.on('meeting:add', data => {
    data.id = Math.random().toString(36).slice(4)
    meetings.add(data)
    io.emit('meetings:update', meetings.getAll())
  })

  socket.on('meeting:edit', (data) => {
    meetings.edit(data)
    io.emit('meetings:update', meetings.getAll())
  })

  socket.on('meeting:remove', (id) => {
    const meet  = meetings.remove(id)
    if (meet) {
      io.emit('meetings:update', meetings.getAll())
    }
  })
})

server.listen(port, () => {
  console.log(`Server has been started on port ${port}...`)
})
