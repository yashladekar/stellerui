import { Command } from "commander";

export function user() {
    const program = new Command();
    program
        .command("user")
        .description("show information about the user")
        .option("-u, --user <name>", "user name")
        .option("-p, --password <password>", "user password")
        .action((options) => {

            // this need to be send to the server for authenticaton if the user is not logged in
            if (options.user && options.password) {
                console.log("User: ", options.user);
                console.log("Password: ", options.password);
            } else if (options.user) {
                console.log("User: ", options.user);
                console.log("No password specified");
            } else {
                console.log("No user specified");
            }
        });

    program.parse(process.argv);
}