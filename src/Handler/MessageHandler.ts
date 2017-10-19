import Bot from './../Bot'
import StreamHandler from './StreamHandler'
import TweetHandler from './TweetHandler'
import Logger from './../Logger'
const log = Logger('MessageHandler')

class MessageHandler {
    snooze = ms => new Promise(resolve => setTimeout(resolve, ms))
    messageMaxLength: number = 140
    defaultUnknownMessage: string = `Sorry but I cannot understand you,
     If you want to send a message to someone just send a message followed by his/her username`
    maxLengthExceeded: string = 'Your message is too long, but i will cut it into pieces in replies'
    /**
     * get Messages From Stream
     *
     * @class MessageHandler
     * @method getMessageData
     * @static
     *
     * @return {result} object
     */
    private static async getMessageData(): Promise<object> {
        try {
            const data: object = await StreamHandler.onDirectMessages()
            let message: any = data['direct_message']
            let entities: any = message.entities
            console.log(entities)
            log.debug(`I get a message from ${message.sender_screen_name}`)
            let result = {
                myUsername: message.recipient_screen_name,
                text: message.text,
                senderUsername: message.sender_screen_name,
                senderId: message.sender_id
            }
            if(typeof entities.user_mentions[0] !== 'undefined' && entities.user_mentions[0] !== null) {
                result['user'] = {
                    id: entities.user_mentions[0]['id'],
                    username: entities.user_mentions[0]['screen_name']
                }
            }
            return result
        } catch(error) {
            log.error(error)
            throw new Error(error)
        }
    }
    /**
     * the Main App Worker
     *
     * @class MessageHandler
     * @method work
     * @public
     */
    public async work() {
        try {
            const messageData: any = await MessageHandler.getMessageData()
            if(messageData.user === null || messageData.user === undefined) {
                await MessageHandler.sendMessage(messageData.senderId, this.defaultUnknownMessage)
            } else if(messageData.text.length >= this.messageMaxLength) {
                // should send message and start split message into pieces
                // each piece should be 140 at length

                // first we will remove @username from the message
                let pureMessage = messageData.text.replace(`@${messageData.user.username}`,'')
                // then we will get the length of @username and add it in the 1st place in message
                let usernameLength = messageData.user.username.length + 1 //+1 i.e @
                let message = `@${messageData.user.username} ${pureMessage}`
                // ok, we should now split message into small pieces of n times
                let n = 140 - usernameLength
                //but wait, now if i want to make a reply, i should add @my_username to the reply
                // so i will calculate the length of @my_username
                const myUsernameLength = messageData.myUsername + 1
                // now i should check if the @username < @my_username ?
                if(myUsernameLength >= usernameLength) {
                    n = 140 - myUsernameLength
                }
                let messageArray = message.match(new RegExp('(.|[\\r\\n]){1,' + n + '}', 'g'))
                await MessageHandler.sendMessage(messageData.senderId, this.maxLengthExceeded)
                // here will make a tweet
                const twtId: number = await TweetHandler.tweet(messageArray[0])
                //snooze without halting the event loop for 30s
                await this.snooze(30000)
                for(let i = 1; i <= messageArray.length; i++){
                    if(typeof messageArray[i] === 'undefined'){
                        await MessageHandler.sendMessage(messageData.senderId, "Thank You, you could Check it now")
                        return
                    }
                    await TweetHandler.reply(twtId, `@${messageData.myUsername} ${messageArray[i]}`)
                    await this.snooze(10000)
                }
                await MessageHandler.sendMessage(messageData.senderId, "Thank You, you could Check it now")
                //when the user sends unknown message
            } else {
                await TweetHandler.tweet(messageData.text)
                await this.snooze(5000)
                await MessageHandler.sendMessage(messageData.senderId, "Thank You, you could Check it now")
            }
        } catch(error) {
            log.error(error)
            throw new Error(error)
        }
    }

    /**
     * to send a Message
     *
     * @class MessageHandler
     * @method sendMessage
     * @public
     * @param toId
     * @param message
     */
    public static async sendMessage(toId: number, message: string){
        try {
            await Bot.post('direct_messages/new', {
                user_id: toId,
                text: message
            })
        } catch(error) {
            log.error(error)
            throw new Error(error)
        }
    }
}
export default MessageHandler