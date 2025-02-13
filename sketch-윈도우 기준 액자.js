let currentImage;
let nextImage;
let imageFiles = [];
let currentIndex = 0;
let displayDuration = 12000; // 각 이미지를 표시하는 시간 (밀리초)
let transitionDuration = 5000; // 전환 효과의 지속 시간 (밀리초)
let lastChangeTime = 0;
let margin = 20; // 마진
let frameColor = 180; // 액자 프레임 색상

function preload() {
  // JSON 파일에서 이미지 파일 목록을 가져옴
  loadJSON('assets/index.json', (response) => {
    imageFiles = response.files;
    loadNextImage();
  });
}

function loadNextImage() {
  if (imageFiles.length > 0) {
    nextImage = loadImage(`assets/image-squareArt/${imageFiles[currentIndex]}`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lastChangeTime = millis();
  
  // 윈도우 기준으로 프레임 그리기
  drawFrame();
}

function draw() {
  // background(50); // 캔버스 배경색을 검정으로 설정
  
  let elapsedTime = millis() - lastChangeTime;
  let transitionProgress = elapsedTime / transitionDuration;

  if (currentImage && elapsedTime < transitionDuration / 2) {
    // 현재 이미지를 페이드 아웃
    tint(255, 255 * (1 - transitionProgress * 2));
    displayImage(currentImage);
  }

  if (nextImage && elapsedTime >= transitionDuration / 2) {
    // 다음 이미지를 페이드 인
    tint(255, 255 * ((transitionProgress - 0.5) * 2));
    displayImage(nextImage);
  }

  if (elapsedTime > displayDuration) {
    currentImage = nextImage;
    currentIndex = (currentIndex + 1) % imageFiles.length;
    loadNextImage();
    lastChangeTime = millis();
  }
}

function displayImage(img) {
  imageMode(CENTER);
  
  // 종횡비 계산
  let aspectRatio = img.width / img.height;
  let imgWidth, imgHeight;
  
  // 종횡비를 유지하면서 정방형으로 이미지 크기 조정
  let canvasSize = min(windowWidth, windowHeight) - margin * 2;
  if (canvasSize / canvasSize > aspectRatio) {
    imgHeight = canvasSize;
    imgWidth = imgHeight * aspectRatio;
  } else {
    imgWidth = canvasSize;
    imgHeight = imgWidth / aspectRatio;
  }
  
  // 이미지 그리기
  image(img, windowWidth / 2, windowHeight / 2, imgWidth, imgHeight);
}

function drawFrame() {
  noFill();
  stroke(frameColor);  // 액자 프레임 색상
  strokeWeight(margin);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 2, windowWidth - margin, windowHeight - margin);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // 윈도우 크기가 변경될 때 프레임 다시 그리기
  drawFrame();
}

function touchStarted() {
  if (isMobileDevice()) {
    let fs = fullscreen();
    fullscreen(!fs);
    return false;
  }
  return false;
}

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
