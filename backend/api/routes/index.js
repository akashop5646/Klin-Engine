import express from "express";
import jwt from "jsonwebtoken";
import { AuthController, WorkspaceController, StoreDesignController, WebsiteController } from "../controllers/index.js";

const router = express.Router();
const authCtrl = new AuthController();
const workspaceCtrl = new WorkspaceController();
const designCtrl = new StoreDesignController();
const websiteCtrl = new WebsiteController();

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_development";

// Middleware: Authenticate Token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Auth routes
router.post("/auth/google/verify", (req, res) => authCtrl.googleVerify(req, res));
router.post("/auth/signup", (req, res) => authCtrl.signup(req, res));
router.post("/auth/signup/verify", (req, res) => authCtrl.verifyOtp(req, res));
router.post("/auth/login", (req, res) => authCtrl.login(req, res));

// Workspace routes
router.get("/workspaces", authenticateToken, (req, res) => workspaceCtrl.list(req, res));
router.post("/workspaces", authenticateToken, (req, res) => workspaceCtrl.create(req, res));
router.post("/workspaces/switch", authenticateToken, (req, res) => workspaceCtrl.switch(req, res));

// Website routes
router.get("/websites", authenticateToken, (req, res) => websiteCtrl.list(req, res));
router.post("/websites", authenticateToken, (req, res) => websiteCtrl.create(req, res));
router.patch("/websites/:id", authenticateToken, (req, res) => websiteCtrl.update(req, res));
router.delete("/websites/:id", authenticateToken, (req, res) => websiteCtrl.delete(req, res));

// Store Design routes
router.get("/store-design", authenticateToken, (req, res) => designCtrl.get(req, res));
router.post("/store-design", authenticateToken, (req, res) => designCtrl.create(req, res));
router.patch("/store-design", authenticateToken, (req, res) => designCtrl.update(req, res));
router.post("/store-design/publish", authenticateToken, (req, res) => designCtrl.publish(req, res));

export default router;
