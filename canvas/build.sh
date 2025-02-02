#!/bin/bash

if [ -e output ]; then
    rm -rf output
fi

if [ "$(uname)" == "Darwin" ]; then
    SED_REGEX_EXTEND=E
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    SED_REGEX_EXTEND=r
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    SED_REGEX_EXTEND=r
fi

# OPTIMIZE="-o --md5 1 --domains"
OPTIMIZE=""
if [ "$1" == "debug" ]; then
    # OPTIMIZE="--md5 1"
    OPTIMIZE=""
fi

fis release -d output -c $OPTIMIZE

if [ "$1" == "debug" ]; then
    exit 0 
fi

cp -r output/template output/static ../release/canvas

rm -rf output
