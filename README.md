# Employee management application - front

### Requirements

- node v.16.x.x installed on your local machine
- npm v.8.x.x installed on your local machine

Check in the terminal:

```
node -v
v16.x.x

npm -v
v8.x.x
```

## Deployments

- `master` branch deploys automatically when new changes are committed on this url:

   https://employee-management-master.herokuapp.com

- every pull request is automatically deployed with Heroku

## To run application locally:

1. Clone repo on your local machine:

```
git clone https://github.com/employee-management-app/front
```

2. Open folder with project:

```
cd front
```

3. Copy `.env` file to `.env.local` file and set up needed variables:

```
# .env.local

API_URL=http://127.0.0.1:8000/api
REACT_APP_GOOGLE_MAPS_API_KEY=
```

4. Run `npm i`:

```
front> npm i
```

5. Run `npm start`:

```
front> npm start
```

6. Open browser and navigate to `http://localhost:3000`

## How can you test PWA locally?:

1. Open folder with project:

```
cd front
```

2. Run `npm run build`:

```
front> npm run build
```

3. Install `serve` globally on your machine (if you don't have):

```
front> npm i -g serve
```

4. Run `serve -s build`:

```
front> serve -s build
```
