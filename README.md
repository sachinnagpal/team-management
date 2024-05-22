# Team Management

A NestJS backend application for managing team members with full CRUD (Create, Read, Update, Delete) operations.

## Features

- Add new team members
- Retrieve a list of team members
- Update team member details
- Delete team members

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)
- [Docker](https://www.docker.com/get-started) (optional, for Docker usage)

## Installation

To install the necessary dependencies, run:
```bash
  npm install
```

Starting the Service
To start the service, run:
```bash
  npm run start
```

Running the tests
To run the unit test using jest, run:
```bash
  npm run test
```

## Docker

To run as docker run the below commands 

```bash
  docker-compose build
  docker-compose up
```


## Examples

### CREATE

```bash
  curl --location --request POST 'http://localhost:3000/team-members/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Sachin",
    "lastName": "Nagpal",
    "email": "sachin_nagpal@gmail.com",
    "phoneNumber" : "+919654791277",
    "role":"user"
}'
```

Expected Response

```json
{
    "firstName": "Sachin",
    "lastName": "Nagpal",
    "phoneNumber": "+919654791277",
    "email": "sachin_nagpal@gmail.com",
    "role": "user",
    "_id": "664d0b2c278f36fd81e3cf0e",
    "__v": 0
}
```

### UPDATE

```bash
curl --location --request PUT 'http://localhost:3000/team-members/664d0b2c278f36fd81e3cf0e' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Sachin",
    "lastName": "Nagpal",
    "email": "snagpal357@gmail.com",
    "phoneNumber" : "+919654791277",
    "role":"admin"
}'
```
Expected Response

```json
{
    "_id": "664d0b2c278f36fd81e3cf0e",
    "firstName": "Sachin",
    "lastName": "Nagpal",
    "phoneNumber": "+919654791277",
    "email": "snagpal357@gmail.com",
    "role": "admin",
    "__v": 0
}
```

## GET 

```bash
curl --location --request GET 'http://localhost:3000/team-members/'
```
Expected Response

```json
[
    {
        "_id": "664d0b2c278f36fd81e3cf0e",
        "firstName": "Sachin",
        "lastName": "Nagpal",
        "phoneNumber": "+919654791277",
        "email": "snagpal357@gmail.com",
        "role": "admin",
        "__v": 0
    }
]
```

## DELETE

```bash
curl --location --request DELETE 'http://localhost:3000/team-members/664d0b2c278f36fd81e3cf0e'
```
Expected Response

```true```
