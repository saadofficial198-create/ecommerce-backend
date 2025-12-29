<h1>Ecommerce Backend</h1>

<p>This repository contains the backend of the ecommerce application. It is built using Node.js and Express.js and follows a clean and professional structure suitable for production use.

The backend handles user authentication, product management, media handling, cart operations, and order processing. MongoDB is used as the primary database with Mongoose for schema design and data validation.

Authentication is implemented using JSON Web Tokens to secure APIs and protect sensitive routes. Role based access control is used to separate admin features from normal users. A limited role called Product Entry Officer is also implemented, which allows controlled access for product management.

Images are stored using Cloudinary to ensure better performance and scalability. The backend provides APIs for image uploads, fetching media details, and managing product related assets.

Environment variables are used for sensitive configuration such as database connection strings, JWT secrets, and Cloudinary credentials. This ensures security across both local and live environments.

The backend is deployed on Render and is continuously improved. New features, security updates, and performance enhancements are added over time as the project evolves.</p>
