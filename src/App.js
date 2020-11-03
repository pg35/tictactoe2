import React from "react";
import "./styles.css";

const Cell = ({ r, c, symbol, onClick }) => (
  <button
    className="cell"
    onClick={() => onClick(r, c)}
    disabled={"" !== symbol}
  >
    {symbol}
  </button>
);
const Board = ({ cells, rows, cols, onCellClick }) => {
  let items = [];
  for (let i = 0; i < rows; ++i) {
    let arr = [];
    for (let j = 0; j < cols; ++j) {
      arr.push(
        <Cell
          r={i}
          c={j}
          symbol={cells[i][j]}
          key={i * rows + j}
          onClick={onCellClick}
        />
      );
    }
    items.push(
      <div key={i} className="cell-row">
        {arr}
      </div>
    );
  }
  return (
    <div className="board" style={{ borderCollapse: "collapsed" }}>
      {items}
    </div>
  );
};
function getPlayerName(turn) {
  return turn ? "B" : "A";
}
function getPlayerSymbol(turn) {
  return turn ? "\u2716" : "\u2714";
}
const PlayerTurn = (props) => (
  <div className="turn-wrap">
    Player Turn: {getPlayerName(props.turn)} ({getPlayerSymbol(props.turn)})
  </div>
);
const Score = (props) => (
  <div class="score-wrap">
    {props.score.map((n, i) => (
      <div class="score">
        Player {getPlayerName(i)} Wins: {n}
      </div>
    ))}
  </div>
);
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      moves: {},
      score: [0, 0]
    };
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  componentDidMount() {}

  getNextTurn(turn) {
    return !turn;
  }
  handleCellClick(r, c) {
    console.log(
      `current turn = ${getPlayerName(this.state.turn)} for  ${r}, ${c}`
    );
    const { size } = this.props;
    const { turn } = this.state;
    this.setState((state) => ({
      turn: this.getNextTurn(state.turn),
      moves: { ...state.moves, [r * size + c]: [turn, r, c] }
    }));
  }
  prepareCells(rows, cols, cells) {
    const arr = new Array(rows);
    for (let i = 0; i < rows; ++i) arr[i] = new Array(cols);
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        const k = i * rows + j;
        arr[i][j] = cells[k] ? getPlayerSymbol(cells[k][0]) : "";
      }
    }
    return arr;
  }
  render() {
    const { size } = this.props;
    const { turn, moves, score } = this.state;
    const [rows, cols] = [size, size];
    const newMoves = {
      0: [1, 0, 0],
      1: [1, 0, 1],
      2: [0, 1, 0],
      3: [0, 1, 1]
    };
    const cells = this.prepareCells(rows, cols, moves);
    return (
      <div className="game">
        <Score score={score} />
        <PlayerTurn turn={turn} />
        <Board
          rows={size}
          cols={size}
          cells={cells}
          onCellClick={this.handleCellClick}
        />
      </div>
    );
  }
}
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see sofdddgdgme magic happen!</h2>
      <Game size={3} />
    </div>
  );
}
