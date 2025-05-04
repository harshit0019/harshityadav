import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { setupAuth } from "./auth";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  const { requireAdmin } = setupAuth(app);
  // Contact form endpoint with Web3Forms integration
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate form data
      const validData = contactFormSchema.parse(req.body);
      
      // Use Web3Forms to send the email
      const formData = {
        ...validData,
        access_key: "384d8768-c52f-4a1c-89f1-db67130a68c8", // Adding API key server-side for security
        from_name: validData.name,
        subject: validData.subject || "Contact Form Submission",
        botcheck: "",  // Honeypot field for spam prevention
      };
      
      console.log("Sending contact form to Web3Forms...");
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();
      console.log("Web3Forms response:", responseData);
      
      if (responseData.success) {
        res.status(200).json({ 
          success: true, 
          message: "Message sent successfully" 
        });
      } else {
        throw new Error(responseData.message || "Failed to send message");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: error instanceof Error ? error.message : "Server error" 
        });
      }
    }
  });
  
  // Web3Forms proxy endpoint
  app.post('/api/web3forms-proxy', async (req: Request, res: Response) => {
    try {
      const formData = {
        ...req.body,
        access_key: "384d8768-c52f-4a1c-89f1-db67130a68c8", // Adding API key server-side for security
        site_url: "https://harshityadav.com", // Setting site_url to bypass domain check
      };
      
      console.log("Forwarding to Web3Forms:", formData);
      
      // Forward the request to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });
      
      // Get response as text first for logging
      const responseText = await response.text();
      console.log("Web3Forms response:", responseText);
      
      // Parse the response if it's JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { success: false, message: responseText };
      }
      
      // Return Web3Forms response
      res.status(response.status).json(responseData);
      
    } catch (error) {
      console.error("Web3Forms proxy error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to forward request to Web3Forms" 
      });
    }
  });

  // ===== ADMIN API ROUTES =====

  // Projects API
  app.get('/api/admin/projects', requireAdmin, async (req, res) => {
    try {
      const includeHidden = req.query.includeHidden === 'true';
      const projects = await storage.getProjects(includeHidden);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get('/api/admin/projects/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      const tags = await storage.getProjectTags(id);
      res.json({ ...project, tags });
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post('/api/admin/projects', requireAdmin, async (req, res) => {
    try {
      const newProject = await storage.createProject(req.body);
      // Add tags if included
      if (req.body.tags && Array.isArray(req.body.tags)) {
        for (const tagId of req.body.tags) {
          await storage.addTagToProject(newProject.id, tagId);
        }
      }
      res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.patch('/api/admin/projects/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedProject = await storage.updateProject(id, req.body);
      if (!updatedProject) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      // Update tags if included
      if (req.body.tags && Array.isArray(req.body.tags)) {
        // Get current tags
        const currentTags = await storage.getProjectTags(id);
        const currentTagIds = currentTags.map(t => t.id);
        const newTagIds = req.body.tags;
        
        // Remove tags not in the new list
        for (const tagId of currentTagIds) {
          if (!newTagIds.includes(tagId)) {
            await storage.removeTagFromProject(id, tagId);
          }
        }
        
        // Add new tags
        for (const tagId of newTagIds) {
          if (!currentTagIds.includes(tagId)) {
            await storage.addTagToProject(id, tagId);
          }
        }
      }
      
      res.json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete('/api/admin/projects/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Tags API
  app.get('/api/admin/tags', requireAdmin, async (req, res) => {
    try {
      const tags = await storage.getTags();
      res.json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  });

  app.post('/api/admin/tags', requireAdmin, async (req, res) => {
    try {
      const newTag = await storage.createTag(req.body);
      res.status(201).json(newTag);
    } catch (error) {
      console.error("Error creating tag:", error);
      res.status(500).json({ error: "Failed to create tag" });
    }
  });

  app.delete('/api/admin/tags/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTag(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting tag:", error);
      res.status(500).json({ error: "Failed to delete tag" });
    }
  });

  // Skills API
  app.get('/api/admin/skill-categories', requireAdmin, async (req, res) => {
    try {
      const includeHidden = req.query.includeHidden === 'true';
      const categories = await storage.getSkillCategories(includeHidden);
      res.json(categories);
    } catch (error) {
      console.error("Error fetching skill categories:", error);
      res.status(500).json({ error: "Failed to fetch skill categories" });
    }
  });

  app.get('/api/admin/skill-categories/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.getSkillCategory(id);
      if (!category) {
        return res.status(404).json({ error: "Skill category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching skill category:", error);
      res.status(500).json({ error: "Failed to fetch skill category" });
    }
  });

  app.post('/api/admin/skill-categories', requireAdmin, async (req, res) => {
    try {
      const newCategory = await storage.createSkillCategory(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating skill category:", error);
      res.status(500).json({ error: "Failed to create skill category" });
    }
  });

  app.patch('/api/admin/skill-categories/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedCategory = await storage.updateSkillCategory(id, req.body);
      if (!updatedCategory) {
        return res.status(404).json({ error: "Skill category not found" });
      }
      res.json(updatedCategory);
    } catch (error) {
      console.error("Error updating skill category:", error);
      res.status(500).json({ error: "Failed to update skill category" });
    }
  });

  app.delete('/api/admin/skill-categories/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSkillCategory(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting skill category:", error);
      res.status(500).json({ error: "Failed to delete skill category" });
    }
  });

  // Skills API
  app.get('/api/admin/skills', requireAdmin, async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const includeHidden = req.query.includeHidden === 'true';
      const skills = await storage.getSkills(categoryId, includeHidden);
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  app.get('/api/admin/skills/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const skill = await storage.getSkill(id);
      if (!skill) {
        return res.status(404).json({ error: "Skill not found" });
      }
      res.json(skill);
    } catch (error) {
      console.error("Error fetching skill:", error);
      res.status(500).json({ error: "Failed to fetch skill" });
    }
  });

  app.post('/api/admin/skills', requireAdmin, async (req, res) => {
    try {
      const newSkill = await storage.createSkill(req.body);
      res.status(201).json(newSkill);
    } catch (error) {
      console.error("Error creating skill:", error);
      res.status(500).json({ error: "Failed to create skill" });
    }
  });

  app.patch('/api/admin/skills/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedSkill = await storage.updateSkill(id, req.body);
      if (!updatedSkill) {
        return res.status(404).json({ error: "Skill not found" });
      }
      res.json(updatedSkill);
    } catch (error) {
      console.error("Error updating skill:", error);
      res.status(500).json({ error: "Failed to update skill" });
    }
  });

  app.delete('/api/admin/skills/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSkill(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting skill:", error);
      res.status(500).json({ error: "Failed to delete skill" });
    }
  });

  // Experience API
  app.get('/api/admin/experiences', requireAdmin, async (req, res) => {
    try {
      const includeHidden = req.query.includeHidden === 'true';
      const experiences = await storage.getExperiences(includeHidden);
      res.json(experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  app.get('/api/admin/experiences/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const experience = await storage.getExperience(id);
      if (!experience) {
        return res.status(404).json({ error: "Experience not found" });
      }
      const responsibilities = await storage.getResponsibilities(id);
      res.json({ ...experience, responsibilities });
    } catch (error) {
      console.error("Error fetching experience:", error);
      res.status(500).json({ error: "Failed to fetch experience" });
    }
  });

  app.post('/api/admin/experiences', requireAdmin, async (req, res) => {
    try {
      const { responsibilities, ...experienceData } = req.body;
      const newExperience = await storage.createExperience(experienceData);
      
      // Add responsibilities if included
      if (responsibilities && Array.isArray(responsibilities)) {
        for (const resp of responsibilities) {
          await storage.createResponsibility({
            ...resp,
            experienceId: newExperience.id
          });
        }
      }
      
      res.status(201).json(newExperience);
    } catch (error) {
      console.error("Error creating experience:", error);
      res.status(500).json({ error: "Failed to create experience" });
    }
  });

  app.patch('/api/admin/experiences/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { responsibilities, ...experienceData } = req.body;
      
      const updatedExperience = await storage.updateExperience(id, experienceData);
      if (!updatedExperience) {
        return res.status(404).json({ error: "Experience not found" });
      }
      
      // Update responsibilities if included
      if (responsibilities && Array.isArray(responsibilities)) {
        // Get existing responsibilities
        const existingResponsibilities = await storage.getResponsibilities(id);
        
        // Delete removed responsibilities
        for (const existing of existingResponsibilities) {
          const stillExists = responsibilities.some(r => r.id === existing.id);
          if (!stillExists) {
            await storage.deleteResponsibility(existing.id);
          }
        }
        
        // Add/update responsibilities
        for (const resp of responsibilities) {
          if (resp.id) {
            // Update existing
            await storage.updateResponsibility(resp.id, resp);
          } else {
            // Create new
            await storage.createResponsibility({
              ...resp,
              experienceId: id
            });
          }
        }
      }
      
      res.json(updatedExperience);
    } catch (error) {
      console.error("Error updating experience:", error);
      res.status(500).json({ error: "Failed to update experience" });
    }
  });

  app.delete('/api/admin/experiences/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteExperience(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting experience:", error);
      res.status(500).json({ error: "Failed to delete experience" });
    }
  });

  // Responsibilities API (separate routes for individual management)
  app.post('/api/admin/responsibilities', requireAdmin, async (req, res) => {
    try {
      const newResponsibility = await storage.createResponsibility(req.body);
      res.status(201).json(newResponsibility);
    } catch (error) {
      console.error("Error creating responsibility:", error);
      res.status(500).json({ error: "Failed to create responsibility" });
    }
  });

  app.patch('/api/admin/responsibilities/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedResponsibility = await storage.updateResponsibility(id, req.body);
      if (!updatedResponsibility) {
        return res.status(404).json({ error: "Responsibility not found" });
      }
      res.json(updatedResponsibility);
    } catch (error) {
      console.error("Error updating responsibility:", error);
      res.status(500).json({ error: "Failed to update responsibility" });
    }
  });

  app.delete('/api/admin/responsibilities/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteResponsibility(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting responsibility:", error);
      res.status(500).json({ error: "Failed to delete responsibility" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
