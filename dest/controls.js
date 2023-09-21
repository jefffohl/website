"use strict";
const aboutMeButton = document.getElementById('about-me');
const whatIsThisButton = document.getElementById('what-is-this');
const bioPanel = document.getElementById('bio');
const aboutPanel = document.getElementById('about');
let bioPanelOpen = false;
let aboutPanelOpen = false;
whatIsThisButton?.addEventListener('click', (_e) => {
    if (aboutPanelOpen && aboutPanel) {
        aboutPanel.style.left = '-150px';
        aboutPanelOpen = false;
    }
    else if (!aboutPanelOpen && aboutPanel) {
        if (bioPanelOpen && bioPanel) {
            bioPanel.style.left = '-150px';
            bioPanelOpen = false;
        }
        aboutPanel.style.left = '250px';
        aboutPanelOpen = true;
    }
});
aboutMeButton?.addEventListener('click', (_e) => {
    if (bioPanelOpen && bioPanel) {
        bioPanel.style.left = '-150px';
        bioPanelOpen = false;
    }
    else if (!bioPanelOpen && bioPanel) {
        if (aboutPanelOpen && aboutPanel) {
            aboutPanel.style.left = '-150px';
            aboutPanelOpen = false;
        }
        bioPanel.style.left = '250px';
        bioPanelOpen = true;
    }
});
