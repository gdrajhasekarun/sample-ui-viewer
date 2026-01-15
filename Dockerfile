# Stage 1: Build the React Vite application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create health check endpoint script
RUN echo -e '#!/bin/sh\nwget --quiet --tries=1 --spider http://localhost:80/health || exit 1' > /health-check.sh && \
    chmod +x /health-check.sh

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD /health-check.sh

# Start nginx
CMD ["nginx", "-g", "daemon off;"]