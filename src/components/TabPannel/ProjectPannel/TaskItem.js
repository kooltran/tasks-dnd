import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Avatar } from "@mui/material";

const TaskItem = ({ task }) => {
  return (
    <div className="task-item">
      <div className="header">
        <strong className="title">{task.title}</strong>
        <MoreHorizIcon className="more" />
      </div>
      <div className="content">
        <span className="assignees">
          {/* {task.assignee.map((item) => (
            <Avatar
              key={item}
              sx={{
                width: "30px",
                height: "30px",
                marginRight: "3px",
              }}
            />
          ))} */}
          <Avatar
            sx={{
              width: "30px",
              height: "30px",
              marginRight: "3px",
            }}
          />
          {/* {task.assignee.length > 3 && (
            <span className="more">{task.assignee.length - 2}</span>
          )} */}
        </span>
        <span className="time">
          <AccessTimeIcon sx={{ color: "#ccc" }} />
          {task.time} h
        </span>
        {task.priority === "minor" && (
          <span className="priority minor">
            <KeyboardArrowUpIcon />
          </span>
        )}
        {task.priority === "critical" && (
          <span className="priority critical">
            <KeyboardDoubleArrowUpIcon />
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
