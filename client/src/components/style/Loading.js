import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, margin: "auto", width: "15em", height: "15em"}} 
      className="preloader-wrapper active">
        <div className="spinner-layer">
          <div className="circle-clipper left">
            <div style={{borderWidth: "12px"}} className="circle"></div>
          </div><div className="gap-patch">
            <div style={{borderWidth: "12px"}} className="circle"></div>
          </div><div className="circle-clipper right">
            <div style={{borderWidth: "12px"}} className="circle"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
