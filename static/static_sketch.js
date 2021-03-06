let img;

let all_tiles = [];
let all_tiles_rgb = [];
var face_pos;
var face_border = 60;
var w = 1024;
var h = 756;

function preload() {

  for (var i = 1; i < 31; i++) {
    var image = loadImage('assets/talavera/indexed_images/tile_' + i + ".jpg");
    all_tiles.push(image);
  }
  img = loadImage('assets/images/frida-2.jpg');

}

function compareColor(imgColor, tileColor) {
  for (let i = 0; i < 2; i++) {
    var r_delta = abs(imgColor[0] - tileColor[0]);
    var g_delta = abs(imgColor[1] - tileColor[1]);
    var b_delta = abs(imgColor[2] - tileColor[2]);
  }
  var average_delta = (r_delta + g_delta + b_delta)/3;
  return average_delta;
}

function mostSimilarTileIndex(delta_list) {
  var min = delta_list[0];
  var min_index = 0;
  // from a list of deltas, find the one closest to zero
  for (var i = 1; i < delta_list.length; i++) {
    if (delta_list[i] < min) {
      min = delta_list[i];
      min_index = i;
    }
  }
  return min_index
}

function getAverageRGB(c, x, y, stepSize) {
  var r = 0;
  var g = 0;
  var b = 0;
  var num = 0;
  var color = [];
  /* Iterate through a bounding box in which the circle lies */
  for (var i = 4*x; i < 4*(x + stepSize); i+=4) {
    for (var j = 4*y; j < 4*(y + stepSize); j+=4) {
      const t = (i + width * j);
      // const t = 4 * (i * width + j);
      /* If the pixel is outside the canvas, skip it */
      if (i < 0 || i >= 4*width || j < 0 || j >= 4*height)
        continue;

      /* Get the color from the image, add to a running sum */
      // const c = get();
      // c.loadPixels();
      r += c.pixels[t];
      g += c.pixels[t+1];
      b += c.pixels[t+2];
      num++;
    }
    /* Return the mean of the R, G, and B components */
    color.push(r/num);
    color.push(g/num);
    color.push(b/num);
    return color;
  }
}


function setup() {
  img.resize(300, 0);
  createCanvas(img.width+200, img.height+200);
  // capture = createCapture(VIDEO);
  // capture.size(680, 480);
  // capture.hide();
  // imageMode(CENTER);


  // hard code rgb values
  all_tiles_rgb[0] = [69, 79, 95];
  all_tiles_rgb[1] = [84, 84, 86];
  all_tiles_rgb[2] = [110, 107, 121];
  all_tiles_rgb[3] = [69, 70, 113];
  all_tiles_rgb[4] = [101, 101, 117];
  all_tiles_rgb[5] = [101, 105, 118];
  all_tiles_rgb[6] = [89, 88, 109];
  all_tiles_rgb[7] = [97, 96, 118];
  all_tiles_rgb[8] = [112, 104, 113];
  all_tiles_rgb[9] = [105, 92, 80];
  all_tiles_rgb[10] = [111, 103, 102];
  all_tiles_rgb[11] = [146, 155, 129];
  all_tiles_rgb[12] = [173, 174, 123];
  all_tiles_rgb[13] = [144, 150, 95];
  all_tiles_rgb[14] = [127, 127, 102];
  all_tiles_rgb[15] = [134, 127, 68];
  all_tiles_rgb[16] = [109, 106, 122];
  all_tiles_rgb[17] = [133, 92, 46];
  all_tiles_rgb[18] = [142, 107, 82];
  all_tiles_rgb[19] = [147, 123, 111];
  all_tiles_rgb[20] = [132, 119, 96];
  all_tiles_rgb[21] = [91, 77, 96];
  all_tiles_rgb[22] = [128, 110, 103];
  all_tiles_rgb[23] = [113, 86, 82];
  all_tiles_rgb[24] = [119, 80, 75];
  all_tiles_rgb[25] = [94, 101, 99];
  all_tiles_rgb[26] = [208, 201, 161];
  all_tiles_rgb[27] = [203, 202, 179];
  all_tiles_rgb[28] = [221, 204, 156];
  all_tiles_rgb[29] = [165, 130, 74];
  all_tiles_rgb[30] = [173, 153, 91];

  frameRate(30);
}


function draw() {
  background(0);
  // image(capture, 0, 0, 680, 480);
  // img.resize(512, 0);
  image(img, 100, 100, img.width, img.height);
  const stepSize = 10;
  const c = get();
  c.loadPixels();


  let delta_list = [];
  for (var x = 150; x < img.width+50; x += stepSize) {
    for (var y = 100; y < img.height+50; y += stepSize) {
      var pixel_color = getAverageRGB(c, x, y, stepSize);
      for (let i = 0; i < 30; i++) {
        delta_list.push(compareColor(pixel_color, all_tiles_rgb[i]));
      }
      // console.log(delta_list);
      var tile_index = mostSimilarTileIndex(delta_list);
      image(all_tiles[tile_index], x, y, stepSize, stepSize); 
      delta_list = [];
      fill(0, 0, 0); 
      strokeWeight(1);
      line(150, y, img.width+50, y);
      line(x, 100, x, img.height+50);
    }
  }

  

}
