# EmberChat [![Build Status](https://travis-ci.org/mwitte/EmberChat.png)](https://travis-ci.org/mwitte/EmberChat)#

EmberChat is a chat application made with web technologies as browser and native application.
Head to the [project homepage](http://mwitte.github.io/EmberChat/). It uses
[EmberChatAppServer](https://github.com/mwitte/EmberChatAppServer) as server.

### Main Features ###
 - common chat features
 - native applications
 - end to end encryption for user-user chats with RSA(1024 bit) and AES
 
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

### Build ###

```
npm install
bower install
grunt
```

### Used Libraries ###
[ember.js](http://emberjs.com/) -
[handlebars](http://handlebarsjs.com/) -
[jQuery](http://jquery.com/) -
[Boostrap](http://getbootstrap.com/) -
[SHA-256 by Chris Veness](http://www.movable-type.co.uk) -
[JSEncrypt by Travis Tidwell](http://travistidwell.com/) -
[Gibberish-AES by Mark Percival](http://mpercival.com)
