const { writeFile } = require('fs-extra');
const { Gitgraph } = require('@gitgraph/js');
const { createCanvas } = require('canvas');

// Function to generate the git graph
const generateGitGraph = async () => {
  // Create canvas
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Initialize Gitgraph
  const gitgraph = new Gitgraph(ctx);

  // Create the main branch
  const master = gitgraph.branch("main");
  master.commit("Initial commit");

  // Add more commits
  master.commit("Second commit");
  master.commit("Third commit");

  // Create feature branch
  const feature = master.branch("feature-branch");
  feature.commit("Feature commit");

  // Merge feature branch back to main
  feature.merge(master, "Merge feature branch");

  // Save canvas to file
  const buffer = canvas.toBuffer('image/png');
  await writeFile('commit-tree.png', buffer);
  console.log('The file has been saved!');
};

generateGitGraph();
