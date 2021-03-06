import React from 'react';
import MenuItem from './menu-item.js';
import canvasToBlob from '../vendor/canvasToBlob.js';
import saveAs from '../vendor/FileSaver.js';

function clearFileInput(fileInput) {
  try {
    fileInput.value = null;
  } catch(ex) { }
  if (fileInput.value) {
    fileInput.parentNode.replaceChild(fileInput.cloneNode(true), fileInput);
  }
}

export default class ConfigBar extends React.Component{

  constructor(props) {

    super(props);

    this.uploadRef = React.createRef();
    this.importRef = React.createRef();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleImportOnChange = this.handleImportOnChange.bind(this);


    this.state = {
      data: [
        {
          url: '#',
          name: 'Select All',
          onClick:  function(event){

            event.preventDefault();

            this.props.selectAll();

          }.bind(this)
        },
        {
          url: '#',
          name: 'Deselect All',
          onClick:  function(event){

            event.preventDefault();

            this.props.deselectAll();

          }.bind(this)
        },
        {
          url: '#',
          name: 'Add Tileset',
          onClick:  function(event){

            event.preventDefault();

            this.uploadRef.current.click();

          }.bind(this)
        },
        {
          url: '#',
          name: 'Download',
          onClick:  function(event){

            event.preventDefault();

            this.props.canvasRef.current.canvas.toBlob(function(blob) {
              saveAs(blob, "tileset.png");
            });

          }.bind(this)
        },
        {
          url: '#',
          name: 'Export',
          onClick:  function(event){

          let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.props.state));

          event.target.setAttribute("href",          dataStr);
          event.target.setAttribute("download", "tile-sheet.json");

          }.bind(this)

        },
        {
          url: '#',
          name: 'Import',
          onClick:  function(event){

            event.preventDefault();

            this.importRef.current.click();

          }.bind(this)
        },
      ]
    };

  }

  handleOnChange(event){

    for (let i = 0; i < event.target.files.length; i++) {
      this.props.onTilesetUpload(event.target.files[i]);
    }

    clearFileInput(event.target);

  }

  handleImportOnChange(event){

    this.props.importState(event.target.files[0]);

    clearFileInput(event.target);

  }

  render() {

    let menuItens = this.state.data.map(function(item, index) {
      return (
        <MenuItem handleOnClick={item.onClick} url={item.url} key={index}>
          {item.name}
        </MenuItem>
      );

    });

    return (
      <nav className="config-bar clearfix">
        <ul className="menu">
          {menuItens}
          <input ref={this.uploadRef} type="file" accept="image/*" className="file-input" onChange={this.handleOnChange} required multiple />
          <input ref={this.importRef} type="file" accept="application/json" className="file-input" onChange={this.handleImportOnChange} required />
        </ul>
      </nav>
    );
  }

}