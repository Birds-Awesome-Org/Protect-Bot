# protect-branch

 A GitHub App built with [Probot](https://github.com/probot/probot) that automatically protects the default (often `master`) branch of a newly created repository within an organization and alerts the repository creator of the protection. 

![Probot](https://avatars1.githubusercontent.com/u/26350515?s=280&v=4)

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

## Running the Service

If using localhost, add port 4567 to your default website in IIS. Then publish the code to a virtual directory path that you will need to create within IIS. Once the code is published, you will need to run a powershell script (that I can supply to you all) to populate the secret key values in the web.config. If you encounter any issues updating the values you may need to start Powershell in admin mode. Once you do, run the following command before your update command (please note that in the code's current state, this script needs to be ran upon the completion of every publish.)

**set-executionpolicy remotesigned**

Enter Y when prompted and you should be good to go.

### Running ngrok
If you need to run ngrok to get a public facing URI, open your command prompt and navigate to the folder that contains the ngrok executable. Once there, the command to get a public URI is:

**ngrok http 4567**

The command should produce a screen that looks like:

![](http://i.imgur.com/Bt6ADL6.png)

Grab the value that is printed next to the label "Forwarding". Also, please keep in mind that the URI value changes every time you start the ngrok service. You will need to update your Webhook if you stop it and restart it.

Once you have the URI you want to use, head back to GitHub and navigate to the Organization settings screen. Click the **Edit** button on the Webhook you created earlier and paste your URI with the following value after it into the Payload URL textbox:

**::YourURI::/api/webhooks/incoming/github**

This will point the Webhook at your handler endpoint and allow for any messages to fall into the workflow. 

Click **Update Webhook** to save your value and lets start deleting some repositories! (Empty ones, please.)

## Contributing

If you have suggestions for how protect-branch could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Attribution

- [Probot](https://probot.github.io/docs/) 
- [Migarjo - probot-create-issue-on-repo](https://github.com/migarjo/probot-create-issue-on-repo-creation)
- [Andrew Lock | .NET Escapades](https://andrewlock.net/creating-my-first-github-app-with-probot-part-1-create-probot-app/)
- [Github Learning Lab](https://lab.github.com/githubtraining/getting-started-with-github-apps)
- [Toadstool](https://github.com/Hollywood/toadstool)
- Shout out to @Hollywood & @Beardofedu for the QA sessions

## Current implementation

This Probot application is currently being deployed on [Heroku](https://www.heroku.com/) for the testing of this application. 

If you would like to test the application out, please reach out to me (bird.stephen.c@gmail.com) to be given access to this organization. 

## License

[ISC](LICENSE) © 2019 Stephen Bird <bird.stephen.c@gmail.com>
