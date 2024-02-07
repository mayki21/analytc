const express = require("express");
const router = express.Router();
const Client = require("../model/Client");
const Assignment = require("../model/Assignment");

// Middleware to check if the user is an admin


const isAdmin = (req, res, next) => {
  if(true){
    console.log(req.user.userType)
  }
  if (req.user && req.user.userType === 'admin') {
    next(); // User is an admin, proceed to the next middleware
  } else {
    res.status(403).json({ message: "Forbidden" }); // User is not an admin, return Forbidden error
  }
};

// POST route to create a new client (only accessible to admins)
router.post("/clients",isAdmin, async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    // Create a new client
    const newClient = new Client({ name, phoneNumber });
    await newClient.save();

    res.status(201).json({ message: "Client created successfully", client: newClient });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST route to assign a client to an agent
router.post("/assign-client", async (req, res) => {
  try {
    const { adminId, clientId, agentId } = req.body;

    // Create a new assignment
    const newAssignment = new Assignment({ adminId, clientId, agentId });
    await newAssignment.save();

    res.status(201).json({ message: "Client assigned successfully", assignment: newAssignment });
  } catch (error) {
    console.error("Error assigning client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
