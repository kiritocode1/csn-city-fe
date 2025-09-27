import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Chhatrapati Sambhajinagar City Police - Official Website";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#FFF0E1",
					backgroundImage: "linear-gradient(180deg, #FFF0E1 0%, #FFE1C3 100%)",
					fontFamily: "system-ui, -apple-system, sans-serif",
					position: "relative",
				}}
			>
				{/* Background Pattern */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background:
							"radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
					}}
				/>

				{/* Main Content Container */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						maxWidth: "1200px",
						padding: "60px",
						textAlign: "center",
					}}
				>
					{/* Maharashtra Police Emblem */}
					<div
						style={{
							width: "200px",
							height: "200px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginBottom: "40px",

							position: "relative",
						}}
					>
						<img
							src={`${process.env.NODE_ENV === "production" ? "https://csmpolice.vercel.app" : "http://localhost:3000"}/national-emblem/MaharashtraPolice.png`}
							alt="Maharashtra Police Emblem"
							width="200"
							height="200"
							style={{

								objectFit: "cover",
							}}
						/>
					</div>

					{/* Title */}
					<div
						style={{
							fontSize: "64px",
							fontWeight: "bold",
							color: "#964B00",
							marginBottom: "20px",
							lineHeight: "1.1",
							textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
						}}
					>
						Chhatrapati Sambhajinagar City Police
					</div>

					{/* Subtitle */}
					<div
						style={{
							fontSize: "28px",
							color: "#8B4513",
							marginBottom: "30px",
							fontWeight: "500",
							opacity: 0.9,
						}}
					>
						Official Website - Police Department
					</div>

					{/* Decorative line */}
					<div
						style={{
							width: "200px",
							height: "4px",
							backgroundColor: "#964B00",
							borderRadius: "2px",
							marginBottom: "20px",
						}}
					/>

					{/* Bottom text */}
					<div
						style={{
							fontSize: "20px",
							color: "#8B4513",
							fontWeight: "400",
							opacity: 0.8,
						}}
					>
						Official Website • Government of Maharashtra
					</div>
				</div>


			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}
