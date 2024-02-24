import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./residents.css"
import { useParams } from 'react-router-dom';

const Temp = () => {
     const [residents, setResidents] = useState([]);

     let urlId= useParams()

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
                    setResidents(residentsData);
               } catch (error) {
                    console.error('Error fetching data:', error);
               }
          };

          fetchData();
          // if(residents.length===0){
          //      window.alert("No Residents present in this Planet")
          // }
     }, [urlId.id]);

     return (
          <main>
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
                              {residents.map((data,id) => {
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
