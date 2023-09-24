# Business cards app

This is a project of HackerU bootcamp in NodeJS. This app
is a REST API server of business cards which registered users create for other users of this server.

If you are not a registered user you can search for business cards that other business users created but if you want create your own card you have to register like a business user.

## There is description of this API:

### Users:

- **User registration:**

  If you want to registrate user you have to make http request described below:

**Route**: _host_/users </br>
**Mehtod**: POST </br>
**Authorization**: Isn't required </br>
**Body**: Json 👇

```JSON
{
      "name": {
        "first": "John",            //required
        "middle": "",               //isn't required
        "last": "Doe"               //required
        },
      "isBusiness": false,          //required, boolean (if you want your user be business user insert "true")
      "phone": "050-0000000",       //required
      "email": "usermail@mail.com", //required
      "password": "******",         //required
      "address": {
        "country": "user country",  //required
        "city": "user city",        //required
        "street": "user city",      //required
        "houseNumber": "5",         //required, number
        "zip": "5"                  //isn't required, number
      },
      "image": {
        "url": "",                  //isn't required
        "alt": ""                   //isn't required
        }
}
```

**Return**: Registrated user object </br>
**Action**: If you have passed the validation and you have got user object it means that you registered user and now his data saved in DB and now you can log in and get jwt token.

- **Login:**

  When user is already registrated you can get jwt token by using this http request to be able using requests which require jwt token:

**Route**: _host_/users/login </br>
**Mehtod**: POST </br>
**Authorization**: Isn't required </br>
**Body**: Json 👇

```JSON
{
    "email": "user@mail.com", //user mail is required
    "password": "******"      //user password is required
}
```

**Return**: JWT token </br>
**Action**: After sending right json with email and password you will get jwt token

- **Get all users data (for admins only!):**

  If you are admin user you can get data of all users (except for password) saved in DB:

**Route**: _host_/users </br>
**Mehtod**: GET </br>
**Authorization**: JWT token is required </br>
**Headers**: `x-auth-token` (jwt token) </br>
**Return**: Array of all users data </br>
**Action**: Getting users data

- **Get user data:**

  When you need your data saved in DB you can use this http request. If you are admin you can use this request for getting data of each user you want:

**Route**: _host_/users/_yourUserId_ </br>
**Mehtod**: GET </br>
**Authorization**: JWT token is required </br>
**Headers**: `x-auth-token` (jwt token) </br>
**Return**: User object </br>
**Action**: Getting user data

- **Edit your data:**

  When you need change your data use this http request to do it:

**Route**: _host_/users/_yourId_ </br>
**Mehtod**: PUT </br>
**Authorization**: JWT token is required </br>
**Body**: Json 👇

```JSON
{
    "name": {
        "first": "John",        //required
        "middle": "",           //isn't required
        "last": "Doe"           //required
    },
    "phone": "050-0000000",     //required
    "email": "mail@gmail.com",  //required
    "image": {
        "url": "http://localhost:8181/images/business-card.jpg", //isn't required
        "alt": "avatar"         //isn't required
    },
    "address": {
        "state": "not defined", //isn't required
        "country": "israel",    //required
        "city": "tel-aviv",     //required
        "street": "magnive",    //required
        "houseNumber": 5,       //required
        "zip": "7356"           //isn't required
    }
}
```

**Headers**: `x-auth-token` (jwt token) </br>
**Return**: new user object </br>
**Action**: Updating user data

- **Changing business status:**

  If you want be able to create business cards you have to be business user (your isBusiness key must to be `true`). To change your business status from `false` to `true` and vice versa use this http request:

**Route**: _host_/users/_yourId_ </br>
**Mehtod**: PATCH </br>
**Authorization**: JWT token is required </br>
**Headers**: `x-auth-token` (jwt token) </br>
**Return**: New user object </br>
**Action**: Changing business status of registrated user.

- **Deleting user from DB:**

  To delete your user profile from DB you need to use this request. To delete another user you must be an Admin:

