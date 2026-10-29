const { spawn } = require("child_process");
const path = require("path");

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const processes = [
  spawn(npm, ["--workspace", "client", "start"], { stdio: "inherit", env: { ...process.env, PORT: "3000", BROWSER: "none" }, cwd: path.resolve(__dirname, "..") }),
  spawn(npm, ["--workspace", "server", "start"], { stdio: "inherit", env: { ...process.env, SERVER_PORT: "5000" }, cwd: path.resolve(__dirname, "..") }),
];

function stopAll() {
  processes.forEach((child) => {
    if (!child.killed) child.kill("SIGTERM");
  });
}

process.on("SIGINT", stopAll);
process.on("SIGTERM", stopAll);
processes.forEach((child) => {
  child.on("error", (error) => {
    console.error("Could not start development process:", error);
    process.exitCode = 1;
    stopAll();
  });
  child.on("exit", (code) => {
    if (code && code !== 0) process.exitCode = code;
    stopAll();
  });
});
