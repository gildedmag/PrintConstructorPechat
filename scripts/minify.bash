#!/usr/bin/env bash
TIMEFORMAT=%R

cd ../

FILE=src/ts/Version.ts
DATE=\"`date '+%d.%m.%Y %H:%M'`\"
PREFIX="version = "
STRING="$PREFIX.*$"
SUBSTITUTE="$PREFIX$DATE;"
if ! grep -q "$SUBSTITUTE" "$FILE"; then
  sed -i '' "1,/$(echo "$STRING")/ s/$(echo "$STRING")/$(echo "$SUBSTITUTE")/" $FILE
fi

time tsc
time uglifyjs js/three.js js/OrbitControls.js js/fabric.js js/constructor.js -c -m -o build/constructor.min.js
cp -R "build/constructor.min.js" "examples/constructor.min.js"
echo `du -sh "build/constructor.min.js"`

USER=${CONSTRUCTOR_REMOTE_USER}
PASS=${CONSTRUCTOR_REMOTE_PASSWORD}
HOST=${CONSTRUCTOR_REMOTE_IP}
DIR=${CONSTRUCTOR_REMOTE_DIR}
DEST="${USER}@${HOST}:${DIR}"
rsync --update --progress build/constructor.min.js $DEST
