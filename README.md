# Run

```
node .
```

# Download heart rate

```
node script.js
````

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

The `heart-rate.service` file is as follows.
```
[Unit]
Description=heart-rate
Documentation=https://github.com/maddyonline/websocket-server2
After=network.target

[Service]
Type=simple
User=ubuntu
ExecStart=/home/ubuntu/.nvm/versions/node/v14.19.0/bin/node index.js
WorkingDirectory=/home/ubuntu/websocket-server2
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
