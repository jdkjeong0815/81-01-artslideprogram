let images = [];
let imageFiles = [];
let currentIndex = 0;
let displayDuration = 2000; // Duration to display each image in milliseconds
let lastChangeTime = 0;

function preload() {
  // Fetch the list of image files from the JSON file
  loadJSON('assets/image-squareArt/index.json', (response) => {
    imageFiles = response.files;
    loadImages();
  });
}

function loadImages() {
  for (let i = 0; i < imageFiles.length; i++) {
    images.push(loadImage(`assets/image-squareArt/${imageFiles[i]}`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lastChangeTime = millis();
}

function draw() {
  background(0);
  
  if (images.length > 0) {
    let img = images[currentIndex];
    imageMode(CENTER);
    
    // Calculate the aspect ratio
    let aspectRatio = img.width / img.height;
    let imgWidth, imgHeight;
    
    // Adjust the image size to fit within the window while maintaining aspect ratio
    if (windowWidth / windowHeight > aspectRatio) {
      imgHeight = windowHeight;
      imgWidth = imgHeight * aspectRatio;
    } else {
      imgWidth = windowWidth;
      imgHeight = imgWidth / aspectRatio;
    }
    
    image(img, width / 2, height / 2, imgWidth, imgHeight);
  }

  if (millis() - lastChangeTime > displayDuration) {
    currentIndex = (currentIndex + 1) % images.length;
    lastChangeTime = millis();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
