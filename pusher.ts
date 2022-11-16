import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
    appId: "1507957",
    key: "b870b04441841246e12a",
    secret: "1e52d1940c390f8d123c",
    cluster: "us2",
    useTLS: true

})

export const clientPusher = new ClientPusher('b870b04441841246e12a', {
    cluster: 'us2',
    forceTLS: true,
    
})