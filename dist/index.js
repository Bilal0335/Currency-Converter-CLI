import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t<<< ========================================================= >>> `));
console.log(chalk.yellowBright.bold("\n\t\t        Welcome to BilalCode - 💰 Currency Converter 💵\n"));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t<<< ========================================================= >>> `));
//* Currency converter API link
let api = "https://v6.exchangerate-api.com/v6/c12869655c38e1665b41d5ec/latest/USD";
//* Fetch data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rates;
};
let data = await fetchData(api);
//* Object to array
let countries = Object.keys(data);
//* User Input First Country
let firstCountry = await inquirer.prompt([
    {
        name: "name",
        type: "list",
        message: chalk.bold.yellowBright(`Converting From:`),
        choices: countries,
    },
]);
//* User Input Second Country
let secondCountry = await inquirer.prompt([
    {
        name: "name",
        type: "list",
        message: chalk.bold.yellowBright(`Converting To:`),
        choices: countries,
    },
]);
//* First Country Money
let userMoney = await inquirer.prompt([
    {
        name: "rupees",
        type: "input",
        message: chalk.bold.yellowBright(`Amount To Convert:`),
        validate: (value) => !isNaN(Number(value)) ? true : "Please enter a valid amount",
    },
]);
//* Conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/c12869655c38e1665b41d5ec/pair/${firstCountry.name}/${secondCountry.name}`;
let coloredCnv = cnv
    .replace(firstCountry.name, chalk.bold.rgb(164, 117, 0)(firstCountry.name))
    .replace(secondCountry.name, chalk.bold.rgb(164, 117, 0)(secondCountry.name));
//* Fetch data for Conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let response = await cnvData.json();
    return response.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let convertedrate = userMoney.rupees * conversionRate;
console.log(`${chalk.bold.yellowBright(userMoney.rupees)} ${chalk.bold.green(firstCountry.name)} ${chalk.bold.gray("=")} ${chalk.bold.yellowBright(convertedrate.toFixed(3))} ${chalk.bold.green(secondCountry.name)}`);
