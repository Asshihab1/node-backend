📦 Node.js OData API
A RESTful API built using Node.js, OData for flexible data querying, and Prisma ORM for clean, type-safe database access.

🏢 Project Info
Company: Hybritech Innovation LTD

Author: Shihab

Authentication: Custom implementation (e.g., JWT/OAuth)

Maintained by: Hybritech Innovation LTD

🛠️ Tech Stack
Layer	Technology
Backend	Node.js
API Protocol	OData v4
ORM	Prisma
Database	PostgreSQL / MySQL (please specify if needed)
Auth Mechanism	JWT or OAuth


<!-- Odata querys -->

$orderby=id desc
$orderby=id desc name asc

edit :
     Products(3)

delete : 
     Products(2)     


expand relation
        odata/Products?$expand=orders


only count : 
        odata/Products/$count 
        



