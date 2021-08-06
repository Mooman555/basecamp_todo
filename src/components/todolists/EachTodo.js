import React from 'react';
import "./EachTodo.css";
import { Form} from "react-bootstrap";

import {ImFileText2} from "react-icons/im";
import {MdDateRange} from "react-icons/md";
import {AiFillMediumCircle} from "react-icons/ai";



const EachTodo = (props) => {
   
  
    return (
           <div>
            <Form.Group className="todo-parent">
                <Form.Check
                  className="each-todo-checkbox"
                  type="checkbox"
                 />
                 <p className="each-todo-description">{props.todoDescription}</p>
                <ImFileText2 className="each-todo-file-icon"/>
                <MdDateRange className="each-todo-date-icon"/>
                <p className="each-todo-dueDate">{props.todoDueDate}</p>
                <AiFillMediumCircle className="each-todo-avatar-icon"/>
                <p className="each-todo-description">{props.todoAssignedTo}</p>
                </Form.Group>

        </div>
    )
}

export default EachTodo;
