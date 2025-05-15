# Phase 3 – Extra Feature or Improvements (Optional)


---
#### Azure Static Web App Deployment
Previously, the project was running locally, requiring users to manually startup and configure for both frontend and backend. To improve accessibility and performance, the frontend was deployed using **Azure Static Web Apps**, allowing users to access the application online without manual setup.

#### Why This Feature?
**Faster Deployment**: Allows easy deployment and hosting with GitHub integration.

**Automatic Updates**: Any new code pushed to the repository gets deployed automatically.

---

## 🔍 Original Definition

The initial deployment plan was manual, requiring users to clone the repository and run it locally. Cloud deployment was considered as a future improvement for accessibility and scalability.

---

## 🔄 Implementation

#### Frontend Deployment with Azure Static Web Apps

**Steps Taken:**

- Created an Azure Static Web App through the Azure portal.

- Connected the GitHub repository for automatic deployment.

- Deployed the frontend without modifying vite.config.js, relying on default settings.

**Outcome:**

- Frontend is now accessible online through Azure Static Web Apps. URL: https://zealous-coast-040c6d410.6.azurestaticapps.net/

- Users no longer need to run the frontend manually.

**Future optimization**: Updating vite.config.js for better path handling.

#### Backend Deployment (Manual Execution)
**Steps Taken:**

- Instead of deploying to a cloud service, the backend is manually run using VS Code.

- The backend starts with the command: node server.js
- Users who need backend functionality must run it locally.

**Outcome:**

- Backend remains local and is not hosted on Azure yet.

- Users must manually start the backend to access API services.

**Future improvement:** Deploying the backend to Azure App Service for remote access.



#### Challenges Faced & Solutions

| **Challenge**         | **Solution** |
|--------------------|------------|
| Frontend paths not updated for Azure       | Kept default setting without modifying vite.config.js |
| Backend not deployed remotely      | Kept manual execution; plan for Azure hosting later |
|Debugging Azure deployment errors|	Verified Github Actions logs for troubleshooting |
	
#### Outcome
- Successfully deployed the frontend with Azure Static Web Apps.

- Backend runs manually but could be improved with future cloud deployment.

#### Future Improvements
- Modify vite.config.js for better frontend path handling.

- Host backend on Azure App Service for full cloud accessibility.

- Implement CI/CD improvements for seamless deployment.