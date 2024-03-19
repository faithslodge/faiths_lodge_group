import React, { useState } from "react";
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StepOneOrg from "../../components/Steps/StepOneOrg";
import StepTwoAddress from "../../components/Steps/StepTwoAddress";
import StepThreeLosses from "../../components/Steps/StepThreeLosses";
import StepFourServices from "../../components/Steps/StepFourServices";
import StepFiveContacts from "../../components/Steps/StepFiveContacts";
import StepSixReview from "../../components/Steps/StepSixReview";

const steps = [
    "Enter Organization Details",
    "Enter Address",
    "Select Type of Losses",
    "Select Services Provided",
    "Add Contacts",
    "Review",
];

export default function AddOrgPage() {
    const [activeStep, setActiveStep] = useState(0);
    const newContact = useSelector((store) => store.newOrg.newContact);
    const newOrg = useSelector((store) => store.newOrg);
    const logoData = useSelector((store) => store.newLogoReducer);

    const dispatch = useDispatch();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function handleContacts() {
        dispatch({ type: "COMPLETE_CONTACTS", payload: newContact });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    function handleSubmit() {
        console.log("[inside handleSubmit of AddOrgPage] logoData:", logoData);
       
        const organizationDetails = {...newOrg};
        console.log("[inside handleSubmit of AddOrgPage] organizationDetails:", organizationDetails);
        dispatch({
            type: "CREATE_ORGANIZATION",
            payload: {  logoData, organizationDetails },
        });
        dispatch({ type: "SET_NEW_ORG_TO_INITAL" });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleReset = () => {
        setActiveStep(0);
    };

    const buttonView = () => {
        if (activeStep === steps.length - 1) {
            return <Button onClick={handleSubmit} size="large">SUBMIT</Button>;
        }
        if (activeStep === steps.length - 2) {
            return <Button onClick={handleContacts} size="large">NEXT</Button>;
        } else {
            return <Button onClick={handleNext} size="large">NEXT</Button>;
        }
    };

    const stepView = () => {
        switch (activeStep) {
            case 0:
                return <StepOneOrg />;
            case 1:
                return <StepTwoAddress />;
            case 2:
                return <StepThreeLosses />;
            case 3:
                return <StepFourServices />;
            case 4:
                return <StepFiveContacts />;
            case 5:
                return <StepSixReview />;
            default:
                return <h1>default</h1>;
        }
    };

    return (
        <Box
            sx={{
                width: "80%",
                m: "auto",
                minHeight: 700,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Stepper activeStep={activeStep} sx={{py: 5}}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ? (
                <React.Fragment>
                    <center>
                    <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    </center>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {stepView()}

                    <Stack direction="row" pt={2} justifyContent="space-around">
                        <Button
                            color="inherit"
                            size="large"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </Button>

                        {buttonView()}
                    </Stack>
                </React.Fragment>
            )}
        </Box>
    );
}
