import * as winston from 'winston'
winston.addColors(winston.config.npm.colors)
winston.add(winston.transports.Console, {
    name : 'info',
    level: 'info',
    colorize: true,
    json: true,
    prettyPrint: true,
    humanReadableUnhandledException: true
})
winston.add(winston.transports.Console, {
    name : 'debug',
    level: 'debug',
    colorize: true,
    json: true,
    prettyPrint: true,
    humanReadableUnhandledException: true
})
class Logger {
    private name: string

    constructor(name: string) {
        this.name = name
    }

    debug(format: string, ...params: any[]) {
        winston.log.apply(this, ['debug', format].concat(params))
    }

    info(format: string, ...params: any[]) {
        winston.log.apply(this, ['info', this.name + ' - ' + format].concat(params))
    }

    warn(format: string, ...params: any[]) {
        winston.log.apply(this, ['warn', this.name + ' - ' + format].concat(params))
    }

    error(format: string, ...params: any[]) {
        winston.log.apply(this, ['error', format].concat(params))
    }
}

export default function(name: string) {
    return new Logger(name)
}