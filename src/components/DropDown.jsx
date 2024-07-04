import React, { useEffect, useRef, useState } from "react";
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
  const [MobileNumber,setMobileNumber]=useState("");
  let ugeneratedLink="";

  const iframeRef = useRef(null);

  useEffect(() => {
    // Function to handle iframe load
    const handleIframeLoad = () => {
      // Access the iframe element
      const iframe = document.getElementById('myIframe');
console.log("function me hun mai");
// console.log(iframe, iframe.contentWindow.document.getElementById('guardianName'), "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
      // Check if iframe exists and is loaded
      if (iframe && iframe.contentDocument) {
        // Access the div inside the iframe by id
        // const divInsideIframe = iframe.contentDocument.getElementById('guradianName');
        const divInsideIframe = iframe.contentDocument
        console.log(divInsideIframe, 'aB TO AAJA');

        if (divInsideIframe) {
          // Do something with the div inside the iframe
          console.log(divInsideIframe.textContent,"name of guardkian");
        }
      }
    };

    // Add event listener for iframe load
    const iframeElement = document.getElementById('myIframe');
    console.log(iframeElement, "iframe");
    if (iframeElement && ulink) {

      console.log(iframeElement, ulink, "hmmmm bc");
      
      iframeElement.addEventListener('load', handleIframeLoad);
    }

    // Cleanup: remove event listener
    return () => {
      if (iframeElement) {
        iframeElement.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [ulink]);

  

  function jumbleStrings(str1, str2) {
    const combinedStr = str1 + str2;
    const jumbledArr = combinedStr.split('');
  
    for (let i = jumbledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [jumbledArr[i], jumbledArr[j]] = [jumbledArr[j], jumbledArr[i]];
    }
  
    return jumbledArr.join('');
  }
  
  const meradiv = window.document.getElementById('guardianName')
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

  const handleNameChange = (e,name,MobileNumber) => {
    setName(e.target.value);
  };
  const passjumb=jumbleStrings(name,MobileNumber);
  const handleSubmit = async (e,) => {
    e.preventDefault();


    const iframe = iframeRef.current;

    if (iframe) {
      // Wait for iframe to load
      iframe.onload = () => {
        // Access the contentDocument of the iframe
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        
        // Example: Query input element by id in the iframe
        const inputValue = iframeDocument.getElementById('guardianName').value;
        
        // Use the value retrieved from the iframe
        console.log('Input value from iframe:', inputValue);
      };
    }
  
// console.log(name);
// console.log(MobileNumber);
    // Replace spaces with underscores in inputs
    // const sanitizedChannelName = channelName.replace(/ /g, "_");
    const sanitizedName = name.replace(/ /g, "_");
    const sanitizedMedium = medium.replace(/ /g, "_");
    // jumbleStrings()
    
    try {
      let campaignId = 0;

      if (mainSelection === "campaign") {
        const response = await axios.post("https://ntechzy-campaign-bk.vercel.app/api/save-medium", {
          medium: sanitizedMedium,
          platform,
        });

        campaignId = response.data.platformCount;
        // console.log("campaignId:", campaignId);
      } else {



        const response = await axios.post("https://ntechzy-campaign-bk.vercel.app/api/save-remain", {
          username: sanitizedName,
          whoIAm: mainSelection,
        });

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
        setLinkVisible(true)
        console.log(`Platform: ${platform}`);
        switch (platform) {
          case "youtube":
            generatedLink = `https://ntechzy.in/?utm_source=yt_${selectedMedium ? selectedMedium.clg : ""}&campaign_id=${campaignId}`;
            break;
          case "instagram":
            generatedLink = `https://ntechzy.in/?utm_source=ig_${selectedMedium ? selectedMedium.clg : ""}&campaign_id=${campaignId}`;
            break;
          case "facebook":
            generatedLink = `https://ntechzy.in/?utm_source=fb_${selectedMedium ? selectedMedium.clg : ""}&campaign_id=${campaignId}`;
            break;
          case "googleads":
            generatedLink = `https://ntechzy.in/?utm_source=ga_${selectedMedium ? selectedMedium.clg : ""}&campaign_id=${campaignId}`;
            break;
          default:
            generatedLink = `https://ntechzy.in/?utm_source=${selectedMedium ? selectedMedium.clg : ""}&campaign_id=${campaignId}`;
        }
      }
      else if (["faculty", "student", "agent", "offline","influencer"].includes(mainSelection)) {
        
        var sourceAbbreviation = mainSelection.slice(0, 3).toLowerCase();
        ugeneratedLink = `https://ntechzy.in/?u_name=${sourceAbbreviation}_${sanitizedName}_${MobileNumber}&u_pass=${passjumb}`;
        generatedLink = `https://ntechzy.in/?utm_source=${sourceAbbreviation}_${sanitizedName}&campaign_id=0`;
      } else {
        generatedLink = `https://ntechzy.in/?utm_source=${mainSelection}&campaign_id=0`;
      }
      console.log(jumbleStrings(name,MobileNumber));
    
      
      // console.log("link hai ye ",link);
      // console.log("Generated Link:", generatedLink);
      setLink(generatedLink); // Set the generated link in the state
      setULink(ugeneratedLink);
      // console.log("after set ",link);
      } catch (error) {
      console.error("Error fetching campaign ID:", error.message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
  };

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
          <MenuItem value="agent">Agent</MenuItem>
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
              <MenuItem value="instagram">Instagram</MenuItem>
              <MenuItem value="youtube">YouTube</MenuItem>
              <MenuItem value="facebook">Facebook</MenuItem>
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
          onChange={
           handleNameChange
          }
        />
      )}
      {(
      mainSelection === "influencer" ||
        mainSelection === "faculty" ||
        mainSelection === "student" ||
        mainSelection === "agent" ||
        mainSelection === "offline") && (
        <TextField
          sx={{ m: 1, minWidth: 300, width: "80%" }}
          id="channel-name-input"
          label={"Phone Number"}
          value={MobileNumber}
          onChange={(e)=> setMobileNumber(e.target.value)}
        />
      )}

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
      {console.log(ulink, "yahi hai")}
      {  linkVisible && (
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
            {console.log(ulink)}
          </Typography>
          <IconButton onClick={handleCopyLink}>
            <ContentCopyIcon />
          </IconButton>
        </Paper>
      )}
      {ulink && <div>
        <h3>Login to  <code>ntechzy.in/login</code></h3>
        <code>id: {MobileNumber}</code><br />
        <code>passwd : {passjumb}</code>
        </div>}
<iframe id="myIframe" ref={iframeRef} src={ulink} title="ntech" frameborder="0" style={{marginTop:'50px'}}></iframe> 
    </Box>
  );
}
