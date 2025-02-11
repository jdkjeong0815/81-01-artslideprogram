let currentImage;
let imageFiles = [];
let currentIndex = 0;
let displayDuration = 5000; // Duration to display each image in milliseconds
let lastChangeTime = 0;

function preload() {
  // Fetch the list of image files from the JSON file
  loadJSON('assets/index.json', (response) => {
    imageFiles = response.files;
    loadNextImage();
  });
}

function loadNextImage() {
  if (imageFiles.length > 0) {
    currentImage = loadImage(`assets/image-squareArt/${imageFiles[currentIndex]}`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lastChangeTime = millis();
}

function draw() {
  background(0);
  
  if (currentImage) {
    imageMode(CENTER);
    
    // Calculate the aspect ratio
    let aspectRatio = currentImage.width / currentImage.height;
    let imgWidth, imgHeight;
    
    // Adjust the image size to fit within the window while maintaining aspect ratio
    if (windowWidth / windowHeight > aspectRatio) {
      imgHeight = windowHeight;
      imgWidth = imgHeight * aspectRatio;
    } else {
      imgWidth = windowWidth;
      imgHeight = imgWidth / aspectRatio;
    }
    
    image(currentImage, width / 2, height / 2, imgWidth, imgHeight);
  }

  if (millis() - lastChangeTime > displayDuration) {
    currentIndex = (currentIndex + 1) % imageFiles.length;
    loadNextImage();
    lastChangeTime = millis();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function touchStarted() {
  if (isMobileDevice()) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
  return false;
}

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
