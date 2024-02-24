import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./planets.css"
// import hyper from "./star_war.mp4"
import hyper from "./hyperspace.mp4"
import logo from "./images.png"
import solar from "./solar.jpg"
import { Link } from 'react-router-dom'


const Planets = () => {
  const [Url, setUrl] = useState("https://swapi.dev/api/planets/?page=1&format=json")
  const [Pagination, setPagination] = useState("")
  const [Details, setDetails] = useState([])
  // const [Id, setId] = useState(2)


  useEffect(() => {
    axios.get(Url)
      .then((response) => {
        setPagination(response.data)
        setDetails(response.data.results)
      })
      .catch(() => {
        window.alert("Connect to Internet / Server down")
      })

  }, [Url])


  let next = () => {
    if (Pagination.next !== null) {
      setUrl(Pagination.next);
    }
  }
  let previous = () => {
    if (Pagination.previous !== null) {
      setUrl(Pagination.previous);
    }
  }

  let seperateId = (url) => {
    let arr = url.split("/", 6)
    return Number(arr[5])
  }

  return (
    <div>
      <div id="navigation">
        <nav>
          <img src={logo} alt="img" id="starwar" />
          <img src={solar} alt="img" id="solar"  /> 
        </nav>
      </div>
      <div id="card_division">
        <video autoPlay loop muted playsInline id="demoing">
          <source src={hyper} type="video/mp4" />
        </video>

        <div id="viewbutton" >
          <button onClick={previous}>Previous</button>
          <button onClick={next}>Next</button>
        </div>

        <div id="view">
          {Details.map((x) => {
            return (
              <div id="boxs" key={x.url}>
                <table >
                  <tbody>
                    <tr >
                      <td >Planet Name </td>
                      <td>:{x.name}</td>
                    </tr>
                    <tr>
                      <td>Planet Climate</td>
                      <td>:{x.climate}</td>
                    </tr>
                    <tr>
                      <td>Planet Population</td>
                      <td>:{x.population}</td>
                    </tr>
                    <tr>
                      <td>Planet terrain</td>
                      <td>:{x.terrain}</td>
                    </tr>
                  </tbody>
                </table>
                <div id="viewButt" >
                  <button ><Link to={`/residents/details/${seperateId(x.url)}`} >Resident</Link> </button>
                </div>
              </div>
            )
          })}
        </div>

        

      </div>
    </div>
  )
}

export default Planets