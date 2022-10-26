import { useState, useEffect } from 'react'
import Alert from './Alert';
import './App.css'
import ToDo from './ToDo';



function App() {
  const [name, setName] = useState(''); // value that we'll use in our form / the empty value by default 
  const [toDo, setToDo] = useState([]); // empty array that we'll use for local storage
  const [isEditing, setIsEditing] = useState(false); // a flag in a state whether is editing or not
  const [editID, setEditID] = useState(null); // this state will reflect which ite is actually editing
  const [alert, setAlert] = useState({show:false, msg:'', type: ''}); // is an object from we can display alert information

  const handleSubmit = (e) => {
    e.preventDefault(); // the preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur. // clicking on a "Submit" button, prevent it from submitting a form
    console.log('hello');
  }

    return (
        <div>
          <h1>To-do list</h1>
          <section className='section-center'>
            <form className='todo-form' onSubmit={handleSubmit}>
              {alert.show && <Alert/>}  {/* show some checking for the proprety of show more specific for the value and if that is the case - display it // you can check it if you change useState for alert to show:true // The logical AND (&&) operator for a set of boolean operands will be true if and only if all the operands are true. Otherwise it will be false. */}
              <div className='form-control'>
                <input type='text' className='todo' placeholder='ex. read a book' value={name} onChange={(e) => setName(e.target.value)}/>
                <button type='submit' className='submit-btn'>
                  {isEditing ? 'edit' : 'submit'} {/* check if is editing and if is true than display edit, if not - submit (by default is false).  You can check it if you change useState for isEditing to true*/}
                </button>
              </div>
            </form>
            <div className='todo-container'>
              <ToDo/>
              <button className='clear-btn'>clear items</button>
            </div>
          </section>
        </div>
    )
}

export default App;
