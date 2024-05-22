
# load environment variables
source ./docker/env.sh

docker buildx build \
  --platform=linux/amd64 \
  --tag cruzzle-$1:latest \
  --progress plain \
  -f $1/Dockerfile .
