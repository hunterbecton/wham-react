import io from 'socket.io-client'

let socket

export const initiateSocket = room => {
  socket = io(`${process.env.REACT_APP_API}`)
  console.log(`Connecting socket...`)
  if (socket && room) socket.emit('join', room)
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...')
  if (socket) socket.disconnect()
}

export const subscribeToSound = cb => {
  if (!socket) return true
  socket.on('sound', id => {
    silentRefs.current[id].click()
    return cb(null, id)
  })
}
