# uuid-type

Provides a UUID data type to Saltcorn, which may be used as a primary key or as any other field.

To use the UUID type as a primary key for a table:

* Install this plug-in from the store. 
* create the table as usual
* edit the ID field befor adding any rows, switching to type to UUID

Note that to use this plug-in, you will have to have the `uuid-ossp` extension installed in PostgreSQL. 
This cannot be done from inside Saltcorn as it requires administrative access to your database. 
As `postgres` user, you should run this command on the database saltcorn uses:

```
create extension if not exists "uuid-ossp";
```

For instance, if your database is called saltcorn and you are logged in as root, you can run the following shell command:

```
sudo -iu postgres psql -U postgres -d saltcorn -c 'create extension if not exists "uuid-ossp";'
```

Note that if you reset your schema using `saltcorn reset-schema`, you may have to run this command again.

On recent DigitalOcean marketplace droplets (initial version >=0.4.4) the `uuid-ossp` extension has already been installed. If you have 
a droplet created prior to that, upgrading Saltcorn will not issue this command on its own. You will need to 
issue the command to create the extension on the terminal.
