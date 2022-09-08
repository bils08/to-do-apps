# Getting Started with to-do-apps

After the repository has been cloned, please run:

### `yarn install`

To install all dependency and node_modules needed for running the API Services

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app.\
Open [http://localhost:5000/health-check](http://localhost:5000/health-check) to see API Services connection status.

## API Services URLs

These are the Url list to test the services: 

a. [http://localhost:5000/api/users/add](http://localhost:5000/api/users/add) method POST, to add/register new user

b. [http://localhost:5000/api/login](http://localhost:5000/api/login) method POST, to login 

c. [http://localhost:5000/api/logout](http://localhost:5000/api/logout) method POST, to logout

d. [http://localhost:5000/api/todo/add](http://localhost:5000/api/todo/add) method POST, to add new todo list

e. [http://localhost:5000/api/todo/list](http://localhost:5000/api/todo/list) method GET, to display all todo list 

f. [http://localhost:5000/api/todo/:todoId](http://localhost:5000/api/todo/:todoId) method PUT, to update status of a single todo 

g. [http://localhost:5000/api/todo/:todoId](http://localhost:5000/api/todo/:todoId) method DELETE, to delete of a single todo 


## Proses-proses yang dijalankan untuk mengetes service

### STEP register user, login, logout 
1. User dapat membuat akun dengan menginput: username, email, password dan confirmation password - menggunakan url (a).
2. Setelah user menambahkan akun, user dapat login dengan menginput username dan password yang telah dibuat - menggunakan url (b).
3. Jika login berhasil, maka akan mengembalikan respon berupa access token yang nantinya akan digunakan untuk melakukan aksi lainnya.
4. Jika logout cukup menggunakan url (c), jika berhasil akan menampilkan kembalian respon berupa access token dan refresh token yang telah dihapus.\

### STEP add, view list, update dan delete todo
1. Setelah login dan mendapatkan access token, user dapat menambahkan data todo dengan menginput: status dan todo - menggunakan url(d).
2. Untuk menampilkan list todo yang pernah ditambahkan dapat menggunakan url(e).
    - Saat membuat todo harus dalam status sudah login dan menggunakan token yang diberikan saat login.
    - Todo yang ditambahkan akan memiliki data user yang sedang dipakai login sebagai tanda user yang berhak melakukan perubahan pada todo tersebut.
3. Untuk mengupdate status pada salah satu todo, input status beserta nama statusnya(ToDo, Hold, In Progress, Done) - menggunakan url(f)
    - {todoId} perlu ditambahkan sebagai parameter id, dan untuk melihat id tersebut dapat dilihat dari list todo pada step 2.
    - Update status tidak dapat dilakukan jika user yang dipakai untuk login bukan merupakan user yang dipakai saat menambahakan todo tersebut.
4. Untuk menghapus salah satu todo menggunakan url(g).
    - {todoId} perlu ditambahkan sebagai parameter id, dan untuk melihat id tersebut dapat dilihat dari list todo pada step 2.
    - Delete data todo tidak dapat dilakukan jika user yang dipakai untuk login bukan merupakan user yang dipakai saat menambahakan todo tersebut. 