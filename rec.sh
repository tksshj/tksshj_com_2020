#!/bin/sh

ffmpeg -f avfoundation -ss 2 -i "2" -pix_fmt yuv420p -r 30 -t 5 -vf crop=w=640:h=640:x=500:y=640 out.mov
mv out.mov "${HOME}/GoogleDrive/movies/`date \"+%Y%m%d\"`.mov"
