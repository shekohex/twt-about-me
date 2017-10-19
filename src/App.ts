import Logger from './Logger'
import { MessageHandler } from './Handler'
const log = Logger('App')
log.debug('Starting Bot ..')
//start get stream on DM
const messageHandler = new MessageHandler()
async function startBot(){
    await messageHandler.work()
    await messageHandler.snooze(5000)
}
const APP = {
    init: () => {
        console.log('Iam Alive.')
        startBot().then(() => {
            console.log('Done..')
        }).catch(err => {
            log.error(err)
        })
    }
}

APP.init()