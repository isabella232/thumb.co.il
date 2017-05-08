import React, { Component } from 'react';
import thumbcoil from 'thumbcoil';
import {Tabs, Tab} from 'material-ui/Tabs';
import MediaStats from './MediaStats';
import GopView from '../GopView';

import './MediaContainer.css';

class MediaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parsed: this.parse(this.props.name, this.props.bytes)
    };
  }

  parse(name, bytes) {
    if (!bytes) {
      return null;
    }

    if (!(/\.ts/i.test(name))) {
      // only parse ts segments for now
      return null;
    }

    return thumbcoil.tsInspector.inspect(bytes);
  }

  render() {
    if (!this.state.parsed) {
      return null;
    }

    return (
      <div className="MediaContainer">
        <Tabs
          inkBarStyle={{backgroundColor: '#b43665'}}
          tabItemContainerStyle={{backgroundColor: '#eee', height: '50px'}}
          contentContainerClassName="MediaContainer-content"
        >
          <Tab label="Overview" buttonStyle={{color:'#515151'}}>
            <MediaStats packets={this.state.parsed.esMap} />
          </Tab>
          <Tab label="Gop Structure" buttonStyle={{color:'#515151'}}>
            <GopView name={this.props.name} packets={this.state.parsed.esMap} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default MediaContainer;