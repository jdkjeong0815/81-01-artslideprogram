const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'assets/image-squareArt');
const outputPath = path.join(__dirname, 'assets/index.json');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  const jsonContent = {
    files: files.filter(file => file.endsWith('.jpg'))
  };

  fs.writeFile(outputPath, JSON.stringify(jsonContent, null, 2), (err) => {
    if (err) {
      return console.error('Error writing JSON file: ' + err);
    }
    console.log('JSON file has been saved.');
  });
});
