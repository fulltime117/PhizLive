import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import Card from "./Card";
import data from "./data";
import "./styles.css";
import "sanitize.css";

export class index extends Component{
  state = {
    filteredIds: [],
    stagger: "forward",
    spring: "noWobble"
  };


  componentDidMount(){
    this.props.handleLinkActive('appState');
  }

  addToFilteredIds = id => {
    this.setState(prevState => {
      return {
        filteredIds: prevState.filteredIds.concat(id)
      };
    });
  };

  

  render() {
    return (
      <div className="fm-example">
        <Flipper
          flipKey={`${JSON.stringify(
            this.state.filteredIds
          )}-${JSON.stringify(this.state.stagger)}`}
          spring={this.state.spring}
          staggerConfig={{
            default: {
              reverse: this.state.stagger !== "forward",
              speed: 1
            }
          }}
          decisionData={this.state}
        >          
          <div>
            {!!this.state.filteredIds.length && (
              <button
                className="fm-show-all"
                onClick={() => {
                  this.setState({
                    filteredIds: []
                  });
                }}
              >
                show all cards
              </button>
            )}
          </div>

          <Flipped flipId="list">
            <div className="fm-grid">
              <Flipped inverseFlipId="list">
                <ul className="list-contents">
                  {[...data]
                    .filter(d => !this.state.filteredIds.includes(d.id))                    
                    .map(({ title, id }) => (
                      <Card
                        id={id}
                        title={title} 
                        key={id}
                        addToFilteredIds={this.addToFilteredIds}
                      />
                    ))}
                </ul>
              </Flipped>
            </div>
          </Flipped>
        </Flipper>
      </div>
    );
  }
}

export default index;
