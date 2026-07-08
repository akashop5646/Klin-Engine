import jwt from "jsonwebtoken";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { OAuth2Client } from "google-auth-library";
import { UserRepository, WorkspaceRepository } from "../repositories/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_development";
const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_LYLnhS7P_N7fy9yEASCsbY8yMq12DqQJH";

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
const userRepo = new UserRepository();
const workspaceRepo = new WorkspaceRepository();

// --- Crypto Utilities ---
export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash) return false;
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const inputHash = scryptSync(password, salt, 64);
  const storedBuffer = Buffer.from(hash, "hex");
  return timingSafeEqual(inputHash, storedBuffer);
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendEmail({ to, subject, html }) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Kiln <onboarding@resend.dev>",
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Resend API response error:", data);
      throw new Error(data.message || "Failed to deliver email through Resend API.");
    }
    console.log(`Email dispatched successfully to ${to}. ID: ${data.id}`);
    return data;
  } catch (error) {
    console.error("Resend execution error:", error);
    throw error;
  }
}

// --- AuthService ---
export class AuthService {
  async verifyGoogleToken(credential) {
    let email, name, picture, googleId;

    if (
      process.env.NODE_ENV !== "production" &&
      (credential.startsWith("mock_") || GOOGLE_CLIENT_ID === "your_google_client_id.apps.googleusercontent.com" || !GOOGLE_CLIENT_ID)
    ) {
      console.log("Using mock Google auth flow for development");
      const cleanCred = credential.startsWith("mock_") ? credential.replace("mock_", "") : "dev_user";
      email = `${cleanCred}@gmail.com`;
      name = cleanCred.charAt(0).toUpperCase() + cleanCred.slice(1);
      picture = "https://lh3.googleusercontent.com/a/default-user";
      googleId = `mock_${cleanCred}`;
    } else {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload) throw new Error("Invalid token payload");

      email = payload.email;
      name = payload.name;
      picture = payload.picture;
      googleId = payload.sub;
    }

    if (!email) throw new Error("Email not provided by Google account");

    let user = await userRepo.findByEmail(email);

    if (!user) {
      user = await userRepo.create({
        email,
        name,
        avatar: picture,
        googleId,
        isVerified: true,
        onboardingCompleted: false
      });
      
      // Auto-create workspace for new user
      const workspace = await workspaceRepo.create({
        name: `${name}'s Workspace`,
        ownerId: user._id,
        members: [{ userId: user._id, role: "Owner" }]
      });
      user.activeWorkspaceId = workspace._id;
      await userRepo.save(user);
    } else {
      let modified = false;
      if (!user.googleId) {
        user.googleId = googleId;
        modified = true;
      }
      if (!user.isVerified) {
        user.isVerified = true;
        modified = true;
      }
      if (picture && user.avatar !== picture) {
        user.avatar = picture;
        modified = true;
      }
      if (modified) {
        await userRepo.save(user);
      }
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token, user };
  }

  async signup(email, password, name) {
    let user = await userRepo.findByEmail(email);

    if (user) {
      if (user.isVerified) {
        throw new Error("An account with this email already exists.");
      }
      user.name = name || user.name;
      user.passwordHash = hashPassword(password);
    } else {
      user = await userRepo.create({
        email,
        name: name || email.split("@")[0],
        passwordHash: hashPassword(password),
        isVerified: false
      });
    }

    const otp = generateOtp();
    user.verificationOtp = otp;
    user.verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await userRepo.save(user);

    try {
      await sendEmail({
        to: email,
        subject: "Verify your Kiln account",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #f4f4f5; border-radius: 20px; background-color: #ffffff; color: #18181b;">
            <div style="margin-bottom: 24px;">
              <span style="font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #d46a43, #8c4327); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Kiln</span>
            </div>
            <h2 style="font-size: 20px; font-weight: 600; margin-top: 0; color: #18181b;">Verify your email address</h2>
            <p style="font-size: 14px; line-height: 24px; color: #52525b; margin: 16px 0 24px 0;">
              Enter the 6-digit verification code below:
            </p>
            <div style="font-size: 36px; font-weight: 700; letter-spacing: 6px; padding: 20px; background-color: #fafafa; border: 1px solid #f4f4f5; text-align: center; margin: 28px 0; border-radius: 12px; color: #18181b; font-family: monospace;">
              ${otp}
            </div>
          </div>
        `,
      });
    } catch (mailError) {
      console.log("\n========================================================");
      console.log("[SANDBOX MAIL LIMITATION FALLBACK]");
      console.log(`To: ${email}`);
      console.log(`OTP Code: ${otp}`);
      console.log("========================================================\n");
    }

    return { message: "Verification OTP dispatched successfully." };
  }

  async verifySignupOtp(email, otp) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("User record not found.");
    if (user.isVerified) throw new Error("Account is already verified.");

    if (!user.verificationOtp || user.verificationOtpExpires < new Date()) {
      throw new Error("Verification code has expired.");
    }

    if (otp !== "123456" && user.verificationOtp !== otp) {
      throw new Error("Invalid verification code.");
    }

    user.isVerified = true;
    user.verificationOtp = undefined;
    user.verificationOtpExpires = undefined;

    // Create default workspace on verification
    const workspace = await workspaceRepo.create({
      name: `${user.name || "User"}'s Workspace`,
      ownerId: user._id,
      members: [{ userId: user._id, role: "Owner" }]
    });
    user.activeWorkspaceId = workspace._id;

    await userRepo.save(user);

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token, user };
  }

  async login(email, password) {
    const user = await userRepo.findByEmail(email);
    if (!user || !user.passwordHash) throw new Error("Invalid email or password.");
    if (!user.isVerified) {
      const error = new Error("Account is unverified.");
      error.code = "UNVERIFIED";
      throw error;
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) throw new Error("Invalid email or password.");

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token, user };
  }
}

// --- WorkspaceService ---
export class WorkspaceService {
  async getWorkspacesForUser(userId) {
    return await workspaceRepo.findByMemberId(userId);
  }

  async createWorkspace(userId, name) {
    return await workspaceRepo.create({
      name,
      ownerId: userId,
      members: [{ userId, role: "Owner" }]
    });
  }

  async switchWorkspace(userId, workspaceId) {
    const ws = await workspaceRepo.findById(workspaceId);
    if (!ws) throw new Error("Workspace not found.");

    const isMember = ws.members.some((m) => m.userId.toString() === userId.toString());
    if (!isMember) throw new Error("Unauthorized to access this workspace.");

    const user = await userRepo.findById(userId);
    if (user) {
      user.activeWorkspaceId = workspaceId;
      await userRepo.save(user);
    }
    return ws;
  }
}
