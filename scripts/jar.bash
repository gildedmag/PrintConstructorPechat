#!/usr/bin/env bash

if [[ -z "$CONSTRUCTOR_REMOTE_USER" ]]; then
  echo Please set \"CONSTRUCTOR_REMOTE_USER\" environment variable before running the script!
  exit
fi

if [[ -z "$CONSTRUCTOR_REMOTE_PASSWORD" ]]; then
  echo Please set \"CONSTRUCTOR_REMOTE_PASSWORD\" environment variable before running the script!
  exit
fi

if [[ -z "$CONSTRUCTOR_REMOTE_IP" ]]; then
  echo Please set \"CONSTRUCTOR_REMOTE_IP\" environment variable before running the script!
  exit
fi

if [[ -z "$CONSTRUCTOR_REMOTE_RENDER_DIR" ]]; then
  echo Please set \"CONSTRUCTOR_REMOTE_RENDER_DIR\" environment variable before running the script!
  exit
fi

cd ../

FILE=src/main/java/ru/pechat55/constructor/render/Version.java
DATE=\"`date '+%d.%m.%Y %H:%M'`\"
PREFIX="version = "
STRING="$PREFIX.*$"
SUBSTITUTE="$PREFIX$DATE;"
if ! grep -q "$SUBSTITUTE" "$FILE"; then
  sed -i '' "1,/$(echo "$STRING")/ s/$(echo "$STRING")/$(echo "$SUBSTITUTE")/" $FILE
fi

rm test/render
mvn clean compile assembly:single
if [[ "$?" -ne 0 ]] ; then
  exit
fi

cat scripts/stub.sh ./build/render.jar > ./build/render
#rm build/render.jar
chmod +x build/render
cp build/render test/render
mvn clean

#./test/render -v
./build/render -v

USER=${CONSTRUCTOR_REMOTE_USER}
PASS=${CONSTRUCTOR_REMOTE_PASSWORD}
HOST=${CONSTRUCTOR_REMOTE_IP}
DIR=${CONSTRUCTOR_REMOTE_RENDER_DIR}
DEST="${CONSTRUCTOR_REMOTE_USER}@${CONSTRUCTOR_REMOTE_IP}:${CONSTRUCTOR_REMOTE_RENDER_DIR}"
echo "uploading render app to remote host ${CONSTRUCTOR_REMOTE_IP}:${CONSTRUCTOR_REMOTE_RENDER_DIR}"
rsync --update --progress build/render $DEST

echo "restarting remote render service"
ssh -l ${USER} ${HOST} "service render restart"

echo "remote render service version is:"
ssh -l ${USER} ${HOST} "${DIR}render -v"