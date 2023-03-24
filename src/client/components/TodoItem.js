import React, { useState } from 'react';
import { PencilIcon, XIcon, CheckIcon } from '@heroicons/react/outline';
import { updateTodo, deleteTodo } from '../../firebase';

const Todo = ({ item }) => {
  // const [checked, setChecked] = useState(item.done);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(item.name);

  const handleCheckbox = () => {
    updateTodo(item.id, { done: !item.done });
  };

  const handleDelete = () => {
    deleteTodo(item.id);
  };

  const handleEdit = () => {
    if (isEditing) {
      updateTodo(item.id, { name: updatedText });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateTodo(item.id, { name: updatedText });
    setIsEditing(!isEditing);
  };

  return (
    <fieldset>
      <legend className="sr-only">To-do item</legend>
      {isEditing ? (
        <div className="flex justify-between items-center my-2 h-5">
          <input
            type="text"
            value={updatedText}
            className="border-2 border-gray-300 rounded-md p-1"
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button className='inline-flex mr-3 items-center p-1 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm' type="button" onClick={handleSave}>
            <span className="sr-only">Save Item</span>
            <CheckIcon className="block h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) :
        (<div className="flex justify-between items-center my-2 h-5">
          <label
            htmlFor="item"
            className="flex items-center text-sm text-gray-700"
          >
            <input
              id={item.id}
              name="item"
              type="checkbox"
              checked={item.done}
              onChange={handleCheckbox}
              className="mr-3 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            {item.name}
          </label>
          <div className='flex flex-row'>
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex mr-3 items-center p-1 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              <span className="sr-only">Edit Item</span>
              <PencilIcon className="block h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center p-1 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              <span className="sr-only">Delete Item</span>
              <XIcon className="block h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>)
      }

    </fieldset>
  );
};

export default Todo;



