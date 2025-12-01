## Install for Debian 13, Raspbarry PI
    sudo apt install nodejs npm

## Prepare repository to run
Execute following command in repository folder after clone once only:
    npm install
    
## Use following command in repository folder to run in console
    npm run dev

## Autorun
In the repository folder
    sudo cp ./homeautweb.service /etc/systemd/system/
    sudo systemctl enable homeautweb
    sudo systemctl start homeautweb
Look service status:
    systemctl status homeautweb

## Look page
http://myhost:4000
