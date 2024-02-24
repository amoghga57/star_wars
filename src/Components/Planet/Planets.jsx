import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./planets.css"
import hyper from "./hyperspace.mp4"
import logo from "./images.png"
import solar from "./solar.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';



const Planets = () => {
  const [Url, setUrl] = useState("https://swapi.dev/api/planets/?page=1&format=json")
  const [Pagination, setPagination] = useState("")
  const [Details, setDetails] = useState([])


  useEffect(() => {
    axios.get(Url)
      .then((response) => {
        setPagination(response.data)
        setDetails(response.data.results)
        if ((response.data.results).length === 0) {

        } else {
          document.getElementById("loader").style.display = "none"
          document.getElementById("view").style.display = "flex"

        }
      })
      .catch(() => {
        window.alert("Connect to Internet / Server down / Wait")
      })

  }, [Url,Details.length])


  let next = () => {
    if (Pagination.next !== null) {
      setUrl(Pagination.next);
      document.getElementById("previous").style.color = "green"

    } else {
      document.getElementById("next").style.color = "red"
    }
  }
  let previous = () => {
    if (Pagination.previous !== null) {
      setUrl(Pagination.previous);
      document.getElementById("next").style.color = "green"
    } else {
      document.getElementById("previous").style.color = "red"
    }
  }

  let seperateId = (url) => {
    let arr = url.split("/", 6)
    return Number(arr[5])
  }

  return (
    <div>
      <div id="loader"><FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" style={{color: "#63E6BE",}} /></div>
      <div id="navigation">
        <nav>
          <img src={logo} alt="img" id="starwar" />
          <img src={solar} alt="img" id="solar" />
        </nav>
      </div>

      <div id="card_division">
        <video autoPlay loop muted playsInline id="demoing">
          <source src={hyper} type="video/mp4" />
        </video>

        <div id="viewbutton" >
          <button onClick={previous}  ><FontAwesomeIcon id="previous" icon={faCircleArrowRight} flip="horizontal" size="2xl" /></button>
          <button onClick={next}  ><FontAwesomeIcon id="next" icon={faCircleArrowRight} size="2xl" /></button>
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