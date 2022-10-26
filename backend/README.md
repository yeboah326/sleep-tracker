# PROJECT SETUP
Install required packages 

```
npm install
```

Create `.env` file and add the environment variables
```
touch .env
```

```
PORT=3000
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_HOST=0.0.0.0
DATABASE_PORT=27017
JWT_TOKEN=very_long_token
SALT_FACTOR=10
```

Run project
```
npm run start
```

Run backend tests
```
npm run test
```