FROM --platform=linux/amd64 nginx:1.14.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
ADD ./dist /var/www/html
EXPOSE 80