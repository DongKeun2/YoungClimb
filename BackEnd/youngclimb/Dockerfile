FROM openjdk:11-jdk
WORKDIR youngclimb
EXPOSE 8080
COPY ./build/libs/*.jar /home/spring/application.jar
CMD ["java","-jar","/home/spring/application.jar"]