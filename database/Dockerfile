FROM postgres:15-alpine

# Environment variables (assignment requirement)
ENV POSTGRES_DB=mydb
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

# Volume for persistence
VOLUME ["/var/lib/postgresql/data"]

EXPOSE 5432