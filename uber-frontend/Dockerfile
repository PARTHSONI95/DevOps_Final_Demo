FROM nginx
COPY build /usr/share/nginx/html
ARG REACT_APP_URL
ENV REACT_APP_URL $REACT_APP_URL
# FROM node:15.2.0-alpine as builder
# WORKDIR /usr/src/app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# COPY package.json .
# COPY package-lock.json .
# RUN npm ci
# ARG REACT_APP_URL
# ENV REACT_APP_URL $REACT_APP_URL
# COPY . .
# RUN npm run build
# FROM nginx
# COPY front-end.nginx /
# RUN mv front-end.nginx /etc/nginx/conf.d/default.conf
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html