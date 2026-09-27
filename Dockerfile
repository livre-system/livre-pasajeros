FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY logo_livre.png /usr/share/nginx/html/logo_livre.png
EXPOSE 80
