#!/bin/bash
set -e

TAG=$(git log -1 --pretty=%h)
LATEST="latest"
FRONT_IMAGE="$1"
BACK_IMAGE="$2"

echo "Building $FRONT_IMAGE image..."
export FRONT_IMAGE_NAME="$FRONT_IMAGE:$TAG"
export LATEST_FRONT_IMAGE_NAME="$FRONT_IMAGE:$LATEST"
echo "$LATEST_FRONT_IMAGE_NAME"
echo "$FRONT_IMAGE_NAME"

docker build -t="$FRONT_IMAGE_NAME" . -f="apps/catsagram/Dockerfile"
docker tag "$FRONT_IMAGE_NAME" "$LATEST_FRONT_IMAGE_NAME"
docker push "$FRONT_IMAGE_NAME"
docker push "$LATEST_FRONT_IMAGE_NAME"
docker rmi "$FRONT_IMAGE_NAME"
docker rmi "$LATEST_FRONT_IMAGE_NAME"

echo "Building $BACK_IMAGE image..."
export BACK_IMAGE_NAME="$BACK_IMAGE:$TAG"
export LATEST_BACK_IMAGE_NAME="$BACK_IMAGE:$LATEST"
echo "$LATEST_BACK_IMAGE_NAME"
echo "$BACK_IMAGE_NAME"

docker build -t="$BACK_IMAGE_NAME" . -f="apps/api/Dockerfile"
docker tag "$BACK_IMAGE_NAME" "$LATEST_BACK_IMAGE_NAME"
docker push "$BACK_IMAGE_NAME"
docker push "$LATEST_BACK_IMAGE_NAME"
docker rmi "$BACK_IMAGE_NAME"
docker rmi "$LATEST_BACK_IMAGE_NAME"