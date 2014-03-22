![EmberChat](images/icon-128.png)



> EmberChat is a chat application made with web technologies as **native application**.

## Main Features

 - common chat features
 - native application
 - end to end encryption for user-user chats

It useses [appserver.io](http://appserver.io) as server and ember.js as application framework. The native applications
are build within a [node-webkit](https://github.com/rogerwang/node-webkit) runtime which runs on several platforms. Main
project on [github](https://github.com/mwitte/EmberChat/).

## Download EmberChat v0.1.0 (beta)

 - [MacOs](https://dl.dropboxusercontent.com/u/8932463/EmberChat/EmberChat.MacOS-0.1.0.zip)
 - [Linux64](https://dl.dropboxusercontent.com/u/8932463/EmberChat/EmberChat.Linux64-0.1.0.zip)
 - [Windows](https://dl.dropboxusercontent.com/u/8932463/EmberChat/EmberChat.Windows-0.1.0.zip)

[Changelog](https://github.com/mwitte/EmberChat/blob/master/doc/Changelog.md)

There is currently no server online available so if you want to use it host your own
[server](https://github.com/mwitte/EmberChatAppServer). To get an idea..

<iframe width="853" height="480" src="//www.youtube.com/embed/77dYi2lf54Y" frameborder="0" allowfullscreen></iframe>

## Bugs

Before you'll report a bug look at the planned features section, probably it's not implemented yet. Please report
Bugs on [github](https://github.com/mwitte/EmberChat/issues).

### Features ###
 - authentication
 - conversation
    - user-to-user
        - history
        - end-to-end encryption (RSA/AES)
    - rooms(multiple users)
        - history
        - automated rejoin after authentication
 - notification on site on message
 - native app
    - MacOS, Windows, Linux32, Linux64
    - desktop notifications
 - create rooms
 - admin
    - create/remove users
    - remove rooms
 - auto reconnect
 - automated 'version changed' notification
 - timestamp for conversation content
 - server uptime
 - semantic rendering for urls
 - history for sent messages(arrow up/down in textfield)

### Planned ###
 - improved error/success messaging
 - i18n
 - quicksearch
    - userlist
    - conversations
    - rooms
 - @mention in rooms
 - dedicated admin backend(appliance setup, creating users etc.)
 - and lots of more(global voting/message system, file transfer, semantic rendering(code), emoticons ;-), video conversation, more test coverage, design, user state)

## Author

Matthias Witte ([Twitter](https://twitter.com/wittematze)/[GitHub](https://github.com/mwitte)).

![Matthias Witte](http://www.gravatar.com/avatar/edff138585674e635ae6f133c0cd10c6.png?s=200)

### License

not sure so far