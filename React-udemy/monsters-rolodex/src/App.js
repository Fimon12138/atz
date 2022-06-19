// functional component style

import { useState, useEffect } from 'react';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  const onSearchChange = (event) => {
    const searchStr = event.target.value.toLocaleLowerCase();
    setSearchField(searchStr);
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(data => setMonsters(data));
  }, []);

  useEffect(() => {
    const temp = monsters.filter(monster => monster.name.toLocaleLowerCase().includes(searchField));
    setFilteredMonsters(temp);
  }, [monsters, searchField]);

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
        className='monsters-search-box' 
        onChangeHandler={onSearchChange} 
        placeholder='search monsters' 
      />
      <CardList 
        monsters={filteredMonsters} 
      />
    </div>
  );
}


// class component style

// import { Component } from 'react';
// import CardList from './components/card-list/card-list.component';
// import SearchBox from './components/search-box/search-box.component';

// import './App.css';

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       display: []
//     };
//   };

//   onSearchChange = (event) => {
//     const key = event.target.value.toLocaleLowerCase();
//     this.setState({display: this.state.monsters.filter(monster => monster.name.toLocaleLowerCase().includes(key))});
//   };

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(resp => resp.json())
//       .then(data => {
//         this.setState({monsters: data, display: data});
//       });
//   };

//   render() {
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox className='monsters-search-box' onChangeHandler={this.onSearchChange} placeholder='search monsters' />
//         <CardList monsters={this.state.display} />
//       </div>
//     );
//   };
// }

export default App;
