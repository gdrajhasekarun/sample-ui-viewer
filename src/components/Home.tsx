import {Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";


const Home: React.FC = () => {
    return (
        <>
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center", // Center both horizontally and vertically
                paddingTop: "2%"
            }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Ensure responsive behavior
                        gap: 3,
                        width: "70%", // Adjust width to properly center the content
                        maxWidth: "700px", // Limit max width for better alignment
                    }}
                >
                    <Card>
                        <CardActionArea
                            component={Link}
                            to="/testcases" // Add your route path here
                            sx={{
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{ height: '100%' }}>
                                <Typography variant="h5" component="div">
                                    Test Case Mapper
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Test case mapper is a tool that maps the test cases steps to SAFT framework custom methods.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card>
                        <CardActionArea
                            component={Link}
                            to="/testcases-ai" // Add your route path here
                            sx={{
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{ height: '100%' }}>
                                <Typography variant="h5" component="div">
                                    AI Test Case Mapper
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    AI Test case mapper is a tool that maps the test cases steps to SAFT framework custom methods.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>
        </>
    )
}

export default Home;