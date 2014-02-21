# EmberChat [![Build Status](https://travis-ci.org/mwitte/EmberChat.png)](https://travis-ci.org/mwitte/EmberChat)#

This is a webapp chat client for [EmberChatAppServer](https://github.com/mwitte/EmberChatAppServer) based on ember.js
 
Currently under heavy development.
 
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
