import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

// Projects section content
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  demoUrl: varchar("demo_url", { length: 255 }),
  githubUrl: varchar("github_url", { length: 255 }),
  displayOrder: integer("display_order").default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  projectTags: many(projectTags),
}));

// Tags for projects
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

export const projectTags = pgTable("project_tags", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
});

export const projectTagsRelations = relations(projectTags, ({ one }) => ({
  project: one(projects, {
    fields: [projectTags.projectId],
    references: [projects.id],
  }),
  tag: one(tags, {
    fields: [projectTags.tagId],
    references: [tags.id],
  }),
}));

// Skills section content
export const skillCategories = pgTable("skill_categories", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 100 }).notNull(),
  displayOrder: integer("display_order").default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
});

export const skillCategoriesRelations = relations(skillCategories, ({ many }) => ({
  skills: many(skills),
}));

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  percentage: integer("percentage").notNull(),
  isCertification: boolean("is_certification").default(false),
  categoryId: integer("category_id").notNull().references(() => skillCategories.id, { onDelete: "cascade" }),
  displayOrder: integer("display_order").default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
});

export const skillsRelations = relations(skills, ({ one }) => ({
  category: one(skillCategories, {
    fields: [skills.categoryId],
    references: [skillCategories.id],
  }),
}));

// Experience section content
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  period: varchar("period", { length: 100 }).notNull(),
  isPlaceholder: boolean("is_placeholder").default(false),
  displayOrder: integer("display_order").default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
});

export const experiencesRelations = relations(experiences, ({ many }) => ({
  responsibilities: many(responsibilities),
}));

export const responsibilities = pgTable("responsibilities", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  experienceId: integer("experience_id").notNull().references(() => experiences.id, { onDelete: "cascade" }),
  displayOrder: integer("display_order").default(0),
});

export const responsibilitiesRelations = relations(responsibilities, ({ one }) => ({
  experience: one(experiences, {
    fields: [responsibilities.experienceId],
    references: [experiences.id],
  }),
}));

// Schema types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type ProjectTag = typeof projectTags.$inferSelect;
export type SkillCategory = typeof skillCategories.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Responsibility = typeof responsibilities.$inferSelect;

// Insert schemas
export const insertProjectSchema = createInsertSchema(projects);
export const insertTagSchema = createInsertSchema(tags);
export const insertProjectTagSchema = createInsertSchema(projectTags);
export const insertSkillCategorySchema = createInsertSchema(skillCategories);
export const insertSkillSchema = createInsertSchema(skills);
export const insertExperienceSchema = createInsertSchema(experiences);
export const insertResponsibilitySchema = createInsertSchema(responsibilities);
