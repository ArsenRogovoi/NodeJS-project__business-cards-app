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
**Body**: Json

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
