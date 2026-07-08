import { User, Workspace, Website, Page, Section, Block, Template, Theme } from "../models/index.js";

export class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    return await User.create(userData);
  }

  async save(userInstance) {
    return await userInstance.save();
  }
}

export class WorkspaceRepository {
  async findById(id) {
    return await Workspace.findById(id);
  }

  async findByOwnerId(ownerId) {
    return await Workspace.find({ ownerId });
  }

  async findByMemberId(userId) {
    return await Workspace.find({ "members.userId": userId });
  }

  async create(workspaceData) {
    return await Workspace.create(workspaceData);
  }

  async save(workspaceInstance) {
    return await workspaceInstance.save();
  }
}

export class WebsiteRepository {
  async findById(id) {
    return await Website.findById(id);
  }

  async findByWorkspaceId(workspaceId) {
    return await Website.find({ workspaceId });
  }

  async findBySlug(slug) {
    return await Website.findOne({ slug });
  }

  async create(websiteData) {
    return await Website.create(websiteData);
  }

  async save(websiteInstance) {
    return await websiteInstance.save();
  }

  async delete(id) {
    return await Website.deleteOne({ _id: id });
  }
}
