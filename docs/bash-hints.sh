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

