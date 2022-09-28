import { FaTrash } from "react-icons/fa";

export const Todos = ({
        todoItemBE,
        updateTodo,
        deleteTodo
    }) => {
    const {
        completed,
        todoText,
        id
    } = todoItemBE;

    const style = {
        liCompleted: 'line-through',
        backgroundColor: 'lightCyan'
    }
    
    return (
        <li 
            className="list-group-item d-flex justify-content-between align-items-center"
            style = {
                {
                    backgroundColor: completed && style.backgroundColor
                }
            }
        >
            <div className="form-check">
                <input 
                    type="checkbox" 
                    className="form-check-input"
                    checked={completed ?'checked' : ''}
                    onChange = {
                        () => updateTodo(todoItemBE)
                    }
                />
                <p 
                    className="text-muted"
                    style={{textDecoration:completed && style.liCompleted}}
                    onClick = {
                        () => updateTodo(todoItemBE)
                    }
                >
                    {todoText}
                </p>
            </div>
            <button 
                className="btn btn-dark"
                onClick = {
                    () => deleteTodo(id)
                }
            >
                <FaTrash/>
            </button>
        </li>
    )
}