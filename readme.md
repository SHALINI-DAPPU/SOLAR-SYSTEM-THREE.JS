🎥 [Click here to watch demo video](https://www.dropbox.com/scl/fo/uz9gpyi5tf809oapx8duv/AIAeVT_EHJMHMyiMkNrFsQg?rlkey=3dx2zhpug2f7960oqbqgs5hg1&st=h4brvaya&dl=0)

Solar System 3D Visualization using Three.js

Explore the wonders of our Solar System in an immersive 3D experience.
This project simulates planetary orbits and rotations using WebGL and Three.js, providing a highly interactive and visually engaging experience.


0. Table of Contents:
1.Introduction
2.Project Overview
3.Features
4.Folder Structure
5.How to Run
6.Technologies Used


1. Introduction

The Solar System 3D Visualization project is an interactive web-based application that allows users to explore the Solar System in a 3D environment. It is built using the Three.js library for rendering 3D graphics directly in the browser.
Users can observe the orbit of planets around the Sun, the self-rotation of each planet, lighting effects based on solar illumination, and interact with various user-controlled settings.


2. Project Overview

The project consists of a single HTML page that loads all required scripts and displays the 3D scene. The primary logic is written in a JavaScript module (`solarSystem.js`), which handles:

1.Scene and camera setup
2.Planet geometry and textures
3.Orbit and rotation logic
4.Interactive GUI controls
5.Responsive canvas layout

The project runs entirely on the client side and requires no backend.

3. Features

1.Realistic rendering of the Sun and 8 planets
2.Each planet spins on its own axis and orbits the Sun
3.Speed control sliders for orbit and spin of each planet
4.Toggle to show or hide orbit path rings
5.Lighting toggle to simulate real shadowing in space
6.Pause and resume animation with a button
7.Dark/light theme toggle
8.Tooltips showing planet names on hover
9.Fully responsive for all screen sizes


4. Folder Structure

Shalini/
├── index.html
├── image/
│   ├── sun.jpg
│   ├── mercury.jpg
│   ├── venus.jpg
│   ├── earth.jpg
│   ├── mars.jpg
│   ├── jupiter.jpg
│   ├── saturn.jpg
│   ├── saturn\_ring.png
│   ├── uranus.jpg
│   ├── uranus\_ring.png
│   ├── neptune.jpg
│   └── stars.jpg
├── js/
│   └── solarSystem.js
├── min.js/
│   └── dat.gui.min.js
└── README.md


5. How to Run 

1.Download and extract the ZIP folder.
2.Open the extracted folder.
3.Double-click on the file named index.html to open it in your default browser.
4.The 3D simulation will load automatically in the browser window.
5.Use your mouse to rotate, zoom, and explore the 3D scene.
6.Adjust speed sliders and toggle options using the control panel on the right.

No installation or internet connection is required after downloading. The project runs entirely in the browser


6. Technologies Used

HTML5
CSS
JavaScript (ES6)
Three.js (3D rendering)
dat.GUI (interactive controls)

