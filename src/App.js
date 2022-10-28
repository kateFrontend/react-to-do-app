import { useState, useEffect } from "react";
import Alert from "./Alert";
import "./App.css";
import ToDo from "./ToDo";
import image from "./todo-image.png";

// We need to have a localStorage to not lose all values after refreshing the page

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState(""); // value that we'll use in our form / the empty value by default
  const [list, setList] = useState(getLocalStorage()); // empty array that we'll use for local storage // local storage list
  const [isEditing, setIsEditing] = useState(false); // a flag in a state whether is editing or not
  const [editID, setEditID] = useState(null); // this state will reflect which ite is actually editing
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  }); // is an object from we can display alert information

  const handleSubmit = (e) => {
    e.preventDefault(); // the preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur. // clicking on a "Submit" button, prevent it from submitting a form
    //  console.log('hello');
    if (!name) {
      // check if the value in input is empty and if is empty then display the alert
      showAlert(true, "danger", "please enter value"); // display alert
    } else if (name && isEditing) {
      // check if there's something in the value and if the editing is true
      setList(
        list.map((item) => {
          // we have our list and we're iterating over it
          if (item.id === editID) {
            // if the item Id matches to whatever we have in a state, the return all the propreties
            return { ...item, title: name }; // return Id and change the title to whatever is the state
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      // show alert
      showAlert(true, "success", "new task added to the list");
      const newItem = {
        // create a new item is equil to the object with an unique ID and a title tht will be equil to the name value that is coming from the state
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]); // ... get me the previous values from the state add add a new one
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    // parameters by default
    setAlert({ show, type, msg }); // if the property name matches to the variable name that holds the value then show and type an message
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "task removed");
    setList(list.filter((item) => item.id !== id)); // list filter always return a new array / if item Id matches to whatever idea passed into remove item, then don't return it from thos filter function. If item Id doesn't match, then it's going to be added to the new array
  };

  const editItem = (id) => {
    // get a specific item whose Id matches
    const specificItem = list.find((item) => item.id === id); // if the item Id matches, then return that item
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div>
{/*         <h1 className="title-center">To-do list</h1> */}
        <section className="section-center">
          <form className="todo-form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}{" "}
            {/* inside of alert component pass all the properties from state alert value */}
            {/* show some checking for the proprety of show more specific for the value and if that is the case - display it // you can check it if you change useState for alert to show:true // The logical AND (&&) operator for a set of boolean operands will be true if and only if all the operands are true. Otherwise it will be false. */}
            <div className="form-control">
              <input
                type="text"
                className="todo"
                placeholder="Enter a new task to do"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="submit-btn">
                {isEditing ? "edit" : "submit"}{" "}
                {/* check if is editing and if is true than display edit, if not - submit (by default is false).  You can check it if you change useState for isEditing to true*/}
              </button>
            </div>
          </form>
          {list.length > 0 && (
            <div className="todo-container">
              <ToDo items={list} removeItem={removeItem} editItem={editItem} />{" "}
              {/* list as a prop into Todo component named 'items' */}
              <button className="clear-btn" onClick={clearList}>
                clear items
              </button>
            </div>
          )}
          <div className="img-container">
            <img src={image} className="image" />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
