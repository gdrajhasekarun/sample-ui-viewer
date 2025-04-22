import {
    Paper,
    Table,
    TableBody,
    TableCell,
    Input,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    FormControl, InputLabel, Select, MenuItem, SelectChangeEvent
} from "@mui/material";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useEffect} from "react";
import {getTestcase, Step, TestCase, updateTestCase} from "../store/feature/ai-testcase.ts";
import {useParams} from "react-router-dom";


const ViewTestCase: React.FC = () => {
    const {index} = useParams<{ index: string }>(); // Access the dynamic 'index' from the URL
    const dispatch = useDispatch<AppDispatch>();
    const testCase: TestCase | null = useSelector(
        (state: RootState) => state.aiTestcases.testCase || null
    );

    useEffect(() => {
        if (index) {
            dispatch(getTestcase({index: parseInt(index)}));
        }
    }, [dispatch, index]);

    const handleChange = (
        event: SelectChangeEvent<string>,
        index: number,
        field: keyof Step
    ) => {
        console.log(event.target.value)
        const testStep = [...testCase!.steps];
        if (testStep [index]) {
            testStep[index] = {
                ...testStep[index],
                [field]: event.target.value
            };
            dispatch(updateTestCase({
                data: {
                    name: testCase!.name,
                    steps: testStep
                }
            }))
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        field: string
    ) => {
        const testStep = [...testCase!.steps];
        console.log(event.target.value)
        if (testStep [index]) {
            testStep[index] = {
                ...testStep[index],
                [field]: event.target.value
            };
            dispatch(updateTestCase({
                data: {
                    name: testCase!.name,
                    steps: testStep
                }
            }))
        }
    };

    return (
        <>
            <Typography variant="h5" component="div" sx={{
                padding: "2%",
                textAlign: "center"
            }}>
                {testCase != null && testCase.name}
            </Typography>
            {testCase != null && <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Step</TableCell>
                            <TableCell>Expected Result</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Locator</TableCell>
                            <TableCell>DataKey</TableCell>
                            <TableCell>Validation Action</TableCell>
                            <TableCell>Validation Locator</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testCase.steps.map((step, index) => (
                            <TableRow
                                key={index}
                                hover
                                sx={{}}
                                component="tr"
                            >
                                <TableCell component="td" scope="row">
                                    {step.id}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    {step.step}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    {step.expRes}
                                </TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <InputLabel>Action</InputLabel>
                                        <Select
                                            value={step.action || ""}
                                            onChange={(e) => handleChange(e, index, "action")}
                                            label="Action"
                                        >
                                            <MenuItem value="click">Click</MenuItem>
                                            <MenuItem value="enterText">Type</MenuItem>
                                            <MenuItem value="select">Wait</MenuItem>
                                            {/* Add more action items as necessary */}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <InputLabel>Locator</InputLabel>
                                        <Select
                                            value={step.locator || ""}
                                            onChange={(e) => handleChange(e, index, "locator")}
                                            label="Locator"
                                        >
                                            <MenuItem value="xpath">XPath</MenuItem>
                                            <MenuItem value="css">CSS</MenuItem>
                                            {/* Add more locator types as necessary */}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={step.dataKey || ""}
                                        onChange={(e) => handleInputChange(e, index, "dataKey")}
                                        placeholder="Data Key"
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <InputLabel>Validation Action</InputLabel>
                                        <Select
                                            value={step.validationAction || ""}
                                            onChange={(e) => handleChange(e, index, "validationAction")}
                                            label="Validation Action"
                                        >
                                            <MenuItem value="verify">Verify</MenuItem>
                                            <MenuItem value="assert">Assert</MenuItem>
                                            {/* Add more validation actions as necessary */}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <InputLabel>Validation Locator</InputLabel>
                                        <Select
                                            value={step.validationLocator || ""}
                                            onChange={(e) => handleChange(e, index, "validationLocator")}
                                            label="Validation Locator"
                                        >
                                            <MenuItem value="xpath">XPath</MenuItem>
                                            <MenuItem value="css">CSS</MenuItem>
                                            {/* Add more validation locator types as necessary */}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}

export default ViewTestCase;