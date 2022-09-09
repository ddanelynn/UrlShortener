# UrlShortener

### Features
* Shorten a given URL
* Easy copy to clipboard
* Raise invalid URL warning
* Responsive UI

### Tech Stack
ReactJs - Express - NodeJs - MySql

### Setup Instruction
* Navigate to client directory, run `npm start`
* Navigate to server directory, run `nodemon index.js`
* You must have mySql installed
  * Since local instance is used, please set up the database on your side.
  * Create a connection:
  ```
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'URLShortenerDB'
  ```
  * Create a Schema named `URLShortenerDB`
  * Create a table named `url`
  * Create columns as follow
  <br/>
  <img width="153" alt="Screenshot 2022-09-09 at 11 32 28 PM" src="https://user-images.githubusercontent.com/66818697/189387337-7195fa24-7f99-45fb-8c1a-c1ab489791ec.png">



### Mobile UI
![Screenshot 2022-09-08 at 5 57 57 PM](https://user-images.githubusercontent.com/66818697/189093691-8f19fe01-f835-4f4f-9435-67ad09486105.png)

### Web UI
![Screenshot 2022-09-08 at 5 59 10 PM](https://user-images.githubusercontent.com/66818697/189093954-1495e905-331b-4c23-875d-187546c45364.png)
![Screenshot 2022-09-08 at 5 59 36 PM](https://user-images.githubusercontent.com/66818697/189094054-cfe0ce8b-999a-4058-92cd-68a67fcc6b9f.png)
