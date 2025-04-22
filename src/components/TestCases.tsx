import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {getAllTestCases, TestCase} from "../store/feature/ai-testcase.ts";
import {useEffect} from "react";


const TestCases: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const testCaseList: TestCase[] = useSelector((state: RootState) => state.aiTestcases.testCases);
    useEffect(() => {
        dispatch(getAllTestCases())
    }, [dispatch]);
    return (
        <>
            <div>
                <Typography variant="h5" component="div" sx={{
                    padding: "2%",
                    textAlign: "center"
                }}>
                    Test Case List
                </Typography>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {testCaseList.map((testCase, index) => (
                            <TableRow
                                key={index}
                                hover
                                sx={{ cursor: "pointer" }}
                                component="tr"
                            >
                                <TableCell component="td" scope="row">
                                    <RouterLink
                                        to={`/testcase/${index}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                            display: "block"
                                        }}
                                    >
                                        {testCase.name}
                                    </RouterLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TestCases;