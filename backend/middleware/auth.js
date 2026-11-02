import jwt from "jsonwebtoken";
import { memoryStore } from "../data/store.js";

const JWT_SECRET = process.env.JWT_SECRET || "smart_shaadi_super_secret_jwt_key_2026";

/**
 * Authentication Middleware
 * Extracts and verifies Bearer JWT token from Authorization header.
 * Attaches decoded user payload to req.user.
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ error: "Access Denied", detail: "Authentication token missing." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid Token", detail: "Token expired or unauthorized." });
  }
}

/**
 * Role-Based Authorization Middleware
 * @param {Array<string>|string} allowedRoles - E.g. ['couple', 'admin'] or 'vendor'
 */
export function requireRole(...allowedRoles) {
  const roles = allowedRoles.flat();
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized", detail: "User must be authenticated." });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: "Forbidden", 
        detail: `Access restricted. Required role(s): [${roles.join(", ")}]. Current role: '${req.user.role}'.` 
      });
    }

    next();
  };
}
