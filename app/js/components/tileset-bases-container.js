import React from 'react';
import _ from 'lodash';
import TilesetBase from './tileset-base.js';
import TilesetUpload from './tileset-upload.js';

class TilesetBaseContainer extends React.Component {

  render() {

    let tilesetItens = [];

    for (let key in this.props.tilesets) {
      if (this.props.tilesets.hasOwnProperty(key)) {
        let tileset = this.props.tilesets[key];

        let selected = false;

        if(_.indexOf(this.props.selected, tileset.id) > -1){
          selected = true;
        }

        tilesetItens.push(<TilesetBase selected={selected} select={this.props.selectTileset} close={this.props.onClose} dataUri={tileset.uri} id={tileset.id} key={tileset.id} />);

      }
    }

    return (
      <div className="tileset-bases">
        {tilesetItens}
      </div>
    );

  }

}

module.exports = TilesetBaseContainer;
