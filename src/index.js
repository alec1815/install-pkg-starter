const program = require("commander");
const pkg = require("@antfu/install-pkg");
const installPackage = pkg.installPackage;
const ora = require("ora");

program
  .version(`${require("../package.json").version}`, "-v --version")
  .usage("<command> [options]");

program
  .command("add <package-names>")
  .description("add a package")
  .action(async (names) => {
    const spinner = ora("waiting download package");
    spinner.start();
    try {
      const packageNames = names.split(",").filter(Boolean);
      await installPackage(packageNames, { silent: true });
      spinner.succeed();
    } catch (error) {
      console.log(error);
      spinner.fail("Request failed, refetch ...");
    }
  });

program.parse(process.argv);
