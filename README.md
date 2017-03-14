# Capsule Specific Instructions #

## Setup ##

To run locally, follow these instructions
[Developer Machine Setup](http://docs.mattermost.com/developer/developer-setup.html).

Be sure that the repo is at `$GO_PATH/github.com/mattermost/platform`, as that
is how the import statements work.

## Release ##

1. Add `mattermost-s3-bucket`, `mattermost-s3-access`, and
   `mattermost-s3-secret` to your OSX keychain as passwords.
1. Create a release branch from master.
1. Run `make release` from the release branch.
1. See anchor repo for deployment instructions.

# Mattermost

Mattermost is an open source, self-hosted Slack-alternative from [https://mattermost.org](https://mattermost.org).

It's written in Golang and React and runs as a single Linux binary with MySQL or Postgres. Every month on the 16th [a new compiled version is released under an MIT license](https://www.mattermost.org/download/).

- [Review product documentation](http://docs.mattermost.com/).
- [Download compiled version](https://mattermost.org/download).

Try out Mattermost: 

- [Join the Mattermost Contributor's server](https://pre-release.mattermost.com/) (latest nightly builds, unstable)
- [Join the Mattermost Demo server](https://demo.mattermost.com) (latest stable version)

Deploy on Heroku 

[![Deploy a Preview](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/mattermost/mattermost-heroku)

_Note: Heroku preview does not include email or persistent storage_

Install on your own machine: 

- [One-line Docker Preview](http://docs.mattermost.com/install/docker-local-machine.html#one-line-docker-install) 
- [Developer Machine Setup](http://docs.mattermost.com/developer/developer-setup.html)
- [Production Install Guides using Linux Binary](http://www.mattermost.org/installation/)
- [Production Docker Install](https://docs.mattermost.com/install/prod-docker.html) 

Get Involved:

- [Contribute Code](http://docs.mattermost.com/developer/contribution-guide.html)
- [Find "Help Wanted" projects](https://mattermost.atlassian.net/issues/?filter=10101)
- [Join Developer Discussion on a Mattermost Server for contributors](https://pre-release.mattermost.com/signup_user_complete/?id=b8230f359369ed80c46ecb8696901b3e)
- [File Bugs](http://www.mattermost.org/filing-issues/)
- [Share Feature Ideas](http://www.mattermost.org/feature-requests/)
- [Get Troubleshooting Help](https://forum.mattermost.org/t/how-to-use-the-troubleshooting-forum/150)

Learn More:

- [API Options - webhooks, slash commands, drivers and web service](http://docs.mattermost.com/developer/api.html)
- [Localization Guide](http://docs.mattermost.com/developer/localization.html#translation-process)

Get the Latest News:

- **Twitter** - Follow [MattermostHQ](https://twitter.com/mattermosthq)
- **Email** - Subscribe to our [newsletter](http://mattermost.us11.list-manage.com/subscribe?u=6cdba22349ae374e188e7ab8e&id=2add1c8034) (1 or 2 per month)
- **IRC** - Join us on #matterbridge (thanks to [matterircd](https://github.com/42wim/matterircd))

Any other questions, mail us at info@mattermost.com. We’d love to meet you!
