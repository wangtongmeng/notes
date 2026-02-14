set -ex

rm -rf ./docs/.vitepress/notes/
vitepress build docs

scp -r ./docs/.vitepress/notes/* root@43.138.67.183:/www/wwwroot/web/notes
# sudo rm -rf ./docs/notes/
