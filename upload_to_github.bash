#!/usr/bin/bash
# 引数$1はmain.rbから渡されます

git add docs/geojson/$1.geojson
git commit -m "add $1"
git push origin master && firefox -new-tab "https://yuukitoriyama.github.io/ryokucha/index.html?q=$1" &

echo "https://yuukitoriyama.github.io/ryokucha/index.html?q=$1"
