import React, { Component } from "react";

export default class SelectedPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        {this.props.selectedPlayer && this.props.selectedPlayer.map((data) => (
          <div>
            <div className="card w-100">
              <img
                style={{ width: "30px" }}
                src={data["Profile Image"]}
                className="card-img-left"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{data.Name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
