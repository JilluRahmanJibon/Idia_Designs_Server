"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const server = (0, http_1.createServer)(app_1.default);
async function main() {
    try {
        // connect to MongoDB
        await mongoose_1.default.connect(config_1.default.database_url);
        // Start the HTTP server
        server.listen(config_1.default.port, () => {
            console.log(`Idia_Designs Server is running on port:${config_1.default.port} `);
        });
    }
    catch (err) {
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
