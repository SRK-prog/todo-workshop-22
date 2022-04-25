import React, { useState } from "react";
import ClickNHold from "react-click-n-hold";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { DELETE_TASK } from "../constants";

const TaskContain = styled.div`
  color: white;
  padding: 20px 15px;
  border-radius: 3px;
  background-color: #292929;
  margin-top: 15px;
  &:active {
    background-color: #242323;
  }
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

const BtnWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: end;
`;

const DeleteBtn = styled.span`
  width: 70px;
  padding: 5px 0;
  margin-right: 15px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  background-color: red;
  transition: all 200ms;
  cursor: pointer;
  &:hover {
    background-color: #870303;
  }
`;

const CloseBtn = styled.span`
  width: 70px;
  padding: 5px 0;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  background-color: #707070;
  transition: all 200ms;
  cursor: pointer;
  &:hover {
    background-color: #4a4a4a;
  }
`;

function Task({ item, starHandler }) {
  const [showButtons, setShowButtons] = useState(false);
  const dispatch = useDispatch();

  return (
    <ClickNHold time={0.7} onClickNHold={() => setShowButtons(true)}>
      <TaskContain>
        <TaskTitleWrapper>
          <TaskTitle>{item?.title}</TaskTitle>
          <TaskStar
            onClick={() => {
              item["star"] = !item?.star;
              starHandler();
            }}
            stared={item?.star && "#147296"}
          >
            <StarIcon />
          </TaskStar>
        </TaskTitleWrapper>
        <TaskTimeWrapper>
          <CreateTime>{item?.createdAt}</CreateTime>
          <UpdateTime>{item?.updatedAt}</UpdateTime>
        </TaskTimeWrapper>
        {showButtons && (
          <BtnWrapper>
            <DeleteBtn
              onClick={() => dispatch({ type: DELETE_TASK, payload: item?.id })}
            >
              Delete
            </DeleteBtn>
            <CloseBtn onClick={() => setShowButtons(false)}>Close</CloseBtn>
          </BtnWrapper>
        )}
      </TaskContain>
    </ClickNHold>
  );
}

export default Task;
