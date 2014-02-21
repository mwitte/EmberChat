![EmberChat](images/icon-128.png)
# EmberChat


> [EmberChat](http://mwitte.github.io/EmberChat) is a chat application made with web technologies as **native application**.

## Main Features

 - common chat features
 - native application
 - end to end encryption for user-user chats

It useses [appserver.io](http://appserver.io) as server and ember.js as application framework. The native applications
are build within a [node-webkit](https://github.com/rogerwang/node-webkit) runtime which runs on several platforms.

## Download (alpha)

 - [MacOs](https://dl.dropboxusercontent.com/u/8932463/EmberChat/EmberChat.MacOS.zip)
 - [Linux64](https://dl.dropboxusercontent.com/u/8932463/EmberChat/EmberChat.Linux64.zip)
 - [Windows](https://dl.dropboxusercontent.com/u/8932463/EmberChat/EmberChat.Windows.zip)

There is currently no server online available so if you want to use it host your own [server](https://github.com/mwitte/EmberChatAppServer).

It's currently under heavy development so there are no releases yet. To get an idea what it's about..

<iframe width="853" height="480" src="//www.youtube.com/embed/OYYpQpinV4U" frameborder="0" allowfullscreen></iframe>

### Features ###
 - authentication
 - conversation
    - user-to-user
        - history
        - end-to-end encryption (RSA/AES)
    - rooms(multiple users)
 - notification on site on message
 - native app
    - MacOS, Windows, Linux32, Linux64
    - desktop notifications
 - creating rooms
 - admin
    - creating users
    - removing rooms

### Planned ###
 - deleting users(admin)
 - save open conversations
 - more user attributes(forename, surname)
 - history for room conversations
 - auto reconnect
 - quicksearch
    - userlist
    - conversations
    - rooms
 - @mention in rooms
 - user state(dnd, free for chat, idle)
 - global voting system
 - file transfer
 - semantic rendering(urls)
 - emoticons ;-)
 - video conversation
 - more test coverage
 - design

## Author

Matthias Witte ([Twitter](https://twitter.com/wittematze)/[GitHub](https://github.com/mwitte)).

![Matthias Witte](http://www.gravatar.com/avatar/edff138585674e635ae6f133c0cd10c6.png?s=200)

### License

not sure so far