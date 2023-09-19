#!/bin/sh


REMOTE="webserver"

echo "remote addr:                  "${REMOTE}

REMOTE_PATH="/sakura/mainsite/main/"
echo "remote path:                  "${REMOTE_PATH}

echo "zip dist"
zip -rq dist.zip ./dist

echo "upload dist.zip"
scp dist.zip $REMOTE:$REMOTE_PATH

echo "remove dist.zip"
rm -f dist.zip

echo "unzip remote dist.zip"
ssh ${REMOTE} 'cd '${REMOTE_PATH}'; rm -r -f dist_back; mv dist dist_back; unzip -oq dist.zip; rm -f dist.zip'
echo "upload done"
