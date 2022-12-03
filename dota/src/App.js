import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HeroIDS from './heroes'

function App() {

  const [data, setData] = useState({})
  const [match, setMatch] = useState('')
  const [heroes, setHeroes] = useState({})
  const [pickHeroes, setPickHeroes] = useState(null)
  const [radWin, setRadWin] = useState()

  const api = `https://api.opendota.com/api/matches/${match}`

  const searchMatch = (event) => {
    if (event.key === 'Enter') {
      axios.get(api).then((response) => {
        setData(response.data)
        console.log(response.data)
        setPickHeroes(response.data.picks_bans)
        console.log(response.data.picks_bans)
        setRadWin(response.data.radiant_win)
        console.log(response.data.radiant_win)
      })
      setMatch('')
      axios.get(HeroIDS).then((response) => {
        setHeroes(response.data)
        console.log(response.data)
      })
    }
  }

  function RadiantWins() {
    if (radWin === true || radWin == false) {
      if (radWin === false) {
        return <p className='DireVictory'>Dire Victory</p>
      }
        return <p className='RadiantVictory'>Radiant Victory</p>
    }
}

  return (
    <div className="App">
      <div className='Search'>
        <input
          value={match}
          onChange={event => setMatch(event.target.value)}
          onKeyPress={searchMatch}
          placeholder="Enter match ID"
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className='matchID'>
            <p className='bold'>
              {pickHeroes && `Match: ${data.match_id}` }
            </p>
          </div>
          <div className='Radiant'>
            <p className='teamRad'>
              {pickHeroes && 'Radiant:'}
            </p>
            <ul>
              {pickHeroes && pickHeroes.map(({ is_pick, hero_id, team }) => (
                (is_pick === true && team === 0 ?
                      <li className='teamRad' key={hero_id}>
                        {HeroIDS.map(({ id, localized_name }) => (
                          (hero_id == id ?
                            <p>{localized_name}</p>
                            : []
                          )
                        )
                        )}
                      </li>
                      : []
                )
              ))
              }
            </ul>
          </div>
          <div className='Dire'>
            <p className='teamDir'>
              {pickHeroes && 'Dire:'}
            </p>
            <ul>
              {pickHeroes && pickHeroes.map(({ is_pick, hero_id, team }) => (
                (is_pick === true && team === 1 ?
                  <li className='teamDir' key={hero_id}>
                    {HeroIDS.map(({id, localized_name}) => (
                      (hero_id == id ?
                        <p>{localized_name}</p>
                        : []
                      )
                    )
                    )}
                  </li>
                  : []
                )
              ))}
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div className='victory'>
            {RadiantWins()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
