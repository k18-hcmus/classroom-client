import io from 'socket.io-client'
import { store } from 'src/store'
import { fetchNotifications } from 'src/redux/notificationSlice'

let socketClient = io('http://localhost:5000')

// export const initSocket = (server, userId) => {
//   if (socketClient && socketClient.connected) return

//   socketClient

//   socketClient.on('connect', () => {
//     console.log('socket connection established')
//     socketClient.emit('new-user', userId)

//     socketClient.on('notify', () => {
//       store.dispatch(fetchNotifications())
//     })
//   })

//   console.log(socketClient)
// }

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
