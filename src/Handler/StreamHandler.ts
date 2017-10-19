import Bot from './../Bot'
import Logger from './../Logger'
const log = Logger('StreamHandler')

class StreamHandler {
    /**
     * Fired when someone send a DM
     *
     * @class StreamHandler
     * @method onDirectMessages
     * @static
     *
     * @return {Stream} object
     */
    public static onDirectMessages(): any {
        const stream = Bot.stream('user')
        try {
            stream.on('direct_message', data => {
                return data
            })
        } catch(error) {
            log.error(error)
            throw error
        }
    }
    /**
     * Fired when someone Favorite my tweet
     *
     * @class StreamHandler
     * @method onFavorite
     * @static
     *
     * @return {Stream} object
     */
    public static async onFavorite(): Promise<object> {
        const stream = Bot.stream('user')
        try {
            return await stream.on('favorite')
        } catch(error) {
            log.error(error)
            throw error
        }
    }
    /**
     * Fired when someone Follow me
     *
     * @class StreamHandler
     * @method onFollow
     * @static
     *
     * @return {Stream} object
     */
    public static async onFollow(): Promise<object> {
        const stream = Bot.stream('user')
        try {
            return await stream.on('follow')
        } catch(error) {
            log.error(error)
            throw error
        }
    }
    /**
     * Fired when someone Un Follow me
     *
     * @class StreamHandler
     * @method onUnFollow
     * @static
     *
     * @return {Stream} object
     */

    public static async onUnFollow(): Promise<object> {
        const stream = Bot.stream('user')
        try {
            return await stream.on('unfollow')
        } catch(error) {
            log.error(error)
            throw error
        }
    }
    /**
     * Fired when someone Quote a Tweet
     *
     * @class StreamHandler
     * @method onQuotedTweet
     * @static
     *
     * @return {Stream} object
     */
    public static async onQuotedTweet(): Promise<object> {
        const stream = Bot.stream('user')
        try {
            return await stream.on('quoted_tweet')
        } catch(error) {
            log.error(error)
            throw error
        }
    }
    /**
     * Fired when someone Favorite my tweet
     *
     * @class StreamHandler
     * @method onFavorite
     * @static
     *
     * @return {Stream} object
     */
    public static async onDisconnect(): Promise<object> {
        const stream = Bot.stream('statuses/sample')
        try {
            return new Promise(resolve => {
                stream.on('disconnect', data => {
                    resolve(data)
                })
            })
        } catch(error) {
            log.error(error)
            throw error
        }
    }
}
export default StreamHandler