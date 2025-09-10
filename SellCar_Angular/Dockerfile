# --------- STAGE 1: Build Angular ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json & lockfile trước
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy toàn bộ source code & build
COPY . .
RUN npm run build --configuration production

# --------- STAGE 2: Nginx Serve ----------
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# Copy Angular dist vào Nginx
COPY --from=build /app/dist/sell-car-angular ./

# Copy cấu hình Nginx custom cho Angular SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off"]
