#!/usr/bin/env bash

cd ../

./build/render -v

USER=${CONSTRUCTOR_REMOTE_USER}
PASS=${CONSTRUCTOR_REMOTE_PASSWORD}
HOST=${CONSTRUCTOR_REMOTE_IP}
DIR=${CONSTRUCTOR_REMOTE_RENDER_DIR}
DEST="${CONSTRUCTOR_REMOTE_USER}@${CONSTRUCTOR_REMOTE_IP}:${CONSTRUCTOR_REMOTE_RENDER_DIR}"
rsync --update --progress build/render $DEST

ssh -l ${USER} ${HOST} "service render restart"
ssh -l ${USER} ${HOST} "${DIR}/render -v"