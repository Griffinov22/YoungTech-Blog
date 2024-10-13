# Young Tech Blog
## Hosted: <a href="https://black-tree-0289eca0f.5.azurestaticapps.net/">here</a>

This is a personal full stack web application to get me introduced to:

- Azure SQL
- Azure Authentication
- Azure web hosting
- Azure Blob Storage
- and NodeJS

## Where Is This Hosted?

- Frontend:
  - Microsoft Azure Static Webapp
    - CI/CD Pipeline through Github Actions

- Backend:
  - Microsoft Azure Web App

## Things discovered / learned

Hosting a NodeJS application through Microsoft Azure is insanely difficult through github actions. There is almost next to no documentation for CI/CD pipeline libraries that azure use for deployment. The build will succeed, and then I can't see anything in the wwwroot folder on the webapp. I decided to host it on Render instead.

Update: VS Code extension for Azure web apps made hosting my Node.js backend easier. There has been occasions where I make a small change, and then click to trigger a re-upload of my updated backend change and the change would fail, but if I tried again, it works. I don't know what is going on there, but current prod is working.
