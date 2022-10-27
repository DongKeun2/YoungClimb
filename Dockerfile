FROM openjdk:11-jre-alpine
WORKDIR youngclimb
EXPOSE 8080
COPY ./build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
CMD ["java","-jar","app.jar"]

FROM node:16.16.0 as build-stage
WORKDIR /var/jenkins_home/workspace/YoungClimb/front-webview
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /var/jenkins_home/workspace/YoungClimb/front-webview/dist/usr/share/nginx/html
# Nginx 설정 (Nginx 설정 전에는 주석처리해두어야 에러가 나지 않음)
# COPY --from=build-stage /var/jenkins_home/workspace/{젠킨스프로젝트이름}/{react repo이름}/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g","daemon off;"]