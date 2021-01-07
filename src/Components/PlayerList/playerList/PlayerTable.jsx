import React, { Component } from "react";

export default class PlayerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerMark: {},
    };
  }

  componentDidMount(){
      console.log(this.props.playerData)
  }

  toggleCheckMark = (id) => {
    const val =
      this.state.isPlayerMark[id] !== undefined
        ? this.state.isPlayerMark[id]
        : false;
    const newCheckList = {
      ...this.state.isPlayerMark,
      [id]: !val,
    };
    this.setState({ isPlayerMark: newCheckList });
  };

  handleCheckEvent = (id) => {
    let newSelectedPlayerList = [...this.props.selectedPlayer];
    if (this.props.selectedPlayer.find((data) => data.id === id)) {
      newSelectedPlayerList = this.props.selectedPlayer.filter(
        (data) => id !== data.id
      );
    } else {
      const data = this.props.playerData.find((data) => data.id === id);
      newSelectedPlayerList = [...this.props.selectedPlayer, data];
    }
    this.toggleCheckMark(id);
    this.props.setSelectedPlayer(newSelectedPlayerList);
  };

  render() {
    return (
      <div>
        <div className="tableHeading text-primary">select 9 player</div>
        <div className="tableList">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">Player Name</th>
                <th scope="col">Level</th>
                <th scope="col">Avatar</th>
                <th scope="col">Bet</th>
                <th scope="col">Win</th>
                <th scope="col">Lost</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {this.props.playerData && this.props.playerData.map((data) => (
                <tr id={data.id}>
                  <th scope="row">
                    <div className="d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={this.state.isPlayerMark[data.id]}
                        onClick={() => this.handleCheckEvent(data.id)}
                      />
                    </div>
                  </th>
                  <td>{data.Name}</td>
                  <td>{data.level}</td>
                  <td>
                    <img
                      style={{ width: "30px" }}
                      src={data["Profile Image"]}
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                  </td>
                  <td>{data.Bet}</td>
                  <td>{data.win}</td>
                  <td>{data.lost}</td>
                  <td>{data.Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
