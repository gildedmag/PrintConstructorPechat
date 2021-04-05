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

echo "compiling typescript..."
time tsc
echo "compressing js..."
time uglifyjs js/three.js js/heic2any.js js/OrbitControls.js js/fabric.js js/fontfaceobserver.js js/constructor.js -c -m -o build/constructor.min.js
#time uglifyjs js/three.js js/OrbitControls.js js/fabric.js js/constructor.js -o build/constructor.min.js
cp -R "build/constructor.min.js" "examples/constructor.min.js"
echo `du -sh "build/constructor.min.js"`
echo "uploading to $CONSTRUCTOR_REMOTE_HOST$CONSTRUCTOR_REMOTE_DIR"

USER=${CONSTRUCTOR_REMOTE_USER}
HOST=${CONSTRUCTOR_REMOTE_HOST}
DIR=${CONSTRUCTOR_REMOTE_DIR}
DEST="${USER}@${HOST}:${DIR}"
rsync --update --progress build/constructor.min.js $DEST
rsync --update --progress examples/style.css $DEST/css
echo DONE!
