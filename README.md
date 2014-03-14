# Getting started

## User sign up

1. Set header
  * `client-id = 'mobile'`
  
2. Post to /api/v1/user/new
  * `body.number` should be a phone number

3. Post to /api/v1/user/verify
  * `body.code` should be the verification code you were sent via sms
  * `body.number` should be the same phone number
 
4. Recieve token
  * you will now recieve the user's token
  * Set Header
    * `token` = that token you just got back

5. Save that token
  * local, cookie, session store on mobile device
  * token in header grants access to /api/*
  * no access without token and client id except on new user and verify

6. Test
  * `grunt test`