import { useState,useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import swal from 'sweetalert';
import { Todos } from './Components/Todos';
import { db } from './firebase';
import {query,collection,onSnapshot,updateDoc,doc,addDoc,deleteDoc} from 'firebase/firestore'
import './Styling/Main.scss';

export const App = () => {
    // To make input value as controlled input
    const [inputValue, setInputValue] = useState('');
    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    }

    const [todosArray, setTodosArray] = useState([]);

    // create todo
    const handleSubmitTodo = async (e) => {
        e.preventDefault();

        if (inputValue === '') {
            swal('Please enter todo');
            return
        }
        await addDoc(collection(db, 'todos'), {
            todoText: inputValue,
            completed: false
        })
        setInputValue('');
    }

    // read todos from firestore
    const fetchData = () => {
        // Step-1
        const pathToDatabase = query(collection(db, 'todos'))
        // Step-2
        const unsubscribe = onSnapshot(pathToDatabase, (querySnapshot) => {
            const todosBackendArray = [];
            querySnapshot.forEach((record) => {
                todosBackendArray.push({
                    ...record.data(),
                    id: record.id
                })
            })
            setTodosArray(todosBackendArray)
        })
        return () => unsubscribe()
    }
    useEffect(fetchData, []);

    // update todo in firestore
    const updateTodo = async (todo) => {
        const {
            completed,
            id
        } = todo;
        await updateDoc(doc(db, 'todos', id), {
            completed: !completed
        })
    }

    // delete todo in firestore
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
    }

    return (
        <>
            <h1
                className="text-center p-3 display-5 text-secondary"
            >
                Todo App 
            </h1>

            <>
                <div className="container">
                    <div className="row">
                        {/* col-1 */}
                        <div className="col-lg-6">
                            <>
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        placeholder='Add Todos'
                                        className='form-control'
                                        value={inputValue}
                                        onChange={handleInputValue}
                                    />
                                </div>
                            </>
                        </div>
                        {/* end of col-1 */}

                        {/* col-2 */}
                        <div className="col-lg-6">
                            <button
                                className='btn btn-primary'
                                type='btn'
                                onClick={handleSubmitTodo}
                            >
                                <FaPlus/>
                            </button>
                        </div>
                        {/* end of col-2 */}

                    </div>
                </div>
            </>

            <ul
                className='list-group mx-3'
            >
                {
                    todosArray.map((ele,i) => {
                        return (
                            <Todos
                                key={i}
                                todoItemBE = {ele}
                                updateTodo = {updateTodo}
                                deleteTodo = {deleteTodo}
                            />
                        )
                    })
                }
            </ul>
            {
                todosArray.length > 0 ? <p className='lead text-capitalize text-center my-2 text-danger'>
                you have {todosArray.length} todos 
            </p> : null 
            }
            
        </>
    )
}