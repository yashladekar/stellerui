import { Command } from "commander";


export function init(){
    const program = new Command();
    program
        .command("init")
        .description("Initialize a new project")
        .option("-n, --name <name>", "Project name")
        .option("-d, --directory <directory>", "Project directory")
        .action((options) => {
            console.log("Initializing project with options:", options);
        });

    return program;
}