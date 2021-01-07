import React, { Component } from "react";
import "./style.sass";
import { playerData } from "./api/fetchPlayerList";
import PlayerTable from "./playerList/PlayerTable";
import { v4 as uuidv4 } from "uuid";
import SelectedPlayer from "./playerList/SelectedPlayer";
import PlayerBets from "./PlayerBets";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: [],
      selectedPlayer: [],
      startGame: false,
    };
  }

  loadPlayerData = async () => {
    const resData = await playerData();
    console.log(resData);
    const processData = resData.map((data, index) => {
      return {
        ...data,
        id: index,
        win: 0,
        lost: 0,
        level: 0,
        Bet: parseInt(data.Bet),
      };
    });
    this.setState({ playerData: processData });
  };

  setSelectedPlayer = (selectedPlayer) => this.setState({ selectedPlayer });
  setPlayerData = (playerData) => this.setState({ playerData });

  componentDidMount() {
    this.loadPlayerData();
  }

  toggleGame = () => this.setState({ startGame: !this.state.startGame });

  render() {
    return (
      <>
        {!this.state.startGame ? (
          <div className="playerListSection">
            <div className="navSection">
              <SelectedPlayer selectedPlayer={this.state.selectedPlayer} />
              <button
                className={`btn ${
                  this.state.selectedPlayer.length === 5
                    ? "btn-success"
                    : "btn-danger"
                }`}
                onClick={this.toggleGame}
              >
                start
              </button>
            </div>
            <div className="mainSection">
              <PlayerTable
                playerData={this.state.playerData}
                selectedPlayer={this.state.selectedPlayer}
                setSelectedPlayer={this.setSelectedPlayer}
              />
            </div>
          </div>
        ) : (
          <div>
            <PlayerBets
              playerData={this.state.playerData}
              selectedPlayer={this.state.selectedPlayer}
              setSelectedPlayer={this.setSelectedPlayer}
              setPlayerData={this.setPlayerData}
            />
            <button className={`btn btn-primary`} onClick={this.toggleGame}>
              close
            </button>
          </div>
        )}
      </>
    );
  }
}
