const NodeGit = require('nodegit');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const d3 = require('d3');
const { createCanvas } = require('canvas');

async function generateCommitTree() {
  const repo = await NodeGit.Repository.open(".");
  const firstCommitOnMaster = await repo.getMasterCommit();

  // Create a history event emitter.
  const history = firstCommitOnMaster.history();

  let commits = [];
  history.on("commit", (commit) => {
    commits.push({
      sha: commit.sha().substring(0, 7),
      message: commit.message(),
      date: commit.date(),
      author: commit.author().name(),
    });
  });

  await new Promise((resolve, reject) => {
    history.on("end", resolve);
    history.on("error", reject);
    history.start();
  });

  // Set up D3.js with jsdom
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  const dom = new JSDOM('<!DOCTYPE html><html><body><div id="container"></div></body></html>');
  const body = d3.select(dom.window.document).select("body");
  const container = body.select("#container");

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

  const tree = d3.tree()
    .size([height - 200, width - 160]);

  const root = d3.hierarchy({ children: commits });

  tree(root);

  const link = svg.selectAll(".link")
    .data(root.descendants().slice(1))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", (d) => {
      return "M" + d.y + "," + d.x
        + "C" + (d.y + d.parent.y) / 2 + "," + d.x
        + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
        + " " + d.parent.y + "," + d.parent.x;
    });

  const node = svg.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", (d) => "node" + (d.children ? " node--internal" : " node--leaf"))
    .attr("transform", (d) => "translate(" + d.y + "," + d.x + ")");

  node.append("circle")
    .attr("r", 10);

  node.append("text")
    .attr("dy", ".35em")
    .attr("x", (d) => d.children ? -13 : 13)
    .style("text-anchor", (d) => d.children ? "end" : "start")
    .text((d) => d.data.message);

  const svgString = body.select("svg").node().outerHTML;
  fs.writeFileSync('commit-tree.svg', svgString);
  console.log('The file has been saved!');
}

generateCommitTree().catch(console.error);
