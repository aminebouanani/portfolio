"use client";

import { motion } from "framer-motion";
// FIX 1: Removed unused 'ExternalLink', 'Sparkles', 'Zap' from this import
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X, Code, Database, Brain, BarChart3, Globe, Cpu, Users, Lightbulb, Eye, GraduationCap, BookOpen, Award, Download, Link2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// FIX 2: Created a proper interface for the 'project' object to replace 'any'
interface Project {
  title: string;
  image: string;
  desc: string;
  fullDescription: string;
  tech: string[];
  github: string;
}

// Project Modal Component
// Applied the 'Project' interface here
function ProjectModal({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900/95 border border-zinc-700/50 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="size-6" />
          </button>
        </div>
        <div className="space-y-4">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
          <p className="text-zinc-300 leading-relaxed">{project.fullDescription}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="bg-blue-900/30 border-blue-700/50 text-blue-200">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Github className="size-4" /> View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionHeading({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      <h2 className="heading-gradient text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? (
        <p className={`text-zinc-400 mt-2 ${centered ? 'max-w-2xl mx-auto' : ''}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Academic", href: "#academic" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/60 z-50">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold heading-gradient">Amine Bouanani</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-zinc-300 hover:text-white transition-colors duration-200"
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-zinc-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-800/60"
          >
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-zinc-300 hover:text-white transition-colors duration-200"
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

// Project Card Component
// Applied the 'Project' interface here as well
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
      >
        <Card className="h-full premium-card hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
          <div className="relative overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <CardHeader>
            <CardTitle className="text-zinc-100 group-hover:text-blue-300 transition-colors">{project.title}</CardTitle>
            <CardDescription className="text-zinc-400 line-clamp-3">{project.desc}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <Badge key={tech} variant="secondary" className="bg-blue-900/30 border-blue-700/50 text-blue-200 hover:bg-blue-800/40 transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 hover-glow"
              >
                <Eye className="size-4 mr-2" /> View Details
              </Button>
              {project.title === "CO₂ Emissions Analysis" ? (
                <Button asChild variant="outline" size="sm" className="hover-glow premium-glow">
                  <a href="/CO2_Emissions_Report.pdf" download className="inline-flex items-center gap-2">
                    <Download className="size-4" />
                  </a>
                </Button>
              ) : project.title === "NextJob — AI-Powered Job Matching" ? (
                <Button asChild variant="outline" size="sm" className="hover-glow premium-glow">
                  <a href="https://next-job-nu.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                    <Link2 className="size-4" />
                  </a>
                </Button>
              ) : (
                <Button asChild variant="outline" size="sm" className="hover-glow">
                  <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                    <Github className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <ProjectModal 
        project={project} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-spacing">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-2xl neon-glow">
                    <Image
                      src="/me.png"
                      alt="Amine Bouanani"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/50"></div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center lg:text-left flex-1"
              >
                <p className="text-sm uppercase tracking-widest text-zinc-400 mb-4">Morocco • Data Science & AI</p>
                <h1 className="heading-gradient text-[40px] md:text-[64px] leading-tight font-bold mb-4">
                  Amine Bouanani
                </h1>
                <p className="text-zinc-300 text-lg md:text-xl mb-6">Data Science, AI & Business Intelligence Engineer</p>
                <p className="text-zinc-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Turning data into intelligence and intelligence into impact.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button asChild size="lg" className="hover-glow">
                    <a href="#projects" className="inline-flex items-center gap-2">View Projects <ArrowUpRight className="size-4" /></a>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="hover-glow">
                    <a href="/Cv Amine Bouanani.pdf" download>Download CV</a>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

      <Separator className="opacity-10" />

      {/* About */}
      <section id="about" className="section-spacing">
        <div className="container-max">
          <SectionHeading title="About" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="premium-card gradient-border">
              <CardContent className="p-6 md:p-8 text-zinc-300 leading-relaxed">
                {/* FIX 3: Replaced apostrophes with &apos; */}
                I&apos;m a Data Science graduate with a Bachelor&apos;s in Statistics and Data Science, currently pursuing an Engineering degree in Data Science and Business Intelligence, and a Master&apos;s in Artificial Intelligence and Digital Science. I&apos;m skilled in Data Science, Data Analysis, BI, and Automation using Python, R, SQL, Tableau, Power BI, and n8n. I also have hands-on experience in machine learning, predictive modeling, data pipelines, and ERP/CRM manipulation to enhance business processes. Passionate about leveraging data and automation to drive AI innovation, optimize decision-making, and support digital transformation across industries.
                
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Python","R","SQL","Tableau","Power BI","n8n","Machine Learning","Data Pipelines"
                  ].map((s) => (
                    <Badge key={s} variant="secondary" className="bg-blue-900/30 border-blue-700/50 text-blue-200 hover:bg-blue-800/40 transition-colors">{s}</Badge>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center gap-4">
                  <a 
                    href="https://github.com/aminebouanani" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    <Github className="size-6" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/amine-bouanani-8944992b6" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    <Linkedin className="size-6" />
                  </a>
                  <a 
                    href="mailto:aminebouanani03@gmail.com"
                    className="text-zinc-400 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    <Mail className="size-6" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Separator className="opacity-10" />

      {/* Academic Journey */}
      <section id="academic" className="section-spacing">
        <div className="container-max">
          <SectionHeading 
            title="Academic Journey" 
            subtitle="Building expertise through rigorous academic training in Data Science, AI, and Business Intelligence"
          />
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>
            
            <div className="space-y-8">
              {[
                {
                  title: "Bachelor's Degree in Statistics and Data Science",
                  institution: "FST Tanger, Abdelmalek Assaidi University",
                  location: "Tanger, Morocco",
                  period: "September 2021 - July 2024",
                  status: "Completed",
                  icon: <GraduationCap className="size-6 text-green-400" />,
                  description: "Comprehensive foundation in statistical analysis, data science methodologies, and quantitative research methods.",
                  highlights: ["Statistical Analysis", "Data Science Fundamentals", "Quantitative Research", "Mathematical Modeling"]
                },
                {
                  title: "Engineering Degree in Data Science and Business Intelligence",
                  institution: "ISMAGI School, Mohammed V University",
                  location: "Rabat, Morocco",
                  period: "September 2024 - August 2026",
                  status: "Currently Enrolled",
                  icon: <BookOpen className="size-6 text-blue-400" />,
                  description: "Advanced engineering program focusing on data science applications and business intelligence solutions for enterprise environments.",
                  highlights: ["Advanced Analytics", "Business Intelligence", "Data Engineering", "Enterprise Solutions"]
                },
                {
                  title: "Master's Degree in AI and Digital Science",
                  institution: "Faculty of Sciences, Mohammed V University",
                  location: "Rabat, Morocco",
                  period: "September 2024 - August 2026",
                  status: "Currently Enrolled",
                  icon: <Award className="size-6 text-purple-400" />,
                  description: "Cutting-edge program in artificial intelligence, machine learning, and digital transformation technologies.",
                  highlights: ["Artificial Intelligence", "Machine Learning", "Digital Transformation", "Advanced Algorithms"]
                }
              ].map((degree, index) => (
                <motion.div
                  key={degree.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-start gap-8"
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-blue-500/30 rounded-full flex items-center justify-center neon-glow relative z-10">
                    {degree.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <Card className="premium-card hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <CardTitle className="text-zinc-100 text-xl">{degree.title}</CardTitle>
                          <Badge 
                            variant="secondary" 
                            className={`${
                              degree.status === 'Completed' 
                                ? 'bg-green-900/30 border-green-700/50 text-green-200' 
                                : 'bg-blue-900/30 border-blue-700/50 text-blue-200'
                            }`}
                          >
                            {degree.status}
                          </Badge>
                        </div>
                        <CardDescription className="text-zinc-300 font-medium text-lg">
                          {degree.institution}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-zinc-400 text-sm flex items-center gap-1">
                            <Globe className="size-4" /> {degree.location}
                          </p>
                          <p className="text-zinc-500 text-sm">{degree.period}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-zinc-300 leading-relaxed mb-4">{degree.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {degree.highlights.map((highlight) => (
                            <Badge key={highlight} variant="secondary" className="bg-zinc-800/60 border-zinc-700 text-zinc-200 hover:bg-blue-900/30 hover:border-blue-700/50 hover:text-blue-200 transition-colors">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="opacity-10" />

      {/* Projects */}
      <section id="projects" className="section-spacing">
        <div className="container-max">
          <SectionHeading
            title="Projects"
            subtitle="Selected work with real-world impact and strong engineering foundations"
            centered={true}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "CO₂ Emissions Analysis",
                image: "/projects/co2.png",
                desc: "Analyzed CO₂ emissions at the port, comparing global and African data; created dashboards and proposed emission-reduction strategies.",
                fullDescription: "Comprehensive analysis of CO₂ emissions at port facilities, comparing global and African data patterns. Developed interactive dashboards using Power BI and created data visualizations with Matplotlib. Proposed actionable emission-reduction strategies based on statistical analysis and trend identification.",
                tech: ["Python", "Pandas", "Matplotlib", "Power BI"],
                github: "https://github.com/aminebouanani/co2-emissions-analysis"
              },
              {
                title: "Darija AI Chatbot (RAG + Gemini)",
                image: "/projects/darija.png",
                desc: "Developed a Darija-speaking chatbot with FAISS indexing and Gemini API using HCP data for socio-economic insights in Moroccan Arabic.",
                fullDescription: "Built an advanced RAG (Retrieval-Augmented Generation) chatbot that speaks Darija (Moroccan Arabic) using FAISS for vector indexing and Gemini API for natural language processing. Integrated HCP (Human Capital Project) data to provide socio-economic insights and analysis in local language.",
                tech: ["Python", "FAISS", "Gemini API", "Streamlit"],
                github: "https://github.com/aminebouanani/chatbot-hcp-project"
              },
              {
                title: "Movie Recommendation System",
                image: "/projects/movie.png",
                desc: "Built a movie recommender with Python, trained on Google Colab, and deployed via Streamlit for personalized film suggestions.",
                fullDescription: "Developed a sophisticated movie recommendation system using collaborative filtering and content-based filtering algorithms. Trained machine learning models on Google Colab and deployed the application using Streamlit for an interactive user experience with personalized film suggestions.",
                tech: ["Python", "Scikit-learn", "Streamlit"],
                github: "https://github.com/aminebouanani/movie-recommender"
              },
              {
                title: "Facial Recognition Attendance System",
                image: "/projects/attendance.png",
                desc: "Created a CVZone + OpenCV-based system linked with Firebase to automate attendance tracking in real time.",
                fullDescription: "Developed a real-time facial recognition system for automated attendance tracking using CVZone and OpenCV for face detection and recognition. Integrated with Firebase for data storage and real-time synchronization, providing accurate attendance management with minimal human intervention.",
                tech: ["Python", "CVZone", "OpenCV", "Firebase"],
                github: "https://github.com/aminebouanani/attendance-management-system"
              },
              {
                title: "Renault Car Management System",
                image: "/projects/renault.png",
                desc: "Helped develop a Renault system tracking cars and parts using Angular + Node.js + PostgreSQL for efficient workflows.",
                fullDescription: "Contributed to the development of a comprehensive car and parts management system for Renault. Built using Angular frontend, Node.js backend, and PostgreSQL database to track vehicle inventory, parts management, and maintenance workflows for improved operational efficiency.",
                tech: ["Angular", "Node.js", "PostgreSQL"],
                github: "https://github.com/aminebouanani/renault-management-system"
              },
              {
                title: "NextJob — AI-Powered Job Matching",
                image: "/projects/nextjob.png",
                desc: "Led the AI/Data department; built two Python models for job-candidate matching and career recommendations, integrated Power BI dashboards.",
                fullDescription: "Led the AI and Data department at NextJob, developing two sophisticated Python machine learning models for intelligent job-candidate matching and personalized career recommendations. Integrated Power BI dashboards for data visualization and analytics, improving job matching accuracy and user experience.",
                tech: ["Python", "React", "Spring Boot", "Power BI"],
                github: "https://github.com/aminebouanani/nextjob"
              },
              {
                title: "AI-Powered Customer Feedback System",
                image: "/projects/feedback.png",
                desc: "Automated feedback collection via n8n, AI-classified messages from Reddit, email, and Tally, and routed issues to Discord for rapid response.",
                fullDescription: "Built an end-to-end automation system for customer feedback collection and processing. Used n8n for workflow automation, AI classification of messages from multiple sources (Reddit, email, Tally), and automated routing to Discord channels for rapid response and issue resolution.",
                tech: ["n8n", "OpenAI API", "Discord API"],
                github: "https://github.com/aminebouanani/feedback-automation"
              }
            ].map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Separator className="opacity-10" />

      {/* Skills */}
      <section id="skills" className="section-spacing">
        <div className="container-max">
          <SectionHeading 
            title="Skills" 
            subtitle="Technical expertise across data science, AI, and business intelligence"
            centered={true}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Programming", 
                icon: <Code className="size-6 text-blue-400" />,
                items: ["Python","R","SQL","JavaScript (React)"] 
              },
              { 
                title: "Frameworks", 
                icon: <Globe className="size-6 text-purple-400" />,
                items: ["Angular","Django"] 
              },
              { 
                title: "Data Science", 
                icon: <BarChart3 className="size-6 text-green-400" />,
                items: ["Machine Learning","Data Preprocessing","Model Evaluation"] 
              },
              { 
                title: "AI", 
                icon: <Brain className="size-6 text-pink-400" />,
                items: ["TensorFlow","Scikit-learn","PyTorch"] 
              },
              { 
                title: "Data Engineering", 
                icon: <Database className="size-6 text-orange-400" />,
                items: ["ETL","Data Pipelines"] 
              },
              { 
                title: "Data Analysis & Visualization", 
                icon: <BarChart3 className="size-6 text-cyan-400" />,
                items: ["Pandas","NumPy","Matplotlib","Tableau","Power BI"] 
              },
              { 
                title: "Web Scraping", 
                icon: <Globe className="size-6 text-yellow-400" />,
                items: ["BeautifulSoup","Selenium"] 
              },
              { 
                title: "ERP & CRM", 
                icon: <Users className="size-6 text-indigo-400" />,
                items: ["Odoo"] 
              },
              { 
                title: "Big Data", 
                icon: <Cpu className="size-6 text-red-400" />,
                items: ["Hadoop","Spark","MongoDB"] 
              },
              { 
                title: "Soft Skills", 
                icon: <Lightbulb className="size-6 text-emerald-400" />,
                items: ["Problem-Solving","Collaboration","Communication"] 
              },
            ].map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full premium-card hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      {cat.icon}
                      <CardTitle className="text-zinc-100 text-lg">{cat.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((s) => (
                        <Badge key={s} variant="secondary" className="bg-zinc-800/60 border-zinc-700 text-zinc-200 hover:bg-blue-900/30 hover:border-blue-700/50 hover:text-blue-200 transition-colors">{s}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="opacity-10" />

      {/* Contact */}
      <section id="contact" className="section-spacing">
        <div className="container-max">
          <SectionHeading title="Contact" subtitle="Let’s build something impactful together" />
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-zinc-100">Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <Input placeholder="Your name" required />
                  <Input type="email" placeholder="Your email" required />
                  <Textarea placeholder="Your message" rows={5} required />
                  <Button type="submit">Send</Button>
                </form>
              </CardContent>
            </Card>
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-zinc-100">Connect</CardTitle>
                <CardDescription className="text-zinc-400">Prefer email or social? Reach out here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <a 
                    className="inline-flex items-center gap-3 text-zinc-300 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                    href="mailto:aminebouanani03@gmail.com"
                  >
                    <Mail className="size-5" /> aminebouanani03@gmail.com
                  </a>
                  <a 
                    className="inline-flex items-center gap-3 text-zinc-300 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                    href="https://www.linkedin.com/in/amine-bouanani-8944992b6" 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    <Linkedin className="size-5" /> LinkedIn
                  </a>
                  <a 
                    className="inline-flex items-center gap-3 text-zinc-300 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                    href="https://github.com/aminebouanani" 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    <Github className="size-5" /> GitHub
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800/60">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-sm">
            <p>© 2025 Amine Bouanani — All rights reserved.</p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/aminebouanani" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                >
                  <Github className="size-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/amine-bouanani-8944992b6" 
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                >
                  <Linkedin className="size-5" />
        </a>
                <a 
                  href="mailto:aminebouanani03@gmail.com"
                  className="text-zinc-400 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                >
                  <Mail className="size-5" />
                </a>
              </div>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="hover:text-zinc-300 transition-colors"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}