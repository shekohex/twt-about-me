import Bot from './../Bot'
import Logger from './../Logger'
const log = Logger('TweetHandler')

class TweetHandler {
    /**
     * Make a tweet
     *
     * @class TweetHandler
     * @method tweet
     * @static
     * @param text
     *
     * @return {tweet.data.id} number
     */
    public static tweet(text: string): any {
        try {
            Bot.post('statuses/update', {status: text}).then(tweet => {
                log.debug(`OK#${tweet.data.id}`)
                return tweet.data.id
            })

        } catch (error) {
            throw error
        }
    }
    /**
     * Make a reply on a tweet
     *
     * @class TweetHandler
     * @method tweet
     * @static
     * @param text: the text of the reply
     * @param id: the id of the tweet
     */
    public static reply(id: number, text: string) {
        try {
            Bot.post('statuses/update', {status: text, in_reply_to_status_id: id})
            log.debug('OK !')
        } catch (error) {
            throw error
        }
    }
}
export default TweetHandler