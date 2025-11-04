import type { LevelExpectation } from "../types";

export const levelExpectations: LevelExpectation[] = [
  {
    level: "IC4",
    function: "BA",
    expectations: [
      {
        category: "Technical Skills",
        items: [
          "Proficient in SQL for data analysis",
          "Basic understanding of experimentation and A/B testing",
          "Ability to create clear data visualizations",
          "Familiarity with analytics tools (e.g., Tableau, Looker)",
        ],
      },
      {
        category: "Decision Making",
        items: [
          "Can make data-informed decisions with guidance",
          "Understands decision frameworks",
          "Asks clarifying questions when facing ambiguity",
        ],
      },
      {
        category: "Communication",
        items: [
          "Clear written and verbal communication",
          "Can present findings to stakeholders",
          "Basic storytelling with data",
        ],
      },
      {
        category: "Execution",
        items: [
          "Owns and delivers on assigned projects",
          "Manages time effectively",
          "Seeks feedback and incorporates it",
        ],
      },
    ],
    skills: [
      { name: "SQL", expectedLevel: 4, description: "Proficient in complex queries and joins" },
      { name: "Decision Making", expectedLevel: 3, description: "Can make decisions with guidance" },
      { name: "Experimentation", expectedLevel: 3, description: "Understands A/B testing basics" },
      { name: "Communication", expectedLevel: 3, description: "Clear presentation skills" },
      { name: "Storytelling", expectedLevel: 3, description: "Basic data storytelling" },
    ],
  },
  {
    level: "IC5",
    function: "BA",
    expectations: [
      {
        category: "Technical Skills",
        items: [
          "Advanced SQL skills with optimization",
          "Designs and runs experiments independently",
          "Creates sophisticated analytics models",
          "Mentors junior analysts on technical topics",
        ],
      },
      {
        category: "Decision Making",
        items: [
          "Makes independent data-informed decisions",
          "Applies decision frameworks effectively",
          "Handles ambiguity with minimal guidance",
        ],
      },
      {
        category: "Communication",
        items: [
          "Influences stakeholders through data",
          "Crafts compelling narratives",
          "Presents to leadership effectively",
        ],
      },
      {
        category: "Execution",
        items: [
          "Owns complex, multi-quarter projects",
          "Anticipates and mitigates risks",
          "Drives impact across teams",
        ],
      },
    ],
    skills: [
      { name: "SQL", expectedLevel: 5, description: "Advanced optimization and performance tuning" },
      { name: "Decision Making", expectedLevel: 4, description: "Independent decision-making" },
      { name: "Experimentation", expectedLevel: 4, description: "Designs experiments independently" },
      { name: "Communication", expectedLevel: 4, description: "Influences through data" },
      { name: "Storytelling", expectedLevel: 4, description: "Compelling narratives" },
      { name: "Leadership", expectedLevel: 3, description: "Mentors junior team members" },
    ],
  },
  {
    level: "IC6",
    function: "Program Manager",
    expectations: [
      {
        category: "Technical Skills",
        items: [
          "Strategic understanding of analytics ecosystem",
          "Evaluates and selects tools and frameworks",
          "Drives technical excellence across programs",
        ],
      },
      {
        category: "Decision Making",
        items: [
          "Makes strategic decisions under high ambiguity",
          "Develops decision frameworks for the organization",
          "Balances multiple competing priorities",
        ],
      },
      {
        category: "Communication",
        items: [
          "Influences at executive level",
          "Articulates complex strategies clearly",
          "Builds alignment across multiple teams",
        ],
      },
      {
        category: "Execution",
        items: [
          "Owns organization-wide initiatives",
          "Scales programs across BUs and chapters",
          "Sets strategic direction for teams",
        ],
      },
    ],
    skills: [
      { name: "Decision Making", expectedLevel: 5, description: "Strategic decisions under ambiguity" },
      { name: "Leadership", expectedLevel: 5, description: "Sets strategic direction" },
      { name: "Communication", expectedLevel: 5, description: "Executive-level influence" },
      { name: "Strategic Thinking", expectedLevel: 5, description: "Organization-wide strategy" },
      { name: "Program Management", expectedLevel: 5, description: "Scales programs across org" },
    ],
  },
  {
    level: "IC5",
    function: "DS",
    expectations: [
      {
        category: "Technical Skills",
        items: [
          "Advanced Python and ML skills",
          "Builds production ML models",
          "Strong statistical foundation",
          "Mentors junior data scientists",
        ],
      },
      {
        category: "Decision Making",
        items: [
          "Makes technical decisions independently",
          "Evaluates trade-offs in model design",
          "Handles ambiguity in problem formulation",
        ],
      },
      {
        category: "Communication",
        items: [
          "Explains complex ML concepts clearly",
          "Presents technical work to non-technical audiences",
          "Influences technical direction",
        ],
      },
      {
        category: "Execution",
        items: [
          "Owns end-to-end ML projects",
          "Delivers models to production",
          "Drives technical excellence",
        ],
      },
    ],
    skills: [
      { name: "Python", expectedLevel: 5, description: "Advanced ML and data science" },
      { name: "ML", expectedLevel: 4, description: "Production ML models" },
      { name: "SQL", expectedLevel: 5, description: "Complex data pipelines" },
      { name: "Decision Making", expectedLevel: 4, description: "Technical decisions" },
      { name: "Communication", expectedLevel: 4, description: "Technical communication" },
      { name: "Leadership", expectedLevel: 3, description: "Mentors junior DS" },
    ],
  },
];

