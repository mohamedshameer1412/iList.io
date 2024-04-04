import React, { useState } from 'react';

function TaskInput({ addItem }) {
    const [todo, setTodo] = useState('');

    // Function to remove unwanted spaces before submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo.trim()) return;
        addItem(todo,);
        setTodo('');
    };

    return (
        // Task Input Form
        <>
            <div className="text-center mt-5">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <input
                            type="text"
                            id="todo"
                            name="to-do"
                            value={todo}
                            placeholder='~ Today I need to ~'
                            onChange={(e) => setTodo(e.target.value)}
                            className="form__input"
                            required
                        />
                        <button type="submit" className="button  ms-2">
                            <span>Submit</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default TaskInput;
