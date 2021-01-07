import React, { Component } from "react";
import lodash from "lodash";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: lodash.random(1, 9),
    };
  }

  updateWinner = (winner) => {
    return winner.map((data) => {
      const playerData =this.props.playerData && this.props.playerData.find((val) => {
        if (val.id === data.id) {
          return {
            ...val,
            win: val.win + 1,
            Price: val.Price + val.Bet,
          };
        } else {
          return val;
        }
      });
      this.props.setPlayerData(playerData);
      return {
        ...data,
        win: data.win + 1,
        Price: data.Price + data.Bet,
      };
    });
  };

  updateLoser = (loser) => {
    return loser.map((data) => {
      const playerData = this.props.playerData.find((val) => {
        if (val.id === data.id) {
          return {
            ...val,
            lost: val.lost + 1,
            Price: val.Price - val.Bet,
          };
        } else {
          return val;
        }
      });
      this.props.setPlayerData(playerData);
      return {
        ...data,
        lost: data.lost + 1,
        Price: data.Price - data.Bet,
      };
    });
  };

  updateProfile = () => {
    const losers = this.props.selectedPlayer.filter(
      (data) => data.Bet !== this.state.result
    );
    const winner = this.props.selectedPlayer.filter(
      (data) => data.Bet === this.state.result
    );
    console.log("loser",losers)
    console.log("winner",winner)

    const finalResult = [...this.updateWinner(winner), ...this.updateLoser(losers)];
    this.props.setSelectedPlayer(finalResult,console.log(this.props.playerData))
  };

  componentDidMount(){
    this.updateProfile()
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-around">
          {this.props.selectedPlayer &&
            this.props.selectedPlayer.map((data, index) => (
              <>
                {3 > index && (
                  <div className="card w-100">
                    <img
                      style={{ width: "30px" }}
                      src={data["Profile Image"]}
                      className="card-img-left"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{data.Name}</h5>
                      <h6>{data.Bet}</h6>
                      <p>{data.win}<br/>{data.lost}</p>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
        <div className="my-auto" style={{ height: "5rem" }}>
          {this.state.result}
        </div>
        <div className="d-flex justify-content-around">
          {this.props.selectedPlayer &&
            this.props.selectedPlayer.map((data, index) => (
              <>
                {3 < index && (
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
                    <div className="card-body">
                      <h5 className="card-title">{data.Name}</h5>
                      <h6>{data.Bet}</h6>
                      <p>{data.win}<br/>{data.lost}</p>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
    );
  }
}
