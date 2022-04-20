import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { connect } from "react-redux";
import { addTask } from "./actions";
import { moment } from "./moment";

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

const Task = styled.div`
  color: white;
  padding: 20px 15px;
  border-radius: 3px;
  background-color: #292929;
  margin-top: 15px;
`;

const TaskTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`;

const TaskTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const TaskStar = styled.div`
  color: ${(props) => props.stared || "#545454"};
`;

const TaskTimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #b5b5b5;
`;

const CreateTime = styled.div``;

const UpdateTime = styled.div``;

function App({ data, addTask }) {
  const [openField, setOpenField] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (taskInput === "") {
      window.alert("Input cannot be empty");
    } else {
      var time = new Date();
      var newTime = moment(time);
      addTask({
        title: taskInput,
        star: false,
        createdAt: newTime,
        updatedAt: newTime,
      });
      setTaskInput("")
      setOpenField(false)
    }
  };

  return (
    <Container className="bg-gredient">
      <SubContainer>
        <InputContainer onSubmit={submitHandler}>
          {!openField ? (
            <AddTask onClick={() => setOpenField(true)}>
              <AddIcon className="add-icon" />
              Add Task
            </AddTask>
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
          {data?.slice(0).reverse().map((item, index) => (
            <Task key={index}>
              <TaskTitleWrapper>
                <TaskTitle>{item?.title}</TaskTitle>
                <TaskStar stared={item?.star && "#147296"}>
                  <StarIcon />
                </TaskStar>
              </TaskTitleWrapper>
              <TaskTimeWrapper>
                <CreateTime>{item?.createdAt}</CreateTime>
                <UpdateTime>{item?.updatedAt}</UpdateTime>
              </TaskTimeWrapper>
            </Task>
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
