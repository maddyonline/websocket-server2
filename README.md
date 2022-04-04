# Setup

Install Node Version Manager: https://github.com/nvm-sh/nvm and setup a latest enough version of node.

```
nvm install lts/fermium
nvm use lts/fermium
```

Install packages and run the server.

```
npm install
node .
```


# How to start systemd service
```
sudo cp heart-rate.service /lib/systemd/system/heart-rate.service
sudo systemctl daemon-reload
sudo systemctl enable heart-rate
sudo systemctl start heart-rate

# check logs
journalctl -fu heart-rate
```
