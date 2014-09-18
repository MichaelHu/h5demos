#!/bin/bash

fis release -c -d output -o
cp output/src/*.html dist
cp -r output/lib dist
rm -rf output
