import { AuthService, WorkspaceService } from "../services/index.js";
import { User, Workspace, Website, Page, Section, Theme } from "../models/index.js";

const authService = new AuthService();
const workspaceService = new WorkspaceService();

export class AuthController {
  async googleVerify(req, res) {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: "Google credential is required" });
    }
    try {
      const data = await authService.verifyGoogleToken(credential);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async signup(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    try {
      const result = await authService.signup(email, password, name);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async verifyOtp(req, res) {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }
    try {
      const data = await authService.verifySignupOtp(email, otp);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    try {
      const data = await authService.login(email, password);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message, code: err.code });
    }
  }
}

export class WorkspaceController {
  async list(req, res) {
    try {
      const workspaces = await workspaceService.getWorkspacesForUser(req.user.id);
      res.json({ workspaces });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Workspace name is required" });
    }
    try {
      const workspace = await workspaceService.createWorkspace(req.user.id, name);
      res.status(201).json({ workspace });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async switch(req, res) {
    const { workspaceId } = req.body;
    if (!workspaceId) {
      return res.status(400).json({ error: "Workspace ID is required" });
    }
    try {
      const workspace = await workspaceService.switchWorkspace(req.user.id, workspaceId);
      res.json({ success: true, workspace });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export class WebsiteController {
  async list(req, res) {
    try {
      const user = await User.findById(req.user.id);
      const workspaceId = user ? user.activeWorkspaceId : null;
      if (!workspaceId) {
        return res.json({ websites: [] });
      }
      const websites = await Website.find({ workspaceId }).sort({ createdAt: -1 }).lean();
      
      const mapped = websites.map((w) => ({
        id: w._id,
        name: w.name,
        status: w.status,
        theme: "Clean Modern",
        templateId: w.templateId || "classic-denim",
        domain: w.activeDomain || `${w.slug}.klin.site`,
        deletedFromDraft: w.deletedFromDraft || false,
        deletedFromPublished: w.deletedFromPublished || false,
        deletedFromArchived: w.deletedFromArchived || false,
        updated: "Just now",
      }));
      
      res.json({ websites: mapped });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    const { id, name, templateId, theme } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Website name is required" });
    }
    try {
      const user = await User.findById(req.user.id);
      const workspaceId = user ? user.activeWorkspaceId : null;
      if (!workspaceId) {
        return res.status(400).json({ error: "Active workspace not found" });
      }
      const activeId = id || `site-${Date.now()}`;
      const website = await Website.create({
        _id: activeId,
        name,
        slug: activeId,
        workspaceId,
        templateId: templateId || "classic-denim",
        status: "Draft",
      });
      res.status(201).json({ website });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, status, deletedFromDraft, deletedFromPublished, deletedFromArchived } = req.body;
    try {
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (status !== undefined) updateData.status = status;
      if (deletedFromDraft !== undefined) updateData.deletedFromDraft = deletedFromDraft;
      if (deletedFromPublished !== undefined) updateData.deletedFromPublished = deletedFromPublished;
      if (deletedFromArchived !== undefined) updateData.deletedFromArchived = deletedFromArchived;

      const website = await Website.findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        { new: true }
      );
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }
      res.json({ website });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const website = await Website.findOneAndDelete({ _id: id });
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export class StoreDesignController {
  async get(req, res) {
    try {
      const websiteId = req.query.websiteId || "default";
      
      const pages = await Page.find({ websiteId }).lean();
      if (!pages || pages.length === 0) {
        return res.status(404).json({ error: "No design found" });
      }

      const pagesWithSections = await Promise.all(
        pages.map(async (page) => {
          const sections = await Section.find({ pageId: page._id }).sort({ orderIndex: 1 }).lean();
          return {
            id: page.frontendId || page._id.toString(),
            title: page.title,
            slug: page.slug,
            isVisible: page.isVisible,
            sections: sections.map((s) => ({
              id: s.frontendId || s._id.toString(),
              type: s.type,
              isVisible: s.isVisible,
              config: s.config,
            })),
          };
        })
      );

      let themeDoc = await Theme.findOne({ websiteId }).lean();
      if (!themeDoc) {
        themeDoc = {
          colors: {
            primary: "#18181B",
            secondary: "#71717A",
            accent: "#D97706",
            background: "#FFFFFF",
            surface: "#FAFAFA",
            text: "#18181B",
          },
          typography: {
            headingFont: "Inter",
            bodyFont: "Inter",
            headingSize: "default",
            bodySize: "default",
          },
          buttons: {
            style: "rounded",
            shadow: false,
          },
          cards: {
            radius: 12,
            shadow: true,
            border: false,
          },
          animations: "fade",
        };
      }

      const website = await Website.findOne({ $or: [{ _id: websiteId }, { slug: websiteId }] });
      const templateId = website ? website.templateId : "classic-denim";

      res.json({
        design: {
          templateId,
          theme: themeDoc,
          pages: pagesWithSections,
        },
      });
    } catch (err) {
      console.error("Fetch design error:", err);
      res.status(500).json({ error: "Failed to fetch design" });
    }
  }

  async create(req, res) {
    try {
      const { templateId, theme, pages, websiteId } = req.body;
      const activeWebsiteId = websiteId || "default";

      let website = await Website.findOne({ $or: [{ _id: activeWebsiteId }, { slug: activeWebsiteId }] });
      if (!website) {
        const user = await User.findById(req.user.id);
        const workspaceId = user ? user.activeWorkspaceId : null;
        website = await Website.create({
          _id: activeWebsiteId,
          name: activeWebsiteId,
          slug: activeWebsiteId,
          workspaceId: workspaceId,
          templateId: templateId || "classic-denim",
          status: "Draft",
        });
      }

      await Theme.deleteMany({ websiteId: activeWebsiteId });
      const existingPages = await Page.find({ websiteId: activeWebsiteId });
      const pageIds = existingPages.map((p) => p._id);
      await Section.deleteMany({ pageId: { $in: pageIds } });
      await Page.deleteMany({ websiteId: activeWebsiteId });

      await Theme.create({
        websiteId: activeWebsiteId,
        name: theme?.name || "Default Theme",
        colors: theme?.colors,
        typography: theme?.typography,
        buttons: theme?.buttons,
        cards: theme?.cards,
        animations: theme?.animations || "fade",
      });

      await Promise.all(
        pages.map(async (p) => {
          const pageDb = await Page.create({
            websiteId: activeWebsiteId,
            title: p.title,
            slug: p.slug,
            isHome: p.slug === "/" || p.slug === "home",
            isVisible: p.isVisible !== false,
            frontendId: p.id,
          });

          if (p.sections && p.sections.length > 0) {
            await Promise.all(
              p.sections.map(async (sec, idx) => {
                await Section.create({
                  pageId: pageDb._id,
                  type: sec.type,
                  isVisible: sec.isVisible !== false,
                  orderIndex: idx,
                  config: sec.config,
                  frontendId: sec.id,
                });
              })
            );
          }
        })
      );

      res.status(201).json({
        design: {
          templateId: templateId || "classic-denim",
          theme: theme,
          pages: pages,
        },
      });
    } catch (err) {
      console.error("Create design error:", err);
      res.status(500).json({ error: "Failed to create design" });
    }
  }

  async update(req, res) {
    try {
      const websiteId = req.query.websiteId || req.body.websiteId || "default";
      const { theme, pages } = req.body;

      let website = await Website.findOne({ $or: [{ _id: websiteId }, { slug: websiteId }] });
      if (!website) {
        const user = await User.findById(req.user.id);
        const workspaceId = user ? user.activeWorkspaceId : null;
        website = await Website.create({
          _id: websiteId,
          name: websiteId,
          slug: websiteId,
          workspaceId: workspaceId,
          templateId: "streetwear-capsule",
          status: "Draft",
        });
      }

      if (theme) {
        await Theme.findOneAndUpdate(
          { websiteId },
          {
            $set: {
              colors: theme.colors,
              typography: theme.typography,
              buttons: theme.buttons,
              cards: theme.cards,
              animations: theme.animations || "fade",
            },
          },
          { upsert: true, new: true }
        );
      }

      if (pages) {
        const existingPages = await Page.find({ websiteId });
        const pageIds = existingPages.map((p) => p._id);
        await Section.deleteMany({ pageId: { $in: pageIds } });
        await Page.deleteMany({ websiteId });

        await Promise.all(
          pages.map(async (p) => {
            const pageDb = await Page.create({
              websiteId,
              title: p.title,
              slug: p.slug,
              isHome: p.slug === "/" || p.slug === "home",
              isVisible: p.isVisible !== false,
              frontendId: p.id,
            });

            if (p.sections && p.sections.length > 0) {
              await Promise.all(
                p.sections.map(async (sec, idx) => {
                  await Section.create({
                    pageId: pageDb._id,
                    type: sec.type,
                    isVisible: sec.isVisible !== false,
                    orderIndex: idx,
                    config: sec.config,
                    frontendId: sec.id,
                  });
                })
              );
            }
          })
        );
      }

      res.json({
        design: {
          templateId: website.templateId || "classic-denim",
          theme: theme,
          pages: pages,
        },
      });
    } catch (err) {
      console.error("Save design error:", err);
      res.status(500).json({ error: "Failed to save design" });
    }
  }

  async publish(req, res) {
    try {
      const { websiteId } = req.body;
      const website = await Website.findOne({ $or: [{ _id: websiteId }, { slug: websiteId }] });
      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }
      website.status = "Published";
      await website.save();
      res.json({ success: true });
    } catch (err) {
      console.error("Publish error:", err);
      res.status(500).json({ error: "Failed to publish" });
    }
  }
}

