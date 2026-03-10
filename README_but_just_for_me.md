Down convert images

ffmpeg -i .\images\input.png -vf "scale=1600:-1" -map_metadata -1 -c:v libwebp -quality 82 .\images\output_1600.webp