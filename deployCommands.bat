:: Script to deploy commands in DEV MODE

@ECHO OFF
ECHO --- Deployment [Development] ---
node core/deployment/deployCommands.js --prod
PAUSE