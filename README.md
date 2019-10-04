# protect-branch

> A GitHub App built with [Probot](https://github.com/probot/probot) that automatically protects the default (often `master`) branch of a newly created repository within an organization and alerts the repository creator of the protection. 

>![Probot](https://avatars1.githubusercontent.com/u/26350515?s=280&v=4)

## Setup

Probot applications can be [deployed](https://probot.github.io/docs/deployment/) from a handful of locations such as Glitch, Heroku, Now, and others. The following setup instructions are for getting the Probot application up and running locally for proof-of-concept testing or general interest.

1. Clone the repository to your local machine
1. From the cloned repository folder use the following commands:

```sh
# To install dependencies run:
npm install

# To initiate the bot
npm start
```

For assistance with errors encountered while using the `npm` commands, I found the following helpful:

- [Common errors](https://docs.npmjs.com/common-errors)
- [Maximum call stack size exceeded](https://stackoverflow.com/a/51336567)

## Contributing

If you have suggestions for how protect-branch could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Attribution

- [Probot](https://probot.github.io/docs/)
- [Migarjo - probot-create-issue-on-repo](https://github.com/migarjo/probot-create-issue-on-repo-creation)
- [Andrew Lock | .NET Escapades](https://andrewlock.net/creating-my-first-github-app-with-probot-part-1-create-probot-app/)
- [Github Learning Lab](https://lab.github.com/githubtraining/getting-started-with-github-apps)


## License

[ISC](LICENSE) © 2019 Stephen Bird <bird.stephen.c@gmail.com>
