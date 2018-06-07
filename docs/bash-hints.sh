# Start POSTGRES
brew services start postgresql

# Enter local docker container
docker exec -i -t d58 /bin/bash

# Enter POSTGRES CLI
psql postgres://postgres:postgres@localhost:5432/belsky_insurance

# PSQL output mode
\x\g

# Table information
\d table-name

# Move repo to single file
cat `find client -type f  -not -name "*.png"` >> client.txt
cat `find server -type f  -not -name "*.png"` >> server.txt # Remove top binary lines
cat client.txt server.txt build/deploy.sh .babelrc package.json Procfile webpack.config.js >> result.txt