import { useState, useRef, useEffect } from "react";
import {
    Box,
    FormControlLabel,
    Checkbox,
    TextField,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUpload from "@mui/icons-material/CloudUpload";
import { AspectRatio } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import ORG_KEY_NAMES from "../../constants/ORG_KEY_NAMES";
import MOCK_DATA from "../../constants/MOCK_DATA";

export default function StepOneOrg() {
    const dispatch = useDispatch();
    const newOrg = useSelector((store) => store.newOrg.org);
    const [logoPreview, setLogoPreview] = useState(undefined);

    useEffect(() => {
        console.log(newOrg)
      }, [newOrg]);
    
    // memory reference for logo data
    const fileInput = useRef(null);

    // custom MUI hidden component
    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    const handleChange = (arg, keyName) => {
        dispatch({ type: "SET_ORG_OBJECT", payload: { [keyName]: arg } });
    };

    const handleLogoOnChange = () => {
        if (fileInput.current.files.length !== 0) {
            setLogoPreview(URL.createObjectURL(fileInput.current.files[0]));
            
            dispatch({
                type: "SET_LOGO_DATA",
                payload: fileInput.current.files[0]
            });
            
        }
    };

    const handleMock = ()=>{
        dispatch({ type: "SET_ORG_OBJECT", payload: MOCK_DATA.org });
        dispatch({ type: "SET_ADDRESS_OBJECT", payload: MOCK_DATA.address });
        dispatch({ type: "SET_NEW_LOSS", payload: MOCK_DATA.lossTypes });
        dispatch({ type: "SET_NEW_SERVICE", payload: MOCK_DATA.serviceTypes });
        dispatch({ type: "SET_NEW_CONTACT", payload: MOCK_DATA.contacts });
    }

    return (
        <Box sx={{ width: "70%", m: "auto" }}>
            <>
                <br />
                <center>
                    <Typography variant="h4" onClick={handleMock} >Organization Details</Typography>
                </center>
                <Grid container spacing={3}>
                    {ORG_KEY_NAMES.map((item, i) => {
                        const path = item.keyName;
                        if (!item.checkBox) {
                            return (
                                <Grid item xs={item.size} key={i}>
                                    {item.keyName !== "logoId" && (
                                        <TextField
                                            variant={item.variant}
                                            required={item.isRequired}
                                            multiline
                                            label={item.text}
                                            rows={item.rows}
                                            value={newOrg?.[path]}
                                            sx={{ width: "100%" }}
                                            InputProps={item.inputProps}
                                            onChange={(event) =>
                                                handleChange(
                                                    event.target.value,
                                                    item.keyName
                                                )
                                            }
                                        />
                                    )}
                                    {item.keyName === "logoId" && (
                                        <>
                                            {/* AspectRatio for setting Img Size/Ratio */}
                                            {/* need to fix for small screens */}
                                            <AspectRatio
                                                ratio="1"
                                                flex
                                                sx={{
                                                    minWidth: { sm: 100 },
                                                }}
                                            >
                                                <img
                                                    alt="Logo Preview"
                                                    src={logoPreview}
                                                />
                                            </AspectRatio>
                                            <Button
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                startIcon={<CloudUpload />}
                                            >
                                                Upload Logo
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    id="file-upload"
                                                    name="logo_to_upload"
                                                    ref={fileInput}
                                                    accept="image/*"
                                                    onChange={
                                                        handleLogoOnChange
                                                    }
                                                />
                                            </Button>
                                        </>
                                    )}
                                </Grid>
                            );
                        }
                    })}
                </Grid>

                <br />
                <br />

                <Grid container spacing={3}>
                    {ORG_KEY_NAMES.map((item, i) => {
                        const path = item.keyName;
                        if (item.checkBox) {
                            return (
                                <Grid item xs={4} key={i}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={newOrg?.[path]}
                                                onChange={(event) =>
                                                    handleChange(
                                                        event.target.checked,
                                                        item.keyName
                                                    )
                                                }
                                            />
                                        }
                                        label={item.text}
                                    />
                                </Grid>
                            );
                        }
                    })}
                </Grid>
            </>
        </Box>
    );
}
