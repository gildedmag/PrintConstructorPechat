#!/usr/bin/env bash

cd ../

FILE=src/main/java/Version.java
DATE=\"`date '+%d.%m.%Y %H:%M'`\"
PREFIX="version = "
STRING="$PREFIX.*$"
SUBSTITUTE="$PREFIX$DATE;"
if ! grep -q "$SUBSTITUTE" "$FILE"; then
  sed -i '' "1,/$(echo "$STRING")/ s/$(echo "$STRING")/$(echo "$SUBSTITUTE")/" $FILE
fi

rm test/render
mvn clean compile assembly:single

cat scripts/stub.sh ./build/render.jar > ./build/render
#rm build/render.jar
chmod +x build/render
cp build/render test/render
mvn clean

./test/render -v
./build/render -v

USER=${CONSTRUCTOR_REMOTE_USER}
PASS=${CONSTRUCTOR_REMOTE_PASSWORD}
HOST=${CONSTRUCTOR_REMOTE_IP}
DIR=${CONSTRUCTOR_REMOTE_RENDER_DIR}
DEST="${CONSTRUCTOR_REMOTE_USER}@${CONSTRUCTOR_REMOTE_IP}:${CONSTRUCTOR_REMOTE_RENDER_DIR}"
rsync --update --progress build/render $DEST

ssh -l ${USER} ${HOST} "service render restart"
ssh -l ${USER} ${HOST} "${DIR}/render -v"