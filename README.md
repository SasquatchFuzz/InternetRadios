Internet Radios
==============
##### Table of Contents
[About](#about)  
[Pre-reqs](#prereqs)  
[Setup and Install](#setup)  
[To-do](#todo)  

<a name="about"/>
## About:
This project is a collection of linux based internet radio's I'm spreading throughout various rooms in our house (kitchen, living room, and basement), that are completely controllable via a web interface.  For the most part each project will be similar, but with with a different UX built using node.js.  The Zenith Radio is the initial project and it supports streaming with Shairport and two internet radio stations (KEXP and NPR).

<a name="prereqs"/>
## Pre-reqs:
* [Avahi](https://wiki.archlinux.org/index.php/avahi#Hostname_resolution) - For Hostname resolution.
* [Shairport](https://github.com/abrasive/shairport) - See project repo for more details.
* [MPD](http://www.musicpd.org/) and [MPC](http://www.musicpd.org/clients/mpc/) - Music player daemon and client. 
* [node.js](http://nodejs.org/) - If you're running an ARM based processor and using Debian-based distro (yes, you Pi user), install the latest by running the following:   
```shell
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
node -v
```

<a name="setup"/>
## Setup:

### Hostname
Each project is setup with a unique hostname for the radio (look for the io.connect call in index.html).  For instance, my Zenith radio is set for the hostname of 'zenithradio'.

#### "Station" Scripts
The server is set up to call shell scripts with individual playlists for each "station".  Creating these playlists is as simple as:
```shell
sudo mpc clear
sudo mpc add http://live-mp3-128.kexp.org:8000/
sudo mpc save kexp
```
and
```shell
sudo mpc clear
sudo mpc add http://shoutcast.kuow.org:8002/
sudo mpc save npr
```
 
#### Node packages
CD into the desired radio subfolder and then run the Node Package Manager to install the required packages (defined in package.json).  For example:
```shell
cd zenith
npm config set registry http://registry.npmjs.org/
npm install -d
```

#### Run
```shell
node app.js
```
Now open up a browser to the appropriate site (for example http://zenithradio.local:8080).  On iOS I save the pages to the homescreen for quick access.

<a name="todo"/>
## To-do:
* Design a better looking vol indicator.
* Implement the other radios.

