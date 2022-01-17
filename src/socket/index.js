import io from 'socket.io-client'
import { store } from 'src/store'
import { fetchNotifications } from 'src/redux/notificationSlice'

let socketClient = io('http://localhost:5000')

socketClient.on('connect', () => {
  socketClient.on('notify', () => {
    store.dispatch(fetchNotifications())
  })
})

export const establishNewConnection = (userId) => {
  console.log('establish socket connection')
  socketClient.emit('new-user', userId)
}

export const disconnectSocket = () => {
  console.log('disconnect socket')
  socketClient.disconnect()
}

export default socketClient
