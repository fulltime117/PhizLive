import React, { PureComponent } from "react";
import { Flipped} from "react-flip-toolkit";


class Card extends PureComponent {
  render() {
    const { id, title,  stagger, addToFilteredIds } = this.props;
    const flipId = `item-${id}`;
    return (
      <Flipped
        flipId={flipId}        
        key={flipId}
        stagger={stagger}
      >
        <div className="fm-item">
            <div>
                <div>
                  <h3>{title}</h3>
                  <p>{title}</p>
                </div>
                <button
                  className="fm-remove"
                  onClick={() => addToFilteredIds(id)}
                >
                  &times;
                </button>
            </div>
        </div>
      </Flipped>
    );
  }
}

export default Card;
