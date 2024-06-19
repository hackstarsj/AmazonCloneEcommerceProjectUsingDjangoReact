const { execSync } = require('child_process');
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

  // Get commits from git log
  const log = execSync('git log --pretty=format:"%h %p %s" --graph --all').toString();
  const commits = log.split('\n').map(line => {
    const [hash, parent, ...message] = line.trim().split(' ');
    return { hash, parent, message: message.join(' ') };
  });

  const branches = new Map();
  const main = gitgraph.branch('master');
  branches.set('master', main);

  // Process commits
  commits.forEach(commit => {
    const { hash, parent, message } = commit;
    const parentBranch = branches.get(parent) || main;
    const newBranch = parentBranch.branch(hash);
    newBranch.commit(message);
    branches.set(hash, newBranch);
  });

  // Save canvas to file
  const buffer = canvas.toBuffer('image/png');
  await writeFile('commit-tree.png', buffer);
  console.log('The file has been saved!');
};

generateGitGraph().catch(console.error);
