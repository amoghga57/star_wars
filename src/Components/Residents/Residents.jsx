import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./residents.css"
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Temp = () => {
     const [residents, setResidents] = useState([]);

     let urlId = useParams()

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await axios.get(`https://swapi.dev/api/planets/${urlId.id}/`);
                    const residentsData = await Promise.all(
                         response.data.residents.map(async (residentURL) => {
                              const res = await axios.get(residentURL);
                              return res.data;
                         })
                    );
                    if(residentsData.length===0){
                         document.getElementById("loaderHomePage").style.display="none"
                         window.alert("No Residents present in this Planet")
                    }else{
                         document.getElementById("detailsTable").style.display="flex"
                         document.getElementById("loaderHomePage").style.display="none"
                    }
                    setResidents(residentsData);
               } catch (error) {
                    console.error('Error fetching data:', error);
               }
          };

          fetchData();

     }, [urlId.id]);

     return (
          <main>
               <div id="loaderHomePage"><FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" style={{color: "#63E6BE",}} /></div>
               {/* The table of the patient */}
               <div id="heading">
                    <span>RESIDENTS DETAILS</span>
               </div>
               <body id="detailsTable">
                    <table border={1}>
                         <thead id="tableHead">
                              <th>Residence Name </th>
                              <th>Residence Heigth</th>
                              <th>Residence Mass</th>
                              <th>Residence Gender</th>
                         </thead>
                         <tbody>
                              {residents.map((data, id) => {
                                   return (
                                        <tr id="box" key={id}>
                                             <td>{data.name}</td>
                                             <td>{data.height}</td>
                                             <td>{data.mass}</td>
                                             <td>{data.gender}</td>
                                        </tr>
                                   )
                              })}
                         </tbody>
                    </table>
               </body>
          </main>

     );
};

export default Temp;
