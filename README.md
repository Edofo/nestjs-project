# Runnig NestJs in a Docker Container

This is a [Nest Js](https://github.com/nestjs/nest) project configured for use with Docker

## Installation

```bash
# if you don't have pnpm installed
$ npm install -g pnpm
$ pnpm install --frozen-lockfile
```

Ensure also that [Docker is installed](https://docs.docker.com/engine/install) on your work station

## Running the app using node server (the normal way)

```bash
# development
$ pnpm start:dev
or
nest start

# Debug/watch
$ pnpm start:debug

# production
$ pnpm build:prod
$ pnpm start
```

## Using Docker File

```sh
# Build the image
$ docker build -t nest-js:v1.0 .

# Run the image interactively
$ docker run -it -p 3000:3000 nest-js:v1.0
```

## Using Docker Compose

```sh
# Build the docker image
$ docker-compose build

# Start and login to the container
$ docker-compose up -d
$ docker-compose exec app sh

# Stop the container
$ docker-compose down
```

## Other useful Docker commands

```sh
# Get the container ID
$ docker ps

# View logs
$ docker logs <container id>

# Enter the container (In alpine, use sh because bash is not installed by default)
$ docker exec -it <container id> /bin/sh
```

## License

[MIT licensed](LICENSE)
