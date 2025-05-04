import { 
  users, 
  projects, 
  tags, 
  projectTags, 
  skillCategories, 
  skills, 
  experiences, 
  responsibilities,
  type User, 
  type InsertUser,
  type Project,
  type Tag,
  type SkillCategory,
  type Skill,
  type Experience,
  type Responsibility
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";

// Fix type issues with session store
const PostgresSessionStore = connectPgSimple(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project management
  getProjects(includeHidden?: boolean): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project>;
  updateProject(id: number, project: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Tag management
  getTags(): Promise<Tag[]>;
  getTag(id: number): Promise<Tag | undefined>;
  createTag(tag: Omit<Tag, "id">): Promise<Tag>;
  deleteTag(id: number): Promise<boolean>;
  
  // Project-Tag relationships
  getProjectTags(projectId: number): Promise<Tag[]>;
  addTagToProject(projectId: number, tagId: number): Promise<void>;
  removeTagFromProject(projectId: number, tagId: number): Promise<void>;
  
  // Skill category management
  getSkillCategories(includeHidden?: boolean): Promise<SkillCategory[]>;
  getSkillCategory(id: number): Promise<SkillCategory | undefined>;
  createSkillCategory(category: Omit<SkillCategory, "id">): Promise<SkillCategory>;
  updateSkillCategory(id: number, category: Partial<Omit<SkillCategory, "id">>): Promise<SkillCategory | undefined>;
  deleteSkillCategory(id: number): Promise<boolean>;
  
  // Skill management
  getSkills(categoryId?: number, includeHidden?: boolean): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: Omit<Skill, "id">): Promise<Skill>;
  updateSkill(id: number, skill: Partial<Omit<Skill, "id">>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Experience management
  getExperiences(includeHidden?: boolean): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experience: Omit<Experience, "id">): Promise<Experience>;
  updateExperience(id: number, experience: Partial<Omit<Experience, "id">>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;
  
  // Responsibility management
  getResponsibilities(experienceId: number): Promise<Responsibility[]>;
  getResponsibility(id: number): Promise<Responsibility | undefined>;
  createResponsibility(responsibility: Omit<Responsibility, "id">): Promise<Responsibility>;
  updateResponsibility(id: number, responsibility: Partial<Omit<Responsibility, "id">>): Promise<Responsibility | undefined>;
  deleteResponsibility(id: number): Promise<boolean>;
  
  // Session store for authentication
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }
  
  // User management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Project management
  async getProjects(includeHidden: boolean = false): Promise<Project[]> {
    if (includeHidden) {
      return db.select().from(projects).orderBy(asc(projects.displayOrder));
    }
    return db.select().from(projects)
      .where(eq(projects.isVisible, true))
      .orderBy(asc(projects.displayOrder));
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  
  async createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return true; // In Drizzle, if the operation doesn't throw, it succeeded
  }
  
  // Tag management
  async getTags(): Promise<Tag[]> {
    return db.select().from(tags);
  }
  
  async getTag(id: number): Promise<Tag | undefined> {
    const [tag] = await db.select().from(tags).where(eq(tags.id, id));
    return tag;
  }
  
  async createTag(tag: Omit<Tag, "id">): Promise<Tag> {
    const [newTag] = await db.insert(tags).values(tag).returning();
    return newTag;
  }
  
  async deleteTag(id: number): Promise<boolean> {
    await db.delete(tags).where(eq(tags.id, id));
    return true;
  }
  
  // Project-Tag relationships
  async getProjectTags(projectId: number): Promise<Tag[]> {
    const result = await db
      .select({ tag: tags })
      .from(projectTags)
      .innerJoin(tags, eq(projectTags.tagId, tags.id))
      .where(eq(projectTags.projectId, projectId));
    
    return result.map(r => r.tag);
  }
  
  async addTagToProject(projectId: number, tagId: number): Promise<void> {
    await db.insert(projectTags).values({ projectId, tagId });
  }
  
  async removeTagFromProject(projectId: number, tagId: number): Promise<void> {
    await db.delete(projectTags)
      .where(and(
        eq(projectTags.projectId, projectId),
        eq(projectTags.tagId, tagId)
      ));
  }
  
  // Skill category management
  async getSkillCategories(includeHidden: boolean = false): Promise<SkillCategory[]> {
    if (includeHidden) {
      return db.select().from(skillCategories).orderBy(asc(skillCategories.displayOrder));
    }
    return db.select().from(skillCategories)
      .where(eq(skillCategories.isVisible, true))
      .orderBy(asc(skillCategories.displayOrder));
  }
  
  async getSkillCategory(id: number): Promise<SkillCategory | undefined> {
    const [category] = await db.select().from(skillCategories).where(eq(skillCategories.id, id));
    return category;
  }
  
  async createSkillCategory(category: Omit<SkillCategory, "id">): Promise<SkillCategory> {
    const [newCategory] = await db.insert(skillCategories).values(category).returning();
    return newCategory;
  }
  
  async updateSkillCategory(id: number, category: Partial<Omit<SkillCategory, "id">>): Promise<SkillCategory | undefined> {
    const [updatedCategory] = await db
      .update(skillCategories)
      .set(category)
      .where(eq(skillCategories.id, id))
      .returning();
    return updatedCategory;
  }
  
  async deleteSkillCategory(id: number): Promise<boolean> {
    await db.delete(skillCategories).where(eq(skillCategories.id, id));
    return true;
  }
  
  // Skill management
  async getSkills(categoryId?: number, includeHidden: boolean = false): Promise<Skill[]> {
    let query = db.select().from(skills);
    
    if (categoryId) {
      query = query.where(eq(skills.categoryId, categoryId));
    }
    
    if (!includeHidden) {
      query = query.where(eq(skills.isVisible, true));
    }
    
    return query.orderBy(asc(skills.displayOrder));
  }
  
  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill;
  }
  
  async createSkill(skill: Omit<Skill, "id">): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }
  
  async updateSkill(id: number, skill: Partial<Omit<Skill, "id">>): Promise<Skill | undefined> {
    const [updatedSkill] = await db
      .update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    await db.delete(skills).where(eq(skills.id, id));
    return true;
  }
  
  // Experience management
  async getExperiences(includeHidden: boolean = false): Promise<Experience[]> {
    if (includeHidden) {
      return db.select().from(experiences).orderBy(asc(experiences.displayOrder));
    }
    return db.select().from(experiences)
      .where(eq(experiences.isVisible, true))
      .orderBy(asc(experiences.displayOrder));
  }
  
  async getExperience(id: number): Promise<Experience | undefined> {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience;
  }
  
  async createExperience(experience: Omit<Experience, "id">): Promise<Experience> {
    const [newExperience] = await db.insert(experiences).values(experience).returning();
    return newExperience;
  }
  
  async updateExperience(id: number, experience: Partial<Omit<Experience, "id">>): Promise<Experience | undefined> {
    const [updatedExperience] = await db
      .update(experiences)
      .set(experience)
      .where(eq(experiences.id, id))
      .returning();
    return updatedExperience;
  }
  
  async deleteExperience(id: number): Promise<boolean> {
    await db.delete(experiences).where(eq(experiences.id, id));
    return true;
  }
  
  // Responsibility management
  async getResponsibilities(experienceId: number): Promise<Responsibility[]> {
    return db.select().from(responsibilities)
      .where(eq(responsibilities.experienceId, experienceId))
      .orderBy(asc(responsibilities.displayOrder));
  }
  
  async getResponsibility(id: number): Promise<Responsibility | undefined> {
    const [responsibility] = await db.select().from(responsibilities).where(eq(responsibilities.id, id));
    return responsibility;
  }
  
  async createResponsibility(responsibility: Omit<Responsibility, "id">): Promise<Responsibility> {
    const [newResponsibility] = await db.insert(responsibilities).values(responsibility).returning();
    return newResponsibility;
  }
  
  async updateResponsibility(id: number, responsibility: Partial<Omit<Responsibility, "id">>): Promise<Responsibility | undefined> {
    const [updatedResponsibility] = await db
      .update(responsibilities)
      .set(responsibility)
      .where(eq(responsibilities.id, id))
      .returning();
    return updatedResponsibility;
  }
  
  async deleteResponsibility(id: number): Promise<boolean> {
    await db.delete(responsibilities).where(eq(responsibilities.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
