#!/bin/bash

fis release -c -d output
cp output/src/*.html dist
cp -r output/lib dist
rm -rf output
