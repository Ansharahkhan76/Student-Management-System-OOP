#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Define the Student Class
class Student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initiative an empty array for courses
        this.balance = 1000; // $100 to start with
    }
    // method to enroll a studnt in a course
    enrollCourse(courses) {
        this.courses.push(courses);
    }
    // Method to view a student balance
    viewBalance() {
        console.log(chalk.italic.green.bold(`Balance for ${chalk.italic.blue(this.name)} : ${chalk.italic.blue(this.balance)}`));
    }
    // Method to pay student fees
    PayFees(amount) {
        this.balance -= amount;
        console.log(chalk.italic.green.bold(`$${chalk.italic.blue(amount)} Fees paid successfully for ${chalk.italic.blue(this.name)}`));
        console.log(`Remaining Balance : $${chalk.blueBright(this.balance)}`);
    }
    // Method  to display all the courses of a particular student 
    ShowStatus() {
        console.log(chalk.yellow.italic(`ID : ${chalk.red.italic(this.id)}`));
        console.log(chalk.yellow.italic(`Name : ${chalk.red.italic(this.name)}`));
        console.log(chalk.yellow.italic(`Courses : ${chalk.red.italic(this.courses)}`));
        console.log(chalk.yellow.italic(`Balance : ${chalk.red.italic(this.balance)}`));
    }
}
// Defining a studentManager class to manage students
class Student_Manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new students 
    AddStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.red(`Student : ${chalk.blue(name)} added successfully, Student ID : ${chalk.blue(student.id)}`));
    }
    // Method to enroll a student in a course
    EnrollStudent(StudentId, Course) {
        let student = this.students.find(std => std.id === StudentId);
        if (student) {
            student.enrollCourse(Course);
            console.log(chalk.red(`${chalk.blue(student.name)} enrolled in ${chalk.blue(Course)} successfullly.`));
        }
    }
    // Method to view a student balance
    ViewStudentBalance(StudentId) {
        let student = this.FindStudent(StudentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.bgRed.italic("Student not found. please enter a correct Student Id"));
        }
    }
    // Method to pay student fees
    PayStudentFees(StudentId, amount) {
        let student = this.FindStudent(StudentId);
        if (student) {
            student.PayFees(amount);
        }
        else {
            console.log(chalk.bgRed.italic("Student not found. please enter a correct Student Id"));
        }
    }
    // Method to display student status
    ShowStudentStatus(StudentId) {
        let student = this.FindStudent(StudentId);
        if (student) {
            student.ShowStatus();
        }
    }
    // Method to find a student by Student Id
    FindStudent(StudentId) {
        return this.students.find(std => std.id === StudentId);
    }
}
// Main function to run the code
async function main() {
    console.log(chalk.bold.blueBright(`\nWelcome To My Project Student_Manage_System (OOP)\n\t\t ${chalk.red.italic('--Ansharah Khan--')}`));
    console.log(chalk.cyan("-".repeat(50)));
    let studentManager = new Student_Manager();
    // While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using Switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                studentManager.AddStudent(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "StudentId",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name"
                    }
                ]);
                studentManager.EnrollStudent(course_input.StudentId, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "StudentId",
                        type: "number",
                        message: "Enetr a Student ID",
                    }
                ]);
                studentManager.ViewStudentBalance((balance_input.StudentId));
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "StudentId",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter a amount to Pay"
                    }
                ]);
                studentManager.PayStudentFees(fees_input.StudentId, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "StudentId",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                studentManager.ShowStudentStatus(status_input.StudentId);
                break;
            case "Exit":
                console.log(chalk.yellow("Exiting..."));
                process.exit();
        }
    }
}
// Calling a main function
main();
