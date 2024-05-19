#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    do {
        console.log(chalk.bold.bgYellowBright(`\t\t\tWelcome`));
        const ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "Whom Would You Like To Interact With ?",
                choices: ["staff", "student", "exit"]
            }
        ]);
        if (ans.select == "staff") {
            console.log(chalk.bold.magenta(`You Approach The Staff Room. Please Feel Free To Ask Any Quesion !!!`));
        }
        else if (ans.select == "student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: chalk.blueBright("Enter The Students Names You Wish To Engage with :"),
            });
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(chalk.yellowBright(`Hello I Am ${name.name}. Nice To Meet You !!!`));
                console.log(chalk.green(`New Student Added`));
                console.log(chalk.magentaBright(`Current Student List :`));
                console.log(persons.students);
            }
            else {
                console.log(chalk.yellowBright(`Hello I Am ${student.name}. Nice To See You Again !!!`));
                console.log(chalk.red(`Existing Student List`));
                console.log(persons.students);
            }
        }
        else if (ans.select == "exit") {
            console.log(chalk.bgRedBright(`Exiting The Program...`));
            process.exit();
        }
    } while (true);
};
programStart(persons);
