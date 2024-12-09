import React, { useEffect, useState } from "react";



//create your first component
const Home = () => {
const [tasks, setTasks] = useState([]);
const api = "https://playground.4geeks.com/todo"
const lastApi = "/users/martopravia"
const myApi = `${api}${lastApi}`

useEffect(() => {
    const fetchApi = async () => {
        try {
            const response = await fetch(myApi);
            if (!response.ok) {
                throw new Error("Error al obtener los datos de la API");
            }
            const data = await response.json();
            console.log("Datos obtenidos:", data);
            setTasks(data.todos);
        } catch (error) {
            console.error("Error al realizar el fetch:", error);
        }
    };
    fetchApi(); 
}, []);

  return (
	<>
	<div className="row d-flex justify-content-center">
	  <div className="col-8">
		<label className="form-label d-flex justify-content-center align-items-center">
		  <h1 className="display-3 title"> To Do List</h1>
		</label>
		<input
		  type="text"
		  className="form-control"
            id="inputText"
            aria-describedby="InputText"
            placeholder="Insert here your item to the list"
		  />
		   <ul className="list-group">
            {tasks.map((task) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={task.id}
                >
                  {task.label}
                  <i className="bi bi-trash trash " ></i>
                </li>
              );
            })}
          </ul>
		   </div>
		   </div>
		  </>
  )
};

export default Home;
