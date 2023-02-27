# MMM-transport
Code for programming assignment 2 (Cloud and Edge Computing course) 

### [Final project demo on youtube (Personalized MagicMirror)](https://www.youtube.com/watch?v=p1qFni5OQ54)

Group work: microservice application based on MagicMirror

1. Face recognition module (https://github.com/Linzh7/FaceRecognition-MagicMirror)
2. Personal content module running in Docker, possibly self-hosted (https://github.com/noahwo/MMM-personal-agenda) 
3. Service orchestration within MagicMirror running in Docker (Kalle P.)
4. Public transport module deployed to cloud (me)


The module draft wis based on built-in modules code for MagicMirror and
[roramirez template](https://github.com/roramirez/MagicMirror-Module-Template). 

Project state (transport module): done. 

## Project setup
![Transport information when no user authenticated](/.github/setup.jpg?raw=true)
(Picture made by Kalle Paananen)


In this project we omit the user registration and assume that there are 4 registered users who have specified their preferences. 

The transport module shows bus arrival times for a specific bus stop. The module fetches bus information from the mocked API which runs in [replit](https://replit.com). The code for mock is in the file `mockApi.js`. 

![Transport information when no user authenticated](/.github/screenshot1.png?raw=true)
![Transport information for the authenticated user](/.github/screenshot2.png?raw=true)

## Configuration
The transport module can be connected to the MagicMirror by adding the following configuration to the `config/config.js`: 

```javascript
{
	module: "mmm-transport",
	position: "top_left",
	header: "Bus arrival times"
}
```