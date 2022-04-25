import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import uuid from "react-uuid";
import { MODIFY_TASK } from "./constants";
import { addTask } from "./actions";
import { moment } from "./moment";
import Task from "./components/Task";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  padding-top: 50px;
`;

const SubContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 0 auto;
  border-radius: 3px;
  background-color: #292929;
  height: 650px;
  overflow: auto;
  padding: 30px 10px;
  background-color: #383838;
`;

const InputContainer = styled.form`
  color: white;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #292929;
  height: 50px;
  border-radius: 3px;
`;

const AddTask = styled.div`
  color: white;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #292929;
  height: 50px;
  border-radius: 3px;
  cursor: pointer;
`;

const InputField = styled.input`
  all: unset;
  background-color: white;
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  color: black;
`;

const CreateBtn = styled.button`
  all: unset;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background-color: #3d3d3d;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2e2e2e;
  }
`;

const CancelBtn = styled.div`
  all: unset;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TaskContainer = styled.div``;

const StarWrapper = styled.div`
  margin: 0 10px 0 10px;
  height: 40px;
  width: 40px;
  display: grid;
  place-items: center;
  color: ${(props) => props.stared || "#545454"};
`;

function App({ data, addTask }) {
  const [openField, setOpenField] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [items, setItems] = useState(data);
  const [filterStared, setFilterdStared] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setItems(data);
  }, [data]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (taskInput === "") {
      window.alert("Input cannot be empty");
    } else {
      var time = new Date();
      var newTime = moment(time);
      addTask({
        id: uuid(),
        title: taskInput,
        star: false,
        createdAt: newTime,
        updatedAt: newTime,
      });
      setTaskInput("");
      setOpenField(false);
    }
  };

  const showStaredHandler = () => {
    if (filterStared === false) {
      setFilterdStared(null);
    } else {
      setFilterdStared(false);
    }
  };

  const starHandler = () => {
    dispatch({ type: MODIFY_TASK, payload: items });
  };

  return (
    <Container className="bg-gredient">
      <SubContainer>
        <InputContainer onSubmit={submitHandler}>
          {!openField ? (
            <>
              <AddTask onClick={() => setOpenField(true)}>
                <AddIcon className="add-icon" />
                Add Task
              </AddTask>
              <StarWrapper
                stared={filterStared !== null && "#147296"}
                onClick={showStaredHandler}
              >
                <StarIcon />
              </StarWrapper>
            </>
          ) : (
            <>
              <CancelBtn onClick={() => setOpenField(false)}>
                <CloseIcon />
              </CancelBtn>
              <InputField
                placeholder="Add A Task"
                autoFocus
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <CreateBtn type="submit">Create</CreateBtn>
            </>
          )}
        </InputContainer>
        <TaskContainer>
          {items
            ?.slice(0)
            .reverse()
            .filter((item) => item?.star !== filterStared)
            .map((item) => (
              <span key={item?.id}>
                <Task item={item} starHandler={starHandler} />
              </span>
            ))}
        </TaskContainer>
      </SubContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { data: state.user };
};
export default connect(mapStateToProps, { addTask })(App);
