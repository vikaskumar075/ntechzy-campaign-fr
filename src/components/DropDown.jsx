import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { data } from "../data"; // Import your data array
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SelectAutoWidth() {
  const [mainSelection, setMainSelection] = useState("");
  const [medium, setMedium] = useState("");
  const [platform, setPlatform] = useState("");
  const [ulink, setULink] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [linkVisible, setLinkVisible] = useState(false); // State to control link visibility
  const [MobileNumber, setMobileNumber] = useState("");
  const [collgVal, setCollgVal] = useState("");
  const [password, setPassword] = useState("");
  let ugeneratedLink = "";

  const navigate = useNavigate();


  const ntechzy_url = process.env.REACT_APP_NTECHZY


  const handleLoginClick = () => {
    navigate("/login") // '/login' with your actual login page route
  };


  function jumbleStrings(str1, str2) {
    const combinedStr = str1 + str2;
    const jumbledArr = combinedStr.split("");

    for (let i = jumbledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [jumbledArr[i], jumbledArr[j]] = [jumbledArr[j], jumbledArr[i]];
    }

    return jumbledArr.join("");
  }

  const meradiv = window.document.getElementById("guardianName");
  console.log(meradiv, "mera hi rahega");

  const handleMainSelectionChange = (e) => {
    setMainSelection(e.target.value);
    // Reset other fields when main selection changes
    setMedium("");
    setPlatform("");
    // setChannelName("");
    setName("");
    setLink("");
    setLinkVisible(false);
  };

  const handleMediumChange = (e) => {
    setMedium(e.target.value);
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  // const handleChannelNameChange = (e) => {
  //   setChannelName(e.target.value);
  // };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  // const passjumb = jumbleStrings(name, MobileNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const sanitizedName = name.replace(/ /g, "_");
    const sanitizedMedium = medium.replace(/ /g, "_");
    // jumbleStrings()
    const passjumb = jumbleStrings(name, MobileNumber);
    setPassword(passjumb);

    try {
      let campaignId = 0;

      if (mainSelection === "campaign") {
        // const response = await axios.post("https://ntechzy-campaign-bk.vercel.app/api/save-medium", {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/save-medium`,
          {
            medium: sanitizedMedium,
            platform,
          }
        );

        campaignId = response.data.platformCount;
        // console.log("campaignId:", campaignId);
      } else if(mainSelection === "college"){
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/save-remain`,
          {
            username: collgVal,
            MobileNumber,
            whoIAm: mainSelection,
          }
        );
        
        if (response.data.success) {
          toast.success(response.data.message);
          // console.log(response.data.message);
          setLinkVisible(true); // Show link only if data was successfully saved
        } else {
          toast.error(response.data.message);
          setLinkVisible(false); // Hide link if there was an error
          return;
        }
      }
      else {
        // const response = await axios.post("https://ntechzy-campaign-bk.vercel.app/api/save-remain", {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/save-remain`,
            {
              username: sanitizedName,
              MobileNumber,
              whoIAm: mainSelection,
            }
          );
          
          if (response.data.success) {
            toast.success(response.data.message);
            // console.log(response.data.message);
            setLinkVisible(true); // Show link only if data was successfully saved
          } else {
          toast.error(response.data.message);
          setLinkVisible(false); // Hide link if there was an error
          return;
        }
      }
      
      // Generate link based on the inputs
      let generatedLink = "";
      
      const selectedMedium = data.find((item) => item.name === medium);
      
      if (mainSelection === "campaign") {
        setLinkVisible(true);
        console.log(`Platform: ${platform}`);
        switch (platform) {
          case "youtube":
            generatedLink = `${ntechzy_url}/?utm_source=yt_${
              selectedMedium ? selectedMedium.clg : ""
            }&campaign_id=${campaignId}`;
            break;
            case "instagram":
              generatedLink = `${ntechzy_url}/?utm_source=ig_${
                selectedMedium ? selectedMedium.clg : ""
              }&campaign_id=${campaignId}`;
              break;
              case "facebook":
                generatedLink = `${ntechzy_url}/?utm_source=fb_${
              selectedMedium ? selectedMedium.clg : ""
            }&campaign_id=${campaignId}`;
            break;
            case "googleads":
            generatedLink = `${ntechzy_url}/?utm_source=ga_${
              selectedMedium ? selectedMedium.clg : ""
            }&campaign_id=${campaignId}`;
            break;
          default:
            generatedLink = `${ntechzy_url}/?utm_source=${
              selectedMedium ? selectedMedium.clg : ""
            }&campaign_id=${campaignId}`;
        }
      } else if (
        ["faculty", "student", "agent", "offline", "influencer"].includes(
          mainSelection
        )
      ) {
        var sourceAbbreviation = mainSelection.slice(0, 3).toLowerCase();
        ugeneratedLink = `${ntechzy_url}/?u_name=${sourceAbbreviation}_${sanitizedName}_${MobileNumber}&u_pass=${passjumb}`;
        // console.log(ugeneratedLink);
        // generatedLink = `${ntechzy_url}/?utm_source=${sourceAbbreviation}_${sanitizedName}&campaign_id=${sourceAbbreviation}_${sanitizedName}`;
        generatedLink = `${ntechzy_url}/?utm_source=${sourceAbbreviation}_${sanitizedName}&campaign_id=${sourceAbbreviation}_${sanitizedName}`;
      } else if(mainSelection === "college"){
        var sourceAbbreviation = mainSelection.slice(0, 3).toLowerCase();
        ugeneratedLink = `${ntechzy_url}/?u_name=${sourceAbbreviation}_${collgVal}_${MobileNumber}&u_pass=${passjumb}`;
        generatedLink = `${ntechzy_url}/?utm_source=${sourceAbbreviation}_${collgVal}&campaign_id=${sourceAbbreviation}_${collgVal}`; 
      }
      else {
        generatedLink = `${ntechzy_url}/?utm_source=${mainSelection}&campaign_id=0`;
      }

      // Open a popup window with a specified URL
      window.open(ugeneratedLink, "Popup Window", "width=400,height=200");
      setLink(generatedLink); // Set the generated link in the state
      setULink(ugeneratedLink);
    } catch (error) {
      console.error("Error fetching campaign ID:", error.message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
  };

  useEffect(() =>{
    console.log(mainSelection, collgVal)
  }, [mainSelection, collgVal])

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
        boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
    >
      <ToastContainer /> {/* ToastContainer for displaying notifications */}
      <FormControl sx={{ m: 1, minWidth: 300, width: "80%" }}>
        <InputLabel id="main-select-label">Select Option</InputLabel>
        <Select
          labelId="main-select-label"
          id="main-select"
          value={mainSelection}
          onChange={handleMainSelectionChange}
          label="Select Option"
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          <MenuItem value="campaign">Campaign</MenuItem>
          <MenuItem value="offline">Offline</MenuItem>
          <MenuItem value="influencer">Influencer</MenuItem>
          <MenuItem value="faculty">Faculty</MenuItem>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="agent">Consultant</MenuItem>
          <MenuItem value="college">College</MenuItem>
        </Select>
      </FormControl>
      {mainSelection === "campaign" && (
        <>
          <FormControl sx={{ m: 1, minWidth: 300, width: "80%" }}>
            <InputLabel id="medium-select-label">Medium</InputLabel>
            <Select
              labelId="medium-select-label"
              id="medium-select"
              value={medium}
              onChange={handleMediumChange}
              label="Medium"
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              {data.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 300, width: "80%" }}>
            <InputLabel id="platform-select-label">Platform</InputLabel>
            <Select
              labelId="platform-select-label"
              id="platform-select"
              value={platform}
              onChange={handlePlatformChange}
              label="Platform"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="instagram">Instagram/Facebook</MenuItem>
              <MenuItem value="youtube">YouTube</MenuItem>
              {/* <MenuItem value="facebook">Facebook</MenuItem> */}
              <MenuItem value="googleads">Google Ads</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
      {(mainSelection === "influencer" ||
        mainSelection === "faculty" ||
        mainSelection === "student" ||
        mainSelection === "agent" ||
        mainSelection === "offline") && (
        <TextField
          sx={{ m: 1, minWidth: 300, width: "80%" }}
          id="channel-name-input"
          label={mainSelection === "influencer" ? "Channel Name" : "Name"}
          value={name}
          onChange={handleNameChange}
        />
      )}
      {(mainSelection === "influencer" ||
        mainSelection === "faculty" ||
        mainSelection === "student" ||
        mainSelection === "agent" ||
        mainSelection === "offline") && (
        <TextField
          sx={{ m: 1, minWidth: 300, width: "80%" }}
          id="channel-name-input"
          label={"Phone Number"}
          value={MobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      )}
      {mainSelection === "college" && (
        <>
        <FormControl sx={{ m: 1, minWidth: 300, width: "80%" }}>
          <InputLabel id="medium-select-label">College Name</InputLabel>
          <Select
            labelId="medium-select-label"
            id="medium-select"
            value={collgVal}
            onChange={(e) => setCollgVal(e.target.value)}
            label="College Name"
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {data.map((item) => (
              <MenuItem key={item.name} value={item.clg}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
        sx={{ m: 1, minWidth: 300, width: "80%" }}
        id="channel-name-input"
        label={"Phone Number"}
        value={MobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        />
        </>
      )}
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
      {console.log(ulink, "yahi hai")}
      {linkVisible && (
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            width: "80%",
          }}
        >
          <Typography
            variant="body1"
            sx={{ flexGrow: 1, overflowWrap: "break-word" }}
          >
            {console.log(link)}
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </Typography>
          <IconButton onClick={handleCopyLink}>
            <ContentCopyIcon />
          </IconButton>
        </Paper>
      )}
      {ulink && (
        <div>
          <h3>
            Login to <code>ntechzy.in/login</code>
          </h3>
          <code>id: {MobileNumber}</code>
          <br />
          <code>passwd : {password}</code>
        </div>
      )}
      {/* Login Button */}
      <IconButton
        sx={{ position: "absolute", top: 10, right: 10 ,border:2, borderRadius: 1 }}
        onClick={handleLoginClick}
        color="primary"
        aria-label="login"
      >
        Login For Reception
      </IconButton>
    </Box>
    
  );
}
