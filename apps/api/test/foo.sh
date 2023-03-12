#bash
docker exec -i postgress_db1 pg_restore -d starter_db -U admin --clean < ./apps/api/test/tecmintdb.dump