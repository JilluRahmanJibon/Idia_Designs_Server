import { createServer } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

const server = createServer(app);

async function main() {
	try {
		// connect to MongoDB
		await mongoose.connect(config.database_url as string);

		// Start the HTTP server
		server.listen(config.port, () => {
			console.log(`Idia_Designs Server is running on port:${config.port} `);
		});
	} catch (err) {
		console.log(err);
	}
}

main();

// Handle unexpected errors
process.on("unhandledRejection", err => {
	console.error(`UnhandledRejection:`, err);
	server.close(() => process.exit(1));
});

process.on("uncaughtException", () => {
	console.error(`UncaughtException`);
	process.exit(1);
});
