import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

const CopyableText = ({ text }) => {
	const [copied, setCopied] = useState(false);

	function copyToClipboard() {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 10000);
	}

	return (
		<Box>
			<Paper elevation={3} sx={{ p: 3 }}>
				<Typography>{text}</Typography>
				<Button
					sx={{ mt: 3 }}
					variant="outlined"
					onClick={copyToClipboard}
				>
					{copied ? "Copied!" : "Copy"}
				</Button>
			</Paper>
		</Box>
	);
};

export default CopyableText;
