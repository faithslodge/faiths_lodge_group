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


    return (
        <Box sx={{ width: "70%", m: "auto" }}>
            <>
                <br />
                <center>
                    <Typography variant="h4" mb={5}>Organization Details</Typography>
                </center>
                
                {ORG_KEY_NAMES.map((item, i) => {
                        const path = item.keyName;
                        if (!item.checkBox) {
                            return (
                                <Box sx={{width: 150, marginBottom: 5}}>
                                    
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
                                                size="small"
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
                                </Box>
                            );
                        }
                    })}
                
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
