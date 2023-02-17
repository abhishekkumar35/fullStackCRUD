const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const PORT = process.env || 8001;
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "employees.db");
let db = null;

const initServerAndDb = async function () {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database connnected");
    app.listen(PORT, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is listening on port : " + PORT);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

initServerAndDb();

app.get("/create", async function (req, res) {
  try {
    await db.run(
      `create table employees (employeeId INTEGER PRIMARY KEY,firstName VARCHAR(30),lastName VARCHAR(30),emailId VARCHAR(30) unique)`
    );
    res.send("employees table created successfully");
  } catch (e) {
    res.send(e.message);
    console.log(e.message);
  }
});
app.get("/", async (req, res) => {
  try {
    const data = await db.all(`select * from employees`);
    res.send(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post("/addemployee", async function (req, res) {
  try {
    const employee = req.body;
    const { firstName, lastName, emailId } = employee;

    if (firstName && lastName && emailId) {
      try {
        await db.run(
          `insert into employees (firstName, lastName, emailId) values('${firstName}', '${lastName}', '${emailId}')`
        );
        res.send("Employee Inserted Successfully");
      } catch (error) {
        console.log(error);
        res.send(error.message);
      }
    } else {
      res.send("Inputs can not be empty");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateemployee/:employeeId", async function (req, res) {
  try {
    const employee = req.body;
    const { firstName, lastName, emailId } = employee;
    const { employeeId } = req.params;
    if (firstName && lastName && emailId) {
      try {
        await db.run(
          `UPDATE employees
          SET lastName = '${lastName}',firstName = '${firstName}',emailId = '${emailId}'
          WHERE employeeid = ${employeeId};`
        );
        const updatedData = await db.get(
          `select * from employees where employeeid = ${employeeId}`
        );
        res.send({
          data: updatedData,
          message: "Updated employee successfully",
        });
        console.log(updatedData);
      } catch (error) {
        console.log(error);
        res.send(error.message);
      }
    } else {
      res.send("Inputs can not be empty");
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.delete("/deleteemployee/:employeeId", async function (req, res) {
  try {
    const employee = req.body;

    const { employeeId } = req.params;
    if (employeeId) {
      try {
        await db.run("delete from employees where employeeId = ?", [
          employeeId,
        ]);
        res.send("employee deleted successfully");
      } catch (error) {
        res.send(error);
      }
    } else {
      res.send("Inputs can not be empty");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/getemployee/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (employeeId) {
      try {
        const data = await db.get(
          `select * from employees where employeeId = ${employeeId}`
        );
        if (data) {
          console.log(data);
          res.send(data);
        } else {
          res.send("Employee does not Exist");
        }
      } catch (error) {
        res.send(error);
      }
    } else {
      res.send("Inputs can not be empty");
    }
  } catch (error) {
    console.log(error);
  }
});
