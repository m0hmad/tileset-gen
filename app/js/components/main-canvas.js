var React = require('react');
var Blob = require('../vendor/Blob.js');
var canvasToBlob = require('../vendor/canvasToBlob.js');
var saveAs = require('../vendor/FileSaver.js');

var tilesetTemplate = [];

//47 tiles template
tilesetTemplate[0] = {
  map: [9, 10, 11, 10, 11, 12, 9, 12, 9, 10, 11, 10, 11, 12, 14, 18, 19, 18, 19, 18, 13, 14, 15, 14, 15, 16, 13, 16, 13, 8, 7, 8, 7, 16, 15, 8, 7, 8, 7, 19, 17, 18, 19, 18, 19, 20, 17, 20, 17, 4, 3, 4, 3, 20, 14, 4, 0, 0, 3, 18, 13, 14, 15, 14, 15, 16, 13, 16, 13, 8, 7, 8, 7, 16, 15, 8, 0, 0, 7, 19, 17, 18, 19, 18, 19, 20, 17, 20, 17, 4, 3, 4, 3, 20, 14, 4, 3, 4, 3, 18, 21, 22, 23, 22, 23, 24, 21, 24, 21, 22, 23, 22, 23, 24, 15, 19, 15, 19, 15, 19, 9, 10, 11, 10, 11, 12, 9, 12, 11, 10, 14, 20, 17, 18, 11, 10, 14, 4, 3, 18, 21, 22, 23, 22, 23, 24, 21, 24, 15, 8, 7, 16, 13, 8, 7, 19, 7, 8, 7, 8, 0, 0, 0, 0, 14, 4, 3, 18, 17, 4, 3, 18, 14, 4, 3, 20, 3, 4, 3, 4, 0, 0, 0, 0, 7, 19, 15, 8, 13, 19, 23, 22, 23, 22, 15, 16, 15, 8, 7, 19],
  width: 10,
  height: 5
};

tilesetTemplate[1] = {
  map: [9, 10, 11, 10, 11, 12, 9, 12, 13, 14, 15, 14, 15, 16, 13, 16, 17, 18, 19, 18, 19, 20, 17, 20, 13, 14, 15, 14, 15, 16, 13, 16, 17, 18, 19, 18, 19, 20, 17, 20, 21, 22, 23, 22, 23, 24, 21, 24, 9, 10, 11, 10, 11, 12, 9, 12, 21, 22, 23, 22, 23, 24, 21, 24],
  width: 4,
  height: 4
};

tilesetTemplate[2] = {
  map: [9, 12, 17, 20, 9, 10, 17, 4, 9, 12, 17, 20, 9, 10, 17, 4, 11, 12, 14, 20, 21, 24, 21, 24, 21, 22, 21, 22, 13, 16, 13, 16, 13, 8, 13, 8, 23, 24, 23, 24, 11, 10, 3, 4, 11, 12, 3, 20, 11, 10, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 23, 22, 23, 22, 15, 16, 7, 16, 7, 8, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0],
  width: 10,
  height: 2
};

//tilesetTemplate[3] = {
//  map: [1, 4, 20, 21, 1, 7, 13, 14, 1, 4, 20, 21, 1, 2, 20, 9, 3, 4, 15, 16, 19, 19, 19, 22, 19, 13, 19, 20, 7, 10, 2, 3, 7, 8, 2, 15, 21, 22, 21, 22, 10, 7, 8, 9, 3, 4, 8, 21, 3, 2, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 16, 13, 21, 20, 9, 10, 14, 3, 14, 15, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0],
//  width: 10,
//  height: 2
//};
//
//tilesetTemplate[4] = {
//  map: [8, 9, 1, 9, 8, 9, 7, 9, 8, 9, 1, 9, 8, 9, 13, 9, 8, 4, 2, 3, 14, 15, 8, 9, 19, 15, 13, 15, 22, 15, 14, 22, 20, 21, 19, 20, 14, 15, 14, 15, 8, 4, 1, 2, 8, 10, 3, 4, 8, 16, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 19, 15, 7, 15, 14, 16, 14, 10, 19, 22, 19, 22, 0, 0, 0, 0, 0, 0, 0, 0],
//  width: 10,
//  height: 2
//};

var MainCanvas = React.createClass({
  ctx: null,
  download: function(){

    this.canvas.toBlob(function(blob) {
      saveAs(blob, "tileset.png");
    });

  },
  drawTile: function(sprite, x, y, type){
    var spriteY = type / 4 >> 0;
    var spriteX = (type - spriteY * 4);

    this.ctx.drawImage(
      sprite,
      spriteX * (this.props.tileSize / 2),
      spriteY * (this.props.tileSize / 2),
      (this.props.tileSize / 2),
      (this.props.tileSize / 2),
      (x * (this.props.tileSize / 2)),
      (y * (this.props.tileSize / 2)),
      (this.props.tileSize / 2),
      (this.props.tileSize / 2)
    );

  },
  componentDidMount: function() {

    this.canvas = this.refs.tilesets.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

  },
  setCanvasSize: function(){
    var width = 0;
    var height = 0;

    for (var i = 0; i < this.props.tilesets.length; i++) {
      width = Math.max(width, tilesetTemplate[this.props.tilesets[i].type].width * this.props.tileSize);
      height += (tilesetTemplate[this.props.tilesets[i].type].height * this.props.tileSize);
    }

    this.canvas.width = width;
    this.canvas.height = height;


  },
  generateTileset: function(){
    var height = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var h = 0, w = 0, i = 0;

    this.setCanvasSize();

    for (i = 0; i < this.props.tilesets.length; i++) {

      for (h = 0; h < tilesetTemplate[this.props.tilesets[i].type].height * 2; h++) {

        for (w = 0; w < tilesetTemplate[this.props.tilesets[i].type].width * 2; w++) {

          this.drawTile(this.props.tilesets[i].img, w, height + (0 * (tilesetTemplate[this.props.tilesets[i].type].height * 2)), tilesetTemplate[this.props.tilesets[i].type].map[(tilesetTemplate[this.props.tilesets[i].type].width * 2) * h + w] - 1);

        }

        height +=1;
      }

    };

  },
  render: function() {

    if(this.ctx && this.props.tilesets.length > 0)
      this.generateTileset();
    else if(this.ctx && this.props.tilesets.length == 0)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    return (
      <div className="tilesets-container">
        <canvas className="tilesets-canvas" ref="tilesets"></canvas>
        <button onClick={this.download} className="download">Download</button>
      </div>
    );
  }
});

module.exports = MainCanvas;