**Route**: _host_/users/_yourId_ </br>
**Mehtod**: DELETE </br>
**Authorization**: JWT token is required </br>
**Headers**: `x-auth-token` (jwt token) </br>
**Return**: Deleted user object </br>
**Action**: Deleting user from DB.

---

### Cards:

- **Gettin cards:**

  All users even not registrated users have access to business cars:

**Route**: _host_/cards </br>
**Mehtod**: GET </br>
**Authorization**: none </br>
**Return**: Array of card objects </br>
**Action**: Getting cards from DB.

- **Getting my cards (for business users only):**

  To get your created cards use this http request. Remember, you must be business user:

**Route**: _host_/cards/my-cards </br>
**Mehtod**: GET </br>
**Authorization**: JWT token is required </br>
**Headers**: `x-auth-token` (jwt token) </br>
**Return**: Cards that you created </br>
**Action**: Getting your cards from DB.

- **Getting my cards (for business users only):**

  To get your created cards use this http request. Remember, you must be a business user:

**Route**: _host_/cards/my-cards </br>
**Mehtod**: GET </br>
**Authorization**: JWT token is required </br>
**Headers**: `x-auth-token` (jwt token) </br>
**Return**: Cards that you created </br>
**Action**: Getting your cards from DB.

- **Getting card:**

  If you want to get object of specific card use this request:

**Route**: _host_/cards/_cardId_ </br>
**Mehtod**: GET </br>
**Authorization**: none </br>
**Return**: Card object </br>
**Action**: Getting card from DB.

- **Creating business card (for business users only):**

  To create business card you must be a business user:

**Route**: _host_/cards </br>
**Mehtod**: POST </br>
**Authorization**: JWT token is required (Business user) </br>
**Body**: Json 👇

```JSON
{
      "title": "title",  //is required
      "subtitle": "subtitle", //is required
      "description": "description...", //is required
      "phone": "050-0000000", //is required
      "email": "mail@mail.com", //is required
      "web": "https://www.business.co.il", //isn't required
      "image": {
        "url": "", //isn't required
        "alt": ""  //isn't required
      },
      "address": {
        "state": "",  //isn't required
        "country": "test", //required
        "city": "test", // required
        "street": "test", // required
        "houseNumber": 3, // required
        "zip": "0" //isn't required
      }
}
```

**Headers**: `x-auth-token` (jwt token) </br>
**Return**: Created card </br>
**Action**: Create new card and save it in DB.

- **Editing business card (for user who created the card):**

  Use this http request to edit your business card:

**Route**: _host_/cards/_cardId_ </br>
**Mehtod**: PUT </br>
**Authorization**: JWT token is required (Card owner) </br>
**Body**: Json 👇

```JSON
{
      "title": "title",  //is required
      "subtitle": "subtitle", //is required
      "description": "description...", //is required
      "phone": "050-0000000", //is required
      "email": "mail@mail.com", //is required
      "web": "https://www.business.co.il", //isn't required
      "image": {
        "url": "", //isn't required
        "alt": ""  //isn't required
      },
      "address": {
        "state": "",  //isn't required
        "country": "test", //required
        "city": "test", // required
        "street": "test", // required
        "houseNumber": 3, // required
        "zip": "0" //isn't required
      }
}
```

**Headers**: `x-auth-token` (jwt token) </br>
**Return**: Edited card </br>
**Action**: Editing card and updating it in DB.

- **Like card (for registrated users):**

  This request add like to card:

**Route**: _host_/cards/_cardId_ </br>
**Mehtod**: PATCH </br>
**Authorization**: JWT token is required (registered user) </br>
**Headers**: `x-auth-token` (jwt token) </br>
**Return**: Liked card </br>
**Action**: Adding user id who liked the card to array of the card in key of `likes`.

- **Delete card (for card owner or admin):**

  This request delete card:

**Route**: _host_/cards/_cardId_ </br>
**Mehtod**: DELETE </br>
**Authorization**: JWT token is required (card owner or admin) </br>
**Headers**: `x-auth-token` (jwt token) </br>
**Return**: Deleted card </br>
**Action**: Delete the card from DB.
