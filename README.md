Tested for Linux, should work for Windows

# Install for Debian 13, Raspbarry PI

## Install additional packets on OS
    
    sudo apt install nodejs npm

## Prepare repository to run
Execute following command in repository folder after clone once only:

    npm install

## Configuration
Edit file .env.local and edit IP of your PW server
    
## Use following command in repository folder to run in console(for test only, use next section to autorun)
Developer mode

    npm run dev

## Autorun
In the repository folder

    sudo cp ./homeautweb.service /etc/systemd/system/
    sudo systemctl enable homeautweb
    sudo systemctl start homeautweb

Look service status:

    systemctl status homeautweb

## Look page
http://myhost:4000 or http://myhost:3000 

<p align="center">
  <img src="https://raw.githubusercontent.com/vro256400/homeautweb/main/readme/page.jpg" alt="Page with two devices"/>
</p>
