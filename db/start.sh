#!/bin/bash
# Start MongoDB container with specified environment variables and port mapping

docker pull mongo:4.4

if [ $? -ne 0 ]; then
  echo "Failed to pull MongoDB image. Please check your Docker installation and network connection."
  exit 1
fi

docker run -d \
  --name mongo \
  -e MONGO_INITDB_ROOT_USERNAME=eddealmeida \
  -e MONGO_INITDB_ROOT_PASSWORD=4lf483t0 \
  -p 27017:27017 \
  mongo:4.4

exit 0
