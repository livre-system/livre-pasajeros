FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY logo_livre.png /usr/share/nginx/html/logo_livre.png
COPY tracking-polling.js /usr/share/nginx/html/tracking-polling.js
COPY privacy.html /usr/share/nginx/html/privacy.html
COPY terms.html /usr/share/nginx/html/terms.html
COPY support.html /usr/share/nginx/html/support.html
COPY payment.html /usr/share/nginx/html/payment.html

EXPOSE 80
