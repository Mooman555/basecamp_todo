import { React, useState } from "react";
import EachTodo from "./EachTodo";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "./Todo.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import { BsCircleFill } from "react-icons/bs";
import { Form, Button } from "react-bootstrap";
import { toolBarOption } from "../basecamptodo/editorOption";


const TodoLists = (props) => {
  const [showAddTodoButton, setShowAddTodoButton] = useState(true);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoAssignNames, setTodoAssignNames] = useState("");
  const [todoNotifyNames, setTodoNotifyNames] = useState("");
 
  const [todoNotes, setTodoNotes] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorValue, setEditorValue] = useState("");
  const [divState, setDivState] = useState(true);
  const [radioState, setRadioState] = useState(-1);
  const [dateState, setDateState] = useState("");
  const [singleTodoArray, setSingleTodoArray] = useState([]);

  const [singleDate, setSingleDate] = useState("");
  const [rangeDate, setRangeDate] = useState("");
  const [startRangeDate, setStartRangeDate] = useState("");
  const [endRangeDate, setEndRangeDate] = useState("");



  const addTodoDetailsHandler = () => {
    setSingleTodoArray((prevTodoListArray) => [...prevTodoListArray,
      { 
       assignedTo : todoTitle,
       notify : todoNotifyNames,
       dueDate : radioState == 3 ? "no due date" : dateState,
       extraDetails : editorValue
      }
    ]);

          setTodoAssignNames("");
          setTodoNotifyNames("");
          setDateState("");
          setTodoNotes("");
          setEditorState("");
          setTodoTitle("");
          setSingleDate("");
          setStartRangeDate("");
          setEndRangeDate("");
          setRadioState(-1);
  }

  const showFormGroupHandler = () => {
    setShowAddTodoButton(!showAddTodoButton);
    setDivState(!divState);

  }

  const addTodoHandler = () => {
    setShowAddTodoButton(false);
  };

  const getEditorState = (editorState) => {
    setEditorState(editorState);
    setEditorValue(editorState.getCurrentContent().getPlainText());
 };

    const divShowHandler = () => {
      setDivState(!divState);
    }

    const handleApply = (event, picker) => {
      setSingleDate("");
      setStartRangeDate(picker.startDate.format("ddd,MMM DD"));
      setEndRangeDate(picker.endDate.format("ddd,MMM DD"));
      setDateState(picker.startDate.format("ddd,MMM DD")+ ` to ` + picker.endDate.format("ddd,MMM DD"));
      picker.element.val(
        picker.startDate.format("MM/DD/YYYY") +
          " - " +
          picker.endDate.format("MM/DD/YYYY")
      );
    };
    const handleCancel = (event, picker) => {
      picker.element.val("");
    };

   const radioStateHandler = (value) => {
         if(value == 3){
          setSingleDate("");
          setStartRangeDate("");
          setEndRangeDate("");  
          setRadioState(value);    
         }else {
            setRadioState(value);
         }
   }


  return (
    <div>
      <div className="todo-title">
        <BsCircleFill fill="silver" className="todo-title-circle" />
        <p className="todo-title-text">{props.title}</p>
      </div>
      <div className="todo-description">{props.description}</div>
      {singleTodoArray.length !== 0
        ? singleTodoArray.map((todoDetails, index) => (
            <Form.Group  key={index}>
              <div className="render-each-todo">
                <EachTodo
                  todoName={todoDetails.assignedTo}
                  todoNotify={todoDetails.notify}
                  todoDueDate={todoDetails.dueDate}
                  todoDescription={todoDetails.extraDetails}
                />
              </div>
            </Form.Group>
          ))
        : ""}
      <Form.Group className="outer-parent-wrapper">
        <Button
          onClick={addTodoHandler}
          className={
            showAddTodoButton
              ? "todo-button display-show"
              : "todo-button display-hidden"
          }
        >
          Add a to-do
        </Button>

        <Form.Group
          className={showAddTodoButton ? "display-hidden" : "display-show"}
        >
          <div className="add-todo-details-section">
            <div className="add-todo-checkbox-input">
              <Form.Check
                disabled
                type="checkbox"
                className="disbaled-checbox"
              />
              <Form.Control
                className="todo-heading"
                onChange={(e) => setTodoTitle(e.target.value)}
                value={todoTitle}
                type="text"
                placeholder="Describe the todo to me..."
              />
            </div>
            <div className="todo-assign-section border-bottom">
              <Form.Label className="todo-assign-label">
                {" "}
                Assigned to{" "}
              </Form.Label>
              <Form.Control
                className="todo-assign-names"
                onChange={(e) => setTodoAssignNames(e.target.value)}
                value={todoAssignNames}
                type="text"
                placeholder="Types names to assign..."
              />
            </div>

            <div className="todo-assign-section border-bottom">
              <Form.Label className="todo-assign-label">
                When done, notify{" "}
              </Form.Label>
              <Form.Control
                className="todo-assign-names"
                onChange={(e) => setTodoNotifyNames(e.target.value)}
                value={todoNotifyNames}
                type="text"
                placeholder="Types names to notify..."
              />
            </div>

            <div className="todo-assign-section border-bottom">
              <Form.Label className="todo-assign-label">Due on</Form.Label>
          <div className="todo-assign-datepicker">
            <div className="todo-assign-single-datepicker">
              <DateRangePicker
                initialSettings={{
                  autoUpdateInput: false,
                  locale: {
                    cancelLabel: "Clear",
                  },
                }}
                onApply={handleApply}
                onCancel={handleCancel}
              >
                <input
                  type="radio"
                  name="mooman"
                  label="Select a date..."
                  value = {1}
                  onChange={(e)=>radioStateHandler(e.target.value)}
                  checked={radioState == 1 ? true : false}
                  // className="form-control todo-assign-names todo-date"
                />
              </DateRangePicker>
              <Form.Control
                className="todo-heading date-input"
               // onChange={(e) => setTodoTitle(e.target.value)}
                defaultValue={startRangeDate}
                type="text"
                placeholder="start Date..."
              />
               <Form.Control
                className="todo-heading date-input"
               // onChange={(e) => setTodoTitle(e.target.value)}
               defaultValue={endRangeDate}
                type="text"
                placeholder="End Date..."
              />
             </div>
             <div className="todo-assign-single-datepicker" >
              <DateRangePicker
                initialSettings={{
                  singleDatePicker: true,
                  showDropdowns: true,
                  startDate: "1/1/2021",
                  minYear: 1901,
                //  maxYear: parseInt(moment().format("YYYY"), 10),
                }}
                onCallback={(start) => {
                  const dayName = moment(start).format("ddd");
                  const dayNum = moment(start).format("DD");
                    setDateState(dayName+`,`+dayNum);
                  setStartRangeDate("");
                  setEndRangeDate("");
                  setSingleDate(moment(start).format("ddd,MMM DD,YYYY"));
                }}
              >
                 <input
                type="radio"
                name="mooman"
                  value = {2}
                  onChange={(e)=>radioStateHandler(e.target.value)}
                  checked={radioState == 2 ? true : false}
                  label="Select a date..."
                
                // className="form-control todo-assign-names todo-date"
              />
              </DateRangePicker>
              <Form.Control
                className="todo-heading date-input"
               // onChange={(e) => setTodoTitle(e.target.value)}
               defaultValue={singleDate}
                type="text"
                placeholder="select a date..."
              />
           </div>
            <div className="todo-assign-single-datepicker">
              <input
                type="radio"
                name="mooman"
                label="Select a date..."
                value = {3}
                onChange={(e) => radioStateHandler(e.target.value)}
                checked={radioState == 3 ?  true : false}
                
              />
              <Form.Text
              disabled
                className="no-due-text date-input"
              >
                no due date
             </Form.Text>
              </div>
            </div>
             
          </div>

            <div className="todo-assign-section margin-right">
              <Form.Label className="todo-assign-label">Notes</Form.Label>
              <div
                onClick={divShowHandler}
                className={
                  divState
                    ? "display-show todo-assign-names editor-wrapper-div"
                    : "display-hidden todo-assign-names editor-wrapper-div"
                }
              >
                add extra details or attach a file...
              </div>
              <div className={divState ? "display-hidden" : "display-show"}>
                <Editor
                  placeholder="Add extra details or attach files..."
                  editorState={editorState}
                  onEditorStateChange={getEditorState}
                  toolbar={toolBarOption}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                />
              </div>
            </div>

            <div className="new-section-list-bottom margin">
              <Button
                onClick={addTodoDetailsHandler}
                className="add-list-button"
              >
                Add this todo
              </Button>
              <Button
                onClick={showFormGroupHandler}
                className="cancel-list-button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form.Group>
      </Form.Group>
    </div>
  );
};

export default TodoLists;
