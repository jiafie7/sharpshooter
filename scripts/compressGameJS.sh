#! /bin/bash

JS_PATH="/Users/hangzhang/Dev/jiafie7/sharpshooter/game/static/js/"
JS_PATH_DIST="${JS_PATH}dist/"
JS_PATH_SRC="${JS_PATH}src/"

find ${JS_PATH_SRC} -name '*.js' | sort | xargs cat > ${JS_PATH_DIST}game.js

echo yes | python manage.py collectstatic
