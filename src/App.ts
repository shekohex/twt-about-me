import Logger from './Logger'
import { MessageHandler } from './Handler'
import * as schedule from 'node-schedule'
const log = Logger('App')
log.debug('Starting Bot ..')
//start get stream on DM
const messageHandler = new MessageHandler()
async function startBot(){
    await messageHandler.work()
    await messageHandler.snooze(5000)
}
const APP = {
    scheduleJob: () => {
        // This rule is standard cron syntax for once per minute.
        // See http://stackoverflow.com/a/5398044/1252653
        let rule = '*/5 * * * *' //every 5 min
        // Kick off the job
       schedule.scheduleJob(rule, () => {
            console.log('Iam Alive.')
            startBot().then(() => {
                console.log('Done..')
            }).catch(err => {
                log.error(err)
            })
        })
    },
    init: () => {
        APP.scheduleJob()
    }
}

APP.init()