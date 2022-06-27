import React, { useRef, useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import { useWindowResize } from "../../../useWindowResize";
import { useAppContext } from "../../../AppContext";
import { getTasks } from "../../../api/taskAPI";
import {
  getTaskRequest,
  getTaskSuccess,
  getTaskFail,
  addNewTask,
} from "../../../actions/taskAction";
import TaskItem from "./TaskItem";

import "./ProjectPannel.scss";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: "0 1px 6px 0 rgba(32, 33, 36, 0.28)",
  p: "20px 30px 30px",
  ".title": {
    fontSize: "24px",
    textAlign: "center",
    margin: 0,
    marginBottom: "15px",
    fontWeight: 600,
  },
};

const Schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  assignee: yup.string().required("Assignee is required"),
  time: yup.string().required("Time is required"),
  priority: yup.string().required("Priority is required"),
});

const breadcrumbs = [
  <div key="proj">Project</div>,
  <div key="design">Design system</div>,
];

const ProjectPannel = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));

  const upperBoxRef = useRef();
  const projectPannelRef = useRef();
  const [upperBoxHeight, setUpperBoxHeight] = useState(0);
  const [projectPannelHeight, setProjectPannelHeight] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const { width } = useWindowResize();

  const {
    data: { task },
    dispatch,
  } = useAppContext();

  const columnsTasks = {
    [uuidv4()]: {
      name: "To do",
      items: savedTasks || task?.data,
    },
    [uuidv4()]: {
      name: "On hold",
      items: [],
    },
    [uuidv4()]: {
      name: "Inprogress",
      items: [],
    },
    [uuidv4()]: {
      name: "Done",
      items: [],
    },
  };

  const [columns, setColumns] = useState(columnsTasks);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    if (upperBoxRef?.current?.clientHeight) {
      setUpperBoxHeight(upperBoxRef.current.clientHeight);
    }

    if (projectPannelRef?.current?.clientHeight) {
      setProjectPannelHeight(projectPannelRef.current.clientHeight);
    }

    if (!savedTasks) {
      handleGetTasks();
    }
  }, [width]);

  useEffect(() => {
    setColumns(columnsTasks);
  }, [task]);

  const handleGetTasks = async () => {
    dispatch(getTaskRequest());
    try {
      const taskRes = await getTasks();
      dispatch(getTaskSuccess(taskRes));
      localStorage.setItem("tasks", JSON.stringify(taskRes));
    } catch (error) {
      dispatch(getTaskFail(error));
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddTask = (values) => {
    const updatedData = [
      ...(savedTasks || task?.data),
      { ...values, id: uuidv4() },
    ];
    dispatch(addNewTask(updatedData));
    localStorage.setItem("tasks", JSON.stringify(updatedData));
    setOpenModal(false);
  };

  return (
    <div ref={projectPannelRef} className="project-pannel">
      <Box ref={upperBoxRef} sx={{ marginBottom: "40px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <div className="project-pannel__header">
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </div>
            <div className="project-pannel__title">
              <h3>Design system</h3>
              <span className="edit">Edit</span>
            </div>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <div className="project-pannel__notification">
              <NotificationsNoneIcon />
            </div>
            <div className="project-pannel__calendar">
              <CalendarMonthIcon />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "12px",
                  alignItems: "flex-start",
                  marginLeft: "5px",
                }}
              >
                <strong>Total time</strong>
                <span>Calendar is not available</span>
              </Box>
            </div>
          </Box>
        </Box>
        <div className="project-pannel__desc">
          <div className="item active">
            <FlashOnOutlinedIcon />
            Active Project
          </div>
          <div className="item">
            <PersonOutlineOutlinedIcon />
            <strong>4</strong> Assignee
          </div>
          <div className="item">
            <AccountBalanceWalletOutlinedIcon />
            Budget: <strong>32 hours</strong>
          </div>
        </div>
        <div className="project-pannel__status">
          <div className="project-pannel__status--item">
            <div className="title">
              <span>Total time on project</span>
              <WorkOutlineOutlinedIcon />
            </div>
            <div className="desc">
              03:39 <sup>h</sup>
            </div>
          </div>
          <div className="project-pannel__status--item">
            <div className="title">
              <span>Earning</span>
              <LocalAtmOutlinedIcon />
            </div>
            <div className="desc">
              <sup>$</sup> 2.409,20
            </div>
          </div>
          <div className="project-pannel__status--item">
            <div className="title">
              <span>Costs</span>
              <AccountBalanceWalletOutlinedIcon />
            </div>
            <div className="desc">
              <sup>h</sup> 1.260,14
            </div>
          </div>
          <div className="project-pannel__status--item active">
            <div className="title">
              <span>Productivity</span>
              <ShowChartOutlinedIcon />
            </div>
            <div className="desc">
              93.57
              <sub>
                <ArrowDropUpIcon />
                2.37%
              </sub>
            </div>
          </div>
        </div>
      </Box>
      <Box
        sx={{
          height: projectPannelHeight - (upperBoxHeight + 20),
          minWidth: "100%",
          maxWidth: "1px",
          overflow: "hidden",
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            p: 2,
            border: "1px solid #ddd",
            borderTopRightRadius: "4px",
            borderTopLeftRadius: "4px",
            textAlign: "left",
            minWidth: "calc(800px - 16px)",
          }}
        >
          <Typography variant="span" sx={{ marginRight: "20px" }}>
            Tasks
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: "#a29dfc",
              borderColor: "#a29dfc",
              fontWeight: "bold",
            }}
            onClick={handleOpenModal}
          >
            Add Task
          </Button>
        </Box>
        <Box
          className="project-pannel__task"
          sx={{
            p: 1,
            border: "1px solid #ddd",
            borderTop: "0",
            borderBottomRightRadius: "4px",
            borderBottomLeftRadius: "4px",
            textAlign: "left",
            height: projectPannelHeight - (upperBoxHeight + 40) - 70,
            minWidth: "800px",
          }}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns)?.map(([columnId, columTask], index) => {
              return (
                <Box
                  className="project-pannel__task--session"
                  sx={{ background: "#f3f5f7", overflowY: "auto" }}
                  key={columnId}
                >
                  <div className="title">{columTask.name}</div>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "transparent",
                            padding: 4,
                            overflowY: "auto",
                          }}
                        >
                          {columTask?.items?.map((task, idx) => {
                            return (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={idx}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <TaskItem key={task.id} task={task} />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </Box>
              );
            })}
          </DragDropContext>
        </Box>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <p className="title">Add new task</p>
          <Formik
            initialValues={{ title: "", assignee: "", time: "", priority: "" }}
            validationSchema={Schema}
            onSubmit={handleAddTask}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form className="add-task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    name="title"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="assignee">Assignee</label>
                  <Select
                    displayEmpty
                    labelId="assignee-select-label"
                    id="assignee-select"
                    name="assignee"
                    onChange={handleChange}
                    renderValue={(selected) =>
                      !selected ? (
                        <Typography sx={{ color: "#ddd", fontStyle: "italic" }}>
                          Place holder
                        </Typography>
                      ) : (
                        <Typography sx={{ textTransform: "capitalize" }}>
                          {selected}
                        </Typography>
                      )
                    }
                    value={values.assignee}
                    sx={{ width: "100%", height: "34px" }}
                  >
                    <MenuItem disabled value="">
                      <em>Placeholder</em>
                    </MenuItem>
                    <MenuItem value="kelvin">Kelvin</MenuItem>
                    <MenuItem value="paulo">Paulo</MenuItem>
                    <MenuItem value="john">John</MenuItem>
                    <MenuItem value="doe">Doe</MenuItem>
                  </Select>
                  <ErrorMessage
                    name="assignee"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <Field
                    type="text"
                    name="time"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.time}
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <Select
                    displayEmpty
                    labelId="priority-select-label"
                    id="priority-select"
                    name="priority"
                    value={values.priority}
                    onChange={handleChange}
                    renderValue={(selected) =>
                      !selected ? (
                        <Typography sx={{ color: "#ddd", fontStyle: "italic" }}>
                          Place holder
                        </Typography>
                      ) : (
                        <Typography sx={{ textTransform: "capitalize" }}>
                          {selected}
                        </Typography>
                      )
                    }
                    sx={{ width: "100%", height: "34px" }}
                  >
                    <MenuItem value="minor">Minor</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                  </Select>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <Button className="btn-add" variant="outlined" type="submit">
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectPannel;
