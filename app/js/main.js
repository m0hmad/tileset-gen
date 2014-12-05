var React = require('react');
var _ = require('lodash');
var TopBar = require('./components/top-bar.js');
var TilesetBasesContainer = require('./components/tileset-bases-container.js');
var MainCanvas = require('./components/main-canvas.js');
var EditBar = require('./components/edit-bar.js');

var TilesetGen = React.createClass({
  currentID: 0,
  getInitialState: function() {

    return {
      tilesets: [],
      selectedTileSet: null,
      tileSize: 32
    };

  },
  handleTilesetUpload: function(file){

    var tilesets = this.state.tilesets;

     if (file) {

      reader = new FileReader();
      reader.readAsDataURL(file);

       reader.onload = function(event) {

        var dataUri = event.target.result;
        var img = document.createElement('img');
        img.src = dataUri;

        tilesets.unshift({
          uri: dataUri,
          img: img,
          id: this.currentID++,
          type: 0
        });

        this.setState({tilesets: tilesets});

      }.bind(this);

    }

  },
  onClose: function(id){

    var newTilesets = _.remove(this.state.tilesets, function(tileset) { return tileset.id != id; });

    this.setState({tilesets: newTilesets});

    if(this.state.selectedTileSet == id){
      this.setState({selectedTileSet: null});
    }

  },
  handleUpdateTileset: function(id, type){

    var tilesets = this.state.tilesets;

    var index = _.findIndex(this.state.tilesets, function(tileset) {

      return tileset.id == id;
    });

    tilesets[index].type = +type;
    this.setState({tilesets: tilesets});

  },
  handleSelectTileset: function(id){

    if(this.state.selectedTileSet == id){
      this.setState({selectedTileSet: null});

      return false;
    }

    this.setState({selectedTileSet: id});

  },
  setTilesetSize: function(tileSize){

    this.setState({tileSize: tileSize});

  },
  render: function() {

    return (
      <div>
        <TopBar/>
        <TilesetBasesContainer selected={this.state.selectedTileSet} selectTileset={this.handleSelectTileset} tilesets={this.state.tilesets} onClose={this.onClose} handleTilesetUpload={this.handleTilesetUpload} />
        <EditBar setTilesetSize={this.setTilesetSize} tilesets={this.state.tilesets} updateTileset={this.handleUpdateTileset} selected={this.state.selectedTileSet} />
        <MainCanvas tileSize={this.state.tileSize} tilesets={this.state.tilesets} />
      </div>
    );
  }
});

React.render(
  <TilesetGen />,
  document.getElementById('container')
);
