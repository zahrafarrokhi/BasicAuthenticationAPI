#### install
django restApi dosent have login api,has middleware to recognize user has logged in via token/session
### login
`Base Endpoints`
[User Create](https://djoser.readthedocs.io/en/latest/base_endpoints.html)
[User model](https://docs.djangoproject.com/en/4.0/ref/contrib/auth/#django.contrib.auth.models.User)
```python
# django model => venv/lib/django/contrib/auth/models/User
class AbstractUser(AbstractBaseUser, PermissionsMixin):
     .
     .
     .
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]
```
#### postman
create authentication workspace
create djoser collections
add requset
 
```jsx
//https://djoser.readthedocs.io/en/latest/base_endpoints.html
signup(register) =>
method => post 
Request => 

{{ User.USERNAME_FIELD }} => django model => up
{{ User.REQUIRED_FIELDS }}=> django model => up
password =>// comment AUTH_PASSWORD_VALIDATORS in settings
re_password

```
![signup](./screenshots/signup.png)

### login
1. Token
2. JWT

#### Token Endpoints
```jsx
Token Based Authentication
INSTALLED_APPS = [
    'django.contrib.auth',
    (...),
    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
    (...),
]
//
urlpatterns = [
  
  path('auth/', include('djoser.urls.authtoken')),
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        (...)
    ),
}
./manage.py migrate
```
```jsx
//https://djoser.readthedocs.io/en/latest/token_endpoints.html
//Default URL: /token/login/
Method => post 
Request =>
{{ User.USERNAME_FIELD }}
password

```
![login](./screenshots/TokenLogin.png)


#### JSON Web Token Authentication(jwt)
```jsx
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        (...)
    ),
}

SIMPLE_JWT = {
   'AUTH_HEADER_TYPES': ('Bearer',),
}

urlpatterns = [
   
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    
]

```
### login(JWT Create)
```jsx
//https://djoser.readthedocs.io/en/latest/jwt_endpoints.html
//JWT Create
Method => POST
Request =>
{{ User.USERNAME_FIELD }}
password

```
![login](./screenshots/jwtLogin.png)

#### JWT Refresh
```jsx
//https://djoser.readthedocs.io/en/latest/jwt_endpoints.html
//JWT Refresh
Method => POST
Request => refresh


```
![refresh](./screenshots/JWTrefresh.png)

#### JWT Verify
check if token is expired
```jsx
// https://djoser.readthedocs.io/en/latest/jwt_endpoints.html
//JWT Verify
Method => POST
Request => token => refresh (up)

```
![tokenError](./screenshots/TokenError.png)
#### solution
```jsx
//settings
SIMPLE_JWT = {
    'BLACKLIST_AFTER_ROTATION': False,

}
```
![token](./screenshots/TokenVerify.png)

#### Base Endpoints
#### getUser
1.Token
2.Jwt
### User
1.Token
```jsx
//https://djoser.readthedocs.io/en/latest/base_endpoints.html

Method =>  Get

```
![userTokenError](./screenshots/userTokenError.png)

### solution
put token in headers
```
Authorization:Token aba38b705546c73cad4b69e15b99ab58b30b5d4c
```
![userTokenError](./screenshots/userToken.png)

2.Jwt
```jsx
//https://djoser.readthedocs.io/en/latest/base_endpoints.html

Method =>  Get
Headers =>
Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU5NDMzMTgwLCJqdGkiOiJmZmEyNmMyNGEwNTE0YzcwYWZiMzY3NDI0ZmQ3NDZmOSIsInVzZXJfaWQiOjF9.RDIJ8TxVpknzx6miZFS8W2yLW-FEE6JpbtHzhhoysk0
```
![userJWTError](./screenshots/userJWTError.png)
### solution
If token is expired, use refresh to get new access token
```jsx
//127.0.0.1:8000/auth/jwt/refresh/

//JWT Refresh
Method => POST
Request => refresh

```

You can also change expiration times in simple_jwt settings:

```python

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),

    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

![userJWT](./screenshots/userJWT.png)


# put jwt


![putUserNoheader](./screenshots/putUserNoheader.png)
## put header
![putUserExpire](./screenshots/putUserExpire.png)
## refresh access token
![putUser](./screenshots/putUser.png)

# put token
```jsx
//127.0.0.1:8000/auth/users/me/
email => s@gmail.com
//bulkedit
header => Authorization:Token aba38b705546c73cad4b69e15b99ab58b30b5d4c
```
![putToken](./screenshots/PutToken.png)


## Nested Authorization

```jsx
Type => Bearer Token
Token => access token

```
![nested auth](./screenshots/NestedAuth.png)

for example
```jsx

//  GET => 127.0.0.1:8000/auth/users/me/
authorization => inherit from parent
remove authorization header
```


#### environmets
![environmets](./screenshots/environments.png)

foe example

```jsx
//{{url}}/auth/users/
```
![local](./screenshots/local.png)