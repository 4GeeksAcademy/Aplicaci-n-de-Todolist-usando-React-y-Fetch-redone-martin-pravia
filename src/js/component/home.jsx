import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const api = "https://playground.4geeks.com/todo";
  const lastApi = "/users/martopravia";
  const myApi = `${api}${lastApi}`;

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

  const addTask = async (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      const newTask = { label: e.target.value, done: false };

      try {
        const response = await fetch(`${api}/todos/martopravia`, {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Error al agregar tarea");

        const addedTask = await response.json();
        setTasks((tasks) => [...tasks, addedTask]);
        e.target.value = "";
      } catch (error) {
        console.error("Fatalidad :", error);
      }
    }
  };

  const deleteData = async (taskID) => {
    try {
      const response = await fetch(`${api}/todos/${taskID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al realizar el DELETE");
      }

      setTasks((tasks) => tasks.filter((task) => task.id !== taskID));
    } catch (error) {
      console.log("Error al realizar DELETE: ", error);
    }
  };

  const deleteAllTasks = async () => {
    try {
      for (const task of tasks) {
        const response = await fetch(`${api}/todos/${task.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al eliminar la tarea");
        }
      }

      setTasks([]);
    } catch (error) {
      console.log("Error al eliminar las tareas: ", error);
    }
  };

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
            onKeyDown={addTask}
          />
          <ul className="list-group">
            {tasks.map((task) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={task.id}
                >
                  {task.label}
                  <i
                    className="bi bi-trash trash"
                    onClick={() => deleteData(task.id)}
                  >
                    {" "}
                  </i>
                </li>
              );
            })}
            <li className="list-group-item">
              {tasks.length !== 0
                ? `To do's to go: ${tasks.length}`
                : "There's nothing to do :)"}
            </li>
          </ul>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-danger" onClick={deleteAllTasks}>
              Evadir todo, limpiar!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
