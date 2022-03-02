import "./app.css";
import { useState } from "react";
import axios from "axios";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import CopyableText from "./components/CopyableText";
import { Route, Routes } from "react-router-dom";
import Masonry from "react-masonry-css";
import Heading from "./components/Heading";

const apiKey = "AIzaSyCTtPFwQ5J7LCxe7itX9JqRzyDZyQgGzNQ";

const copyableTexts = [
	"People of Russia. You are being lied to by putins regime. The president of Ukraine is not a nazi, he himself is directly decended from holocaust survivors. Putins army is invading a civilised county, with people who care about each other. Russian soldiers are murdering unarmed civilians and pets, bombing civilian areas. Ukrainians are desperate to defend their home. Everything you are seeing is false, propaganda set up by Putin. He is a mad man. This needs to be stopped. The first wave of soldiers appear on social media to be young, 18-22, your sons who have no clue why they are in Ukraine. Putin does not care about Russian people , I have seen the Russian army has transportable crematories. Those that are killed in action invading another country haven’t even been given the option to be sent to their families. What is happening is terrible and this is the reasons for sanctions against your country. I know there isn’t anything civilians of Russia can do, as the world has seen protests and that people are getting arrested. Keep at it, the world is with you. We don’t blame Russia , we blame the cruel regime of Putin. It needs to be stopped I’m sorry I have reached out in this way, as this is a review site. But there are limited ways in which you can escape the lies. I have left a 5 star review so your business isn’t affected. I’m am sorry for what your leader is doing to your country , and you are in my hearts. Glory to Ukraine",
	" Great food served in a friendly environment. I want to have lunch here soon. But first, we have to do something necessary. Citizens of Russia, you were told a lie. Your young soldiers were sent to Ukraine to commit aggression, not to save the world. They bombed hospitals and killed innocent women and children. This is not the fault of the Russian people. This is the fault of Vladimir Putin and his criminal group. He destroyed Russia and now wants to destroy the world. Dear Russians, for the benefit of mankind, you must stop this madness.",
	"Your government is lying to you. They are not protecting or denazifying Ukraine. Your army invaded it, occupying it and they have been killing innocent civilians since the beginning. You are only watching Russian propaganda and all your western media are blocked for a reason. Stand up against your dictator and stop the war. ",
	"citizens of russia, we implore you from the west to understand that your media has been compromised and censored. Please, we beg you, understand that Ukraine did not start this war. your president ordered the troops to invade; he committed war crimes, children and families died. we did not provoke this war. your soldiers were sent here to die unprepared. your young people suffer needlessly. nobody wants more. we want one peaceful world. ",
];

function apiDomain() {
	const production = process.env.NODE_ENV === "production";
	return production
		? "https://misinformation-review.herokuapp.com"
		: "http://localhost:4000";
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/review" element={<Review />} />
		</Routes>
	);
}

function Main() {
	return (
		<Container>
			<Heading />

			<Paper
				elevation={3}
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 3,
					p: 5,
					mt: 5,
				}}
			>
				<Typography>
					The purpose of this website is to make it easy to leave fake
					Google reviews for Russian restaurants in order to inform
					the country's citizens on what is actually going on in
					Ukraine.
				</Typography>
				<Typography>
					The point is to push information to the Russian civilian
					population being lied to by Putin, bypassing the censorship
					that may be present in Russian news coverage of the ongoing
					war.
				</Typography>

				<Typography>
					Go the the next page. Click 'GET NEW PLACE' to find a random
					Russian restaurant. Then click 'WRITE A REVIEW' and enter
					your review.
				</Typography>

				<Typography>
					Do not leave any personal information and consider varying
					the text templates provided as otherwise they can easily be
					filtered automatically.
				</Typography>

				<Typography>
					Make sure to leave 5 star reviews so you don't hurt innocent
					people's businesses. Showing your support will mean people
					are more likely to listen to you.
				</Typography>

				<Typography sx={{ fontWeight: "bold" }}>
					Save Ukraine
				</Typography>
				<Typography>
					Inspired by <a href="https://bit.ly/3C3nxYx">this tweet</a>{" "}
					from 'Anonymous'
				</Typography>
				<Button
					variant="contained"
					onClick={() => (window.location = `/review`)}
				>
					Start reviewing and make a difference
				</Button>
			</Paper>
		</Container>
	);
}

function Review() {
	const [place, setPlace] = useState("ChIJ6zAdFaY2tUYRqcGFiqj9vsM");

	async function getPlace() {
		try {
			const response = await axios.get(`${apiDomain()}/data`);
			setPlace(response.data);
		} catch (e) {
			console.log(e);
		}
	}

	function goToLocation() {
		window.location = `http://search.google.com/local/writereview?placeid=${place}`;
	}

	const breakpointsForCols = {
		default: 2,
		750: 1,
	};

	return (
		<Container>
			<Heading />

			<Paper sx={{ height: 600, m: 3 }} elevation={10}>
				<iframe
					width="100%"
					height="100%"
					title="maps"
					loading="lazy"
					style={{ border: "none" }}
					allowFullScreen
					src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${place}`}
				/>
			</Paper>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-evenly",
					m: 4,
					gap: 2,
					flexWrap: "wrap",
				}}
				p={4}
			>
				<Button
					variant="contained"
					onClick={getPlace}
					sx={{ minWidth: "14rem" }}
				>
					Get new place
				</Button>
				<Button
					variant="contained"
					onClick={goToLocation}
					sx={{ minWidth: "14rem" }}
				>
					Write a review
				</Button>
				<Button
					variant="contained"
					onClick={() => (window.location = "../")}
					sx={{ minWidth: "14rem" }}
				>
					About this website
				</Button>
			</Box>

			<Typography align="center" variant="h3">
				Text templates
			</Typography>
			<Typography align="center" sx={{ mb: 4 }}>
				Some sample reviews to copy and paste
			</Typography>
			<Masonry
				breakpointCols={breakpointsForCols}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{copyableTexts.map((text) => (
					<CopyableText key={text} text={text} />
				))}
			</Masonry>

			{/* Possible stuff to add later */}
			{/* 
			<Typography align="center" variant="h3">
				Useful links
			</Typography>
			<Typography align="center" sx={{ mb: 4 }}>
				Useful links to attach to the end of your messages for Russians
				to see
			</Typography>

			<Typography>
				Zelensky's speech to Russia{" "}
				<Link href="https://www.youtube.com/watch?t=158&v=p-zilnPtZ2M&feature=youtu.be">
					https://www.youtube.com/watch?t=158&v=p-zilnPtZ2M&feature=youtu.be
				</Link>
			</Typography> */}
		</Container>
	);
}

export default App;
