set -ex

vitepress build docs
rm -rf ./docs/notes/
mv ./docs/.vitepress/dist/ ./docs/notes/

scp -r ./docs/notes/* root@43.138.67.183:/projects/notes
sudo rm -rf ./docs/notes/
