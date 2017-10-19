[![Greenkeeper badge](https://badges.greenkeeper.io/shekohex/dead-simple-feedback-app.svg)](https://greenkeeper.io/)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Heroku](http://heroku-badge.herokuapp.com/?app=dead-simple-feedback&style=flat)](https://heroku.com/)

# Tweet about Me
a twitter bot that receives a DM from you and make a tweet about it.

If you want to send a message to someone just send a message followed by his/her username and let the bot make the rest
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node JS and GIT installed 

### Installing

1 - frist of all you need to clone this repo

```
git clone https://github.com/shekohex/twt-about-me.git
cd /twt-about-me
npm install
```
2 - go to [Twitter Apps](https://apps.twitter.com/) and create new app

2 - then you need to copy and rename .env-example file to .env and open it
edit your Twitter details and save the file
```text
CONSUMER_KEY=
CONSUMER_SECRET=
ACCESS_TOKEN=
ACCESS_TOKEN_SECRET=
```

3 - after editing the .env file , run this command

```text
npm run dev
```
then go tot your twitter account and make a test by sending a message to the bot 

#### Send the twtAboutMe a message
> you can send this bot a message [@twt_about](https://twitter.com/twt_about)
## Built With

* [Twit](https://github.com/ttezel/twit) - Twitter API Client for node (REST & Streaming API)
* [Typescript](http://www.typescriptlang.org/) - TypeScript is a superset of JavaScript that compiles to clean JavaScript output

## Contributing

you are welcome with this project for contributing, just contact me 

## Authors

* **Shady Khalifa** - *Initial work*

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the GNU License - see the [LICENSE.md](LICENSE.md) file for details
