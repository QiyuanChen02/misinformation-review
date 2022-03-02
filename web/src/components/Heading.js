import { Typography } from "@mui/material";
import React from "react";

const Heading = () => {
	return (
		<>
			<Typography
				align="center"
				component="h1"
				variant="h2"
				sx={{ mt: 5 }}
			>
				Counter Russian Propaganda
			</Typography>
			<Typography align="center" variant="h5" component="h2" gutterBottom>
				Stop the spread of Russian misinformation by leaving a review
			</Typography>
		</>
	);
};

export default Heading;
