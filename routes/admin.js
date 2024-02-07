const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Client = require("../model/Client");
const Assignment = require("../model/Assignment");
require('dotenv').config();
const jwt = require("jsonwebtoken");

// Middleware to check if the user is an admin


const isAdmin = (req, res, next) => {
  try {
    // Extract JWT token from the request headers
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType === 'admin') {
      next(); // User is an admin, proceed to the next middleware
    } else {
      res.status(403).json({ message: "Forbidden" }); // User is not an admin, return Forbidden error
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
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





router.post("/assign-client", isAdmin, async (req, res) => {
  try {
    const { adminId, agentId, clientIds } = req.body;

    // Create a new assignment with the provided agent and client IDs
    const newAssignment = new Assignment({ adminId, agentId, clients: clientIds });
    await newAssignment.save();

    res.status(201).json({ message: "Clients assigned successfully", assignment: newAssignment });
  } catch (error) {
    console.error("Error assigning clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.get("/list-clients", isAdmin, async (req, res) => {
  try {
    // Fetch all clients
    const clients = await Client.find();

    res.status(200).json({ clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET route to get all agents
router.get("/list-agents", isAdmin, async (req, res) => {
  try {
    // Fetch all agents
    const agents = await User.find({ userType: 'agent' });

    res.status(200).json({ agents });
  } catch (error) {
    console.error("Error fetching agents:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.get("/assignments",  async (req, res) => {
//   try {
//     // Fetch all assignments and populate the referenced fields
//     const assignments = await Assignment.find()
//       .populate('adminId')
//       .populate('agentId')
//       .populate('clients');

//     res.status(200).json({ assignments });
//   } catch (error) {
//     console.error("Error fetching assignments:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


router.get("/assignments/:agentId", async (req, res) => {
  try {
    const agentId = req.params.agentId;

    // Fetch assignments for the specified agent and populate the clients field
    const assignments = await Assignment.find({ agentId }).populate('clients');

    // Extract client details from the assignments
    const clients = assignments.flatMap(assignment => assignment.clients);

    res.status(200).json({ clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/agents/:agentId", isAdmin, async (req, res) => {
  try {
    const agentId = req.params.agentId;

    // Delete the agent from the User collection
    await User.findByIdAndDelete(agentId);

    // Delete any assignments associated with the agent
    await Assignment.deleteMany({ agentId });

    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    console.error("Error deleting agent:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});







module.exports = router;
