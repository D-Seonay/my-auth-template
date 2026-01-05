# My Auth Template

This project is a full-stack authentication template, providing a robust backend built with NestJS and a dynamic frontend developed with React. It features user registration, login, and Google OAuth for seamless authentication. The entire application is containerized using Docker Compose, making it easy to set up and run in various environments, with PostgreSQL serving as the database.

## Features

-   **User Authentication**: Secure user registration and login functionalities.
-   **Google OAuth**: Integrate Google for social login, enhancing user experience.
-   **JWT-based Authentication**: Secure API endpoints using JSON Web Tokens.
-   **NestJS Backend**: A progressive Node.js framework for building efficient and scalable server-side applications.
-   **React Frontend**: A modern JavaScript library for building user interfaces.
-   **PostgreSQL Database**: A powerful, open-source object-relational database system.
-   **Docker Compose**: Easy setup and management of multi-container Docker applications for local development.

## Technologies Used

### Backend
-   **Framework**: NestJS
-   **Language**: TypeScript
-   **Authentication**: Passport.js (JWT, Google OAuth2)
-   **Database ORM**: Prisma
-   **Database**: PostgreSQL

### Frontend
-   **Framework**: React
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, Shadcn UI
-   **Routing**: React Router DOM

### Other
-   **Containerization**: Docker, Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Installation

Follow these steps to get your development environment running:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/D-Seonay/my-auth-template.git
    cd my-auth-template
    ```

2.  **Configure Environment Variables**:
    *   Navigate to the `backend` directory: `cd backend`
    *   Copy the `.env.example` file to `.env`:
        ```bash
        cp .env.example .env
        ```
    *   Open `backend/.env` and fill in your specific environment variables, especially for Google OAuth. Refer to the "Google OAuth Configuration" section below.

3.  **Build and Run with Docker Compose**:
    *   Navigate back to the project root directory: `cd ..`
    *   Build and start the Docker containers:
        ```bash
        docker-compose up --build
        ```
    This command will:
    -   Build Docker images for both the backend and frontend.
    -   Start the PostgreSQL database, backend, and frontend services.
    -   Run Prisma migrations to set up your database schema.

## Google OAuth Configuration

To enable Google OAuth, you need to create a Google Cloud Project and obtain API credentials.

1.  **Create a Google Cloud Project**: Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2.  **Enable the Google People API**: In the Cloud Console, search for "Google People API" and enable it.
3.  **Create OAuth 2.0 Client IDs**:
    *   Go to "APIs & Services" > "Credentials".
    *   Click "CREATE CREDENTIALS" and select "OAuth client ID".
    *   Choose "Web application".
    *   **Authorized JavaScript origins**: Add `http://localhost:5173` (your frontend URL).
    *   **Authorized redirect URIs**: Add `http://localhost:3000/auth/google/callback` (your backend callback URL).
    *   This will give you a **Client ID** and **Client Secret**.
4.  **Update `backend/.env`**:
    Open the `backend/.env` file and set the following variables with your obtained credentials:
    ```
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
    GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
    OAUTH_SUCCESS_REDIRECT_URL=http://localhost:5173/oauth/success
    ```

## Usage

Once the services are up and running:

-   **Frontend**: Access the React application at `http://localhost:5173`
-   **Backend API**: The NestJS API will be available at `http://localhost:3000`.

You can now register new users, log in with email/password, or use the "Continuer avec Google" button on the login page.

## Project Structure

-   `backend/`: Contains the NestJS API application.
    -   `src/`: Backend source code.
    -   `prisma/`: Prisma schema and migrations.
-   `frontend/`: Contains the React client application.
    -   `src/`: Frontend source code.
    -   `components/`: Reusable React components.
    -   `pages/`: React page components.
-   `docker-compose.yml`: Defines the services, networks, and volumes for the Dockerized application.
-   `k8s/`: Contains the Kubernetes configuration files.

## Kubernetes Deployment

To deploy this application to a Kubernetes cluster, follow these steps.

### 1. Build and Push Docker Images

Before deploying to Kubernetes, you need to build the Docker images for the frontend and backend and push them to a container registry (e.g., Docker Hub, Google Container Registry, Amazon ECR).

-   **Backend Image**:
    ```bash
    docker build -t your-registry/your-backend-image:latest ./backend
    docker push your-registry/your-backend-image:latest
    ```

-   **Frontend Image**:
    ```bash
    docker build -t your-registry/your-frontend-image:latest ./frontend
    docker push your-registry/your-frontend-image:latest
    ```
    Replace `your-registry/your-backend-image:latest` and `your-registry/your-frontend-image:latest` with your actual image names.

### 2. Configure Kubernetes Secrets

The Kubernetes configuration uses secrets to manage sensitive information. You need to provide these secrets before deploying.

1.  **Encode Your Secrets**:
    The `k8s/secrets.yml` file requires base64 encoded values. You can encode your secrets using the following command:
    ```bash
    echo -n 'your-secret-value' | base64
    ```
    You will need to do this for:
    -   PostgreSQL password
    -   JWT secret
    -   Google Client ID
    -   Google Client Secret

2.  **Update `k8s/secrets.yml`**:
    Replace the placeholder values in `k8s/secrets.yml` with your base64 encoded secrets.

### 3. Update Configuration Files

-   **Image Names**:
    -   In `k8s/backend.yml`, replace `your-docker-registry/your-backend-image:latest` with your backend image URI.
    -   In `k8s/frontend.yml`, replace `your-docker-registry/your-frontend-image:latest` with your frontend image URI.

-   **Domain Name**:
    -   In `k8s/frontend.yml`, replace `<YOUR_DOMAIN>` in the `Ingress` resource with the domain you will use to access the application.
    -   In `k8s/configmaps.yml`, replace `<YOUR_DOMAIN>` in the `OAUTH_SUCCESS_REDIRECT_URL`.

### 4. Deploy to Kubernetes

Once you have configured your images and secrets, you can deploy the application using `kubectl`.

```bash
kubectl apply -k k8s/
```

This command will:
-   Create all the necessary Kubernetes resources defined in the `k8s` directory.
-   Deploy the PostgreSQL database, backend, and frontend to your cluster.

### 5. Accessing the Application

After the deployment is complete and the pods are running, you can access your application at the domain you configured in the frontend `Ingress` resource.

To check the status of your pods, you can run:
```bash
kubectl get pods
```

To view the logs of a specific pod:
```bash
kubectl logs <pod-name>
```

## Contributing

Feel free to fork the repository, open issues, and submit pull requests.

## License

This project is licensed under the MIT License.