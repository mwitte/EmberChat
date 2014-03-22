### v0.1.0
*2014-03-22*

- fix: #6: Update button failed
- updated server application for appserver.io 0.6beta
- fix: history for user-conversation when conversation gets opened in background
- vertical spread for conversation-, user- and room-list
- history for room conversations
- set end-to-end encryption key length fixed to 1024 bit
- fix #5: After re-login the user is only in one room
- fix #3: Wrong date in history

### v0.0.1
*2014-02-22*

- authentication
- conversation
    - user-to-user
        - history
        - end-to-end encryption (RSA/AES)
    - rooms(multiple users)
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