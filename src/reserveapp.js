import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Ground from './components/ground';

function App() {

  const sizeRef = useRef();
  const [size, setSize] = useState(9);

  // const amtOfMines = 10;
  const amtOfMinesRef = useRef();
  const [amtOfMines, setamtOfMines] = useState(10);
  const [exploded, setExploded] = useState(false)
  const [win, setWin] = useState(false)
  const [score, setScore] = useState(0)
  let groundArr = [];
  const [ground, setGround] = useState(groundArr)

  const resize = () => {
    console.log(sizeRef.current.value)
    setSize(sizeRef.current.value)
    groundArr = [];
    makeField()
  }

  const makeField = () => {

    for (let index = 0; index < size ** 2; index++) {
      const cell = {
        mine: 0,
        clicked: 0,
        neighbouringMines: 0,
      }
      groundArr.push(cell)
    }
  }
  makeField()

  //  updateGround(size);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function placeMine(times) {
    const groundCopy = [...ground]
    groundCopy.forEach(e => e.mine = 0)
    setGround(groundCopy)
    let arr = []
    while (arr.length < times) {
      let rand = getRandomInt(0, size ** 2 - 1);
      if (arr.indexOf(rand) === -1) arr.push(rand)
    }
    for (let index = 0; index < arr.length; index++) {
      const groundCopy = [...ground];
      groundCopy[arr[index]].mine = 1;
      setGround(groundCopy)
      console.log('one mine placed')
    }
  }
  const setClicked = (index) => {
    if (exploded || win) return;
    if (ground[index].clicked === 0) setScore(score + 1)
    if (score === size ** 2 - amtOfMines) {
      setWin(true)
      return
    }

    const groundCopy = [...ground];
    groundCopy[index].clicked = 1;
    setGround(groundCopy)
    if (ground[index].mine === 1) setExploded(true);

    console.log(index)
    console.log(ground[index])
  }
  const setNeighbouringMines = (m, i) => {
    const groundCopy = [...ground];
    groundCopy[i].neighbouringMines = m;
    setGround(groundCopy)
  }


  const countNeighbouringMines = (array, index) => {

    let minesArround = 0;
    // jei indeksas 0 tai kaimynai === i+1, i+size, i+size+1;
    if (index === 0) {
      minesArround = array.filter((e, i) => i === index + 1 || i === index + size || i === index + size + 1).reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    // jei indeksas size-1 tai kaimynai === i-1, i+size, i+size-1
    if (index === size - 1) {
      minesArround = array.filter((e, i) => i === index - 1 || i === index + size || i === index + size - 1).reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    // jei indeksas size*size-size tai kaimynai === i+1, i-size, i-size+1
    if (index === size * size - size) {
      minesArround = array.filter((e, i) => i === index + 1 || i === index - size || i === index - size + 1).reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    // jei indeksas size*size-1 tai kaimynai i-1, i-size, i - size -1,
    if (index === (size * size) - 1) {
      minesArround = array.filter((e, i) => i === index - 1 || i === index - size || i === index - size - 1).reduce((sum, { mine }) => sum + mine, 0)
      console.log(index - 1)
      console.log(index - size)
      console.log(index - size - 1)
      setNeighbouringMines(minesArround, index)
      return;
    }
    // jei indeksas daugaiu 0 bet maziau size-2, tai kaimynai i+1, i-1, i+size, i+size+1, i+size-1
    if (index > 0 && index < (size - 1)) {
      minesArround = array.filter((e, i) => i === index + 1 || i === index - 1 || i === index + size || i === index + size + 1 || i === index + size - 1).reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    // jei indeksas daugaiu size*size-size bet maziau size*size-1, tai kaimynai i+1, i-1, i-size, i-size+1, i-size-1
    if (index > size * size - size && index < (size * size - 1)) {
      minesArround = array.filter((e, i) => i === index + 1 || i === index - 1 || i === index - size || i === index - size + 1 || i === index - size - 1).reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    // jei indeksas dalinasi is size ir mazenis uz size*size-size ir didesnis uz 0 tai kaimynai i+size, i-size, i+1, i+1+size, i+1-size, 
    if (index % size === 0 && index < size * size - size && index > 0) {
      minesArround = array.filter((e, i) => i === index + size || i === index - size || i === index + 1 || i === index + 1 + size || i === index + 1 - size).reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }

    // jei indeksas+1 dalinasi is size ir mazenis uz size*size-1 ir didesnis uz size-1 tai kaimynai i+size, i-size, i-1, i-1+size, i-1-size, 
    if ((index + 1) % size === 0 && index < size * size - 1 && index > size - 1) {
      minesArround = array.filter((e, i) => i === index + size || i === index - size || i === index - 1 || i === index - 1 + size || i === index - 1 - size).reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    // likę:  kaimynai i-1, i-1-size, i-1+size, i-size, i+size, i+1, i+1+size, i+1-size.
    minesArround = array.filter((e, i) =>
      i === index - 1 || i === index - 1 - size || i === index - 1 + size || i === index - size || i === index + size || i === index + 1 || i === index + 1 + size || i === index + 1 - size)
      .reduce((sum, { mine }) => sum + mine, 0)
    setNeighbouringMines(minesArround, index)
    return;
  }
  // const resize = () => {
  //   console.log(sizeRef.current.value)
  //   setSize(sizeRef.current.value);
  //   placeMine(amtOfMines)
  // }

  useEffect(() => placeMine(amtOfMines), []);
  useEffect(() => ground.forEach((e, i, arr) => {
    countNeighbouringMines(arr, i)
  }), []);


  return (


    <div className="App">
      <input ref={sizeRef} type="text" placeholder='Enter field size' />
      <button onClick={() => resize()}> Enter </button>


      {/* <input ref={amtOfMinesRef} type="text" placeholder='Įveskite lauko dydį' />
      <button onClick={setamtOfMines(amtOfMinesRef.current.value)}> Enter </button> */}
      <h2>Minesweeper</h2>
      <div className='center'>
        <Ground ground={ground} sideSize={size} setClicked={setClicked} />
      </div>
      {<h3> Score: {score} of {size ** 2 - amtOfMines}</h3>}
      {exploded && <h3> Game over :( </h3>}
      {win && <h3> Its a victory !!!</h3>}

    </div>
  );
}

export default App;
