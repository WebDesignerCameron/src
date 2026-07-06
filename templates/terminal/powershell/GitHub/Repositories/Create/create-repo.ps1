# 1. Define your repository name (change 'my-awesome-site' to what you want)
$repoName = "my-awesome-site"

# 2. Initialize local git repository and stage all files
git init -b main
git add .
git commit -m "Initial commit for GitHub Pages"

# 3. Create the public repository on GitHub using the GitHub CLI
# (This automatically hooks up the 'origin' remote and pushes your main branch)
gh repo create $repoName --public --source=. --push

# 4. Configure GitHub Pages to build and deploy directly from the 'main' branch
gh api repos/:owner/$repoName/pages `
  -X POST `
  -H "Accept: application/vnd.github+json" `
  -F "source[branch]=main" `
  -F "source[path]=/"

Write-Host "Success! Your repository is live and GitHub Pages is deploying from the main branch." -ForegroundColor Green
