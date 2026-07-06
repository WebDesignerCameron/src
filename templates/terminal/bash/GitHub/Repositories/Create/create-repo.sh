#!/bin/bash

# Ensure a repository name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <repository-name>"
    exit 1
fi

REPO_NAME=$1

# Initialize local git repository
git init

# Add all files and make the initial commit
git add .
git commit -m "Initial commit"
git branch -M main

# Create the repository on GitHub and push (Requires GitHub CLI logged in)
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

# Enable GitHub Pages and set the source to the root of the main branch
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/:owner/"$REPO_NAME"/pages \
  -f "source[branch]=main" -f "source[path]=/"

echo "Repository created, files pushed, and GitHub Pages enabled on 'main' branch!"