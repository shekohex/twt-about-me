import Logger from './Logger'
import * as Twit from 'twit'
import { config } from './Config'
const log = Logger('Bot')
const Bot : Twit = new Twit(config)
log.debug('Bot Created.')
export default Bot
