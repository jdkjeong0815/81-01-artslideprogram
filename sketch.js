let currentImage;
let nextImage;
let imageFiles = [];
let currentIndex = 0;
let displayDuration = 8000; // 각 이미지를 표시하는 시간 (밀리초)
let transitionDuration = 3000; // 전환 효과의 지속 시간 (밀리초)
let lastChangeTime = 0;
let margin = 80;
let canvas;

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
  let minCanvas = min(windowWidth, windowHeight);
  canvas = createCanvas(minCanvas, minCanvas);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  lastChangeTime = millis();
}

function draw() {
  background(0); // 캔버스 배경색을 검정으로 설정
  
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
  
  // 종횡비를 유지하면서 창에 맞게 이미지 크기 조정
  if (windowWidth / windowHeight > aspectRatio) {
    imgHeight = windowHeight - margin;
    imgWidth = imgHeight * aspectRatio;
  } else {
    imgWidth = windowWidth - margin;
    imgHeight = imgWidth / aspectRatio;
  }
  
  // 회색으로 마진 영역 그리기 - 액자 프레임 영역
  noFill();
  stroke(230);  // 액자 프레임 색상
  strokeWeight(margin);
  rectMode(CENTER);
  rect(width / 2, height / 2, imgWidth + margin, imgHeight + margin);
  
  // 이미지 그리기
  image(img, width / 2, height / 2, imgWidth, imgHeight);
}

function windowResized() {
  let minCanvas = min(windowWidth, windowHeight);
  resizeCanvas(minCanvas, minCanvas);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function touchStarted() {
  if (isMobileDevice()) {
    let fs = fullscreen();
    fullscreen(!fs);
    console.log('isMobileDevice', isMobileDevice());
    return false;
  }
  console.log('isMobileDevice', isMobileDevice());
  return false;
}

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
