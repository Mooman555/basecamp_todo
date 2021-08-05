import { React, useState,useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toolBarOption } from "./editorOption";
import { GoPlus } from "react-icons/go";
import { BsCircleFill } from "react-icons/bs";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import TodoLists from "../todolists/TodoLists";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../Todos.css";

const BaseCampTodo = () => {
  const [todosCounter, setTodosCounter] = useState(0);
  const [totalTodos, setTotalTodos] = useState(0);
  const [todoListText, setTodoListText] = useState("");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [editorValue, setEditorValue] = useState("");
  const [showDiv, setShowDiv] = useState(true);
  const [showEditorDiv, setShowEditorDiv] = useState(true);

  const [todoListArray, setTodoListArray] = useState([]);

  const listNameRef = useRef(null);

  const showTodoSection = () => {
    setShowDiv(true);
  }
  
  const hideTodoSection = () => {
      setShowDiv(false);
      setShowEditorDiv(!showEditorDiv);

  }

  const editorDivHandler = () => {
    setShowEditorDiv(!showEditorDiv);
  }

  const getEditorState = (editorState) => {
     setEditorState(editorState);
     setEditorValue(editorState.getCurrentContent().getPlainText());
  };



  const getTodoName = () => {
    let listName = listNameRef.current;
    todoListText === "" ? listName.focus():  
    setTodoListArray((prevTodoListArray) => [...prevTodoListArray,{ title : todoListText, details : editorValue}]);
    setTodoListText("");
    setEditorState("");
    

}

 
 
 

  return (
    <div className="root-div">
      <Container className="container-wrapper">
        <Row className="header-section">
          <Col xl={3} lg={3} md={3} sm={3}>
            <Form.Group>
              <Button className="header-left-button" onClick={showTodoSection} type="submit">
                {" "}
                <GoPlus /> New list{" "}
              </Button>
            </Form.Group>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6}>
            <div className="header-center-div">
              <p className="header-center-text">To-dos</p>
              <BsCircleFill fill="silver" className="header-center-circle" />
              <p className="header-center-p">
                {todosCounter}/{totalTodos}
              </p>
            </div>
          </Col>
        </Row>

        <div className={ showDiv ? "display-show add-new-list-section" : "display-hidden add-new-list-section"}>
          <Form.Group>
            <Form.Control
              ref={listNameRef}
              className="new-section-list-header"
              onChange={(e) => setTodoListText(e.target.value)}
              value={todoListText}
              type="text"
              placeholder="Name this list..."
            />
            <div className="new-section-list-editor">
              <div className={showEditorDiv ? "display-show new-section-list-div" : "display-hidden new-section-list-div" } onClick={editorDivHandler}>  Add extra details or attach files...</div> 
              <div className= {showEditorDiv ? "editor-div display-hidden" : "editor-div display-show"  }>
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
              <div className ="new-section-list-bottom">
                <Button onClick = {getTodoName} className ="add-list-button">Add this list</Button>
                <Button onClick = {hideTodoSection} className = "cancel-list-button">Cancel</Button>
              </div>
            </div>
          </Form.Group>
        </div>

         {
             todoListArray.length !== 0 ? todoListArray.map((todoDetails,index) => (
             <div key={index} className="renderind-lists">
                <TodoLists title={todoDetails.title} description= {todoDetails.details}/>
             </div>
             )) : <p className = "no-list-found"> No todo list ...</p>

             }
      </Container>
    </div>
  );
};

export default BaseCampTodo;
