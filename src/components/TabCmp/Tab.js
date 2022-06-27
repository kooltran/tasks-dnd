import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { styled } from "@mui/material/styles";

import Logo from "../../assets/images/logo.png";
import ProjectPannel from "../TabPannel/ProjectPannel/ProjectPannel";

import "./Tab.scss";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  borderRight: 0,
  "&.Mui-selected": {
    color: "#a29dfc",
  },
  "@media (max-width:1200px)": {
    padding: 0,
    maxWidth: "0",
    minWidth: "60px",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function VerticalTabs() {
  const [value, setValue] = React.useState(4);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      <div className="tab-side">
        <div className="tab-logo">
          <span className="icon">
            <img src={Logo} alt="logo" />
          </span>
          <span className="text">
            work
            <strong>puls</strong>
          </span>
        </div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 0, borderColor: "divider" }}
          TabIndicatorProps={{ style: { background: "transparent" } }}
        >
          <StyledTab
            label={
              <div className="tab-side__item">
                <NewspaperOutlinedIcon className="icon" />
                <span className="text">Dashboard</span>
              </div>
            }
            sx={{ alignItems: "flex-start", paddingLeft: "20px" }}
            {...a11yProps(0)}
          />
          <StyledTab
            label={
              <div className="tab-side__item">
                <AvTimerOutlinedIcon className="icon" />
                <span className="text">Real-Time Tracking</span>
              </div>
            }
            sx={{ alignItems: "flex-start", paddingLeft: "20px" }}
            {...a11yProps(1)}
          />
          <StyledTab
            label={
              <div className="tab-side__item">
                <PhotoSizeSelectActualOutlinedIcon className="icon" />
                <span className="text">Screenshots</span>
              </div>
            }
            sx={{ alignItems: "flex-start", paddingLeft: "20px" }}
            {...a11yProps(2)}
          />
          <StyledTab
            label={
              <div className="tab-side__item">
                <PeopleAltOutlinedIcon className="icon" />
                <span className="text">Employees</span>
              </div>
            }
            sx={{ alignItems: "flex-start", paddingLeft: "20px" }}
            {...a11yProps(3)}
          />
          <StyledTab
            label={
              <div className="tab-side__item">
                <FolderOutlinedIcon className="icon" />
                <span className="text">Projects Tracking</span>
              </div>
            }
            sx={{ alignItems: "flex-start", paddingLeft: "20px" }}
            {...a11yProps(4)}
          />
          <StyledTab
            label={
              <div className="tab-side__item">
                <NewspaperOutlinedIcon className="icon" />
                <span className="text">Teams</span>
              </div>
            }
            sx={{ alignItems: "flex-start", paddingLeft: "20px" }}
            {...a11yProps(5)}
          />
          <StyledTab
            label={
              <div className="tab-side__item">
                <FeedOutlinedIcon className="icon" />
                <span className="text">Time and Attendance</span>
              </div>
            }
            sx={{ alignItems: "flex-start", paddingLeft: "20px" }}
            {...a11yProps(6)}
          />
          <StyledTab
            label={
              <div className="tab-side__item">
                <LaptopOutlinedIcon className="icon" />
                <span className="text">Apps and Websites</span>
              </div>
            }
            sx={{ alignItems: "flex-start", paddingLeft: "20px" }}
            {...a11yProps(6)}
          />
          <StyledTab
            label={
              <div className="tab-side__item">
                <SettingsOutlinedIcon className="icon" />
                <span className="text">Settings</span>
              </div>
            }
            sx={{ alignItems: "flex-start", paddingLeft: "20px" }}
            {...a11yProps(6)}
          />
        </Tabs>
      </div>

      <TabPanel style={{ width: "100%" }} value={value} index={0}>
        Dashboard
      </TabPanel>
      <TabPanel style={{ width: "100%" }} value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel style={{ width: "100%" }} value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel style={{ width: "100%" }} value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel style={{ width: "100%" }} value={value} index={4}>
        <Box>
          <ProjectPannel />
        </Box>
      </TabPanel>
      <TabPanel style={{ width: "100%" }} value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel style={{ width: "100%" }} value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
