import { Express, Request, Response } from "express";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from './middleware/validateResource';
import { createSessionSchema } from "./schema/session.schema";
import { createToDoSchema } from "./schema/todo.schema";
import { createUserSchema } from "./schema/user.schema";
import { createTodoHandler, deleteTodoHandler, getTodoHandler, updateTodoHandler } from "./controller/todo.controller";


function routes(app: Express) {
    //endpoint untuk mengecek koneksi 
    app.get('/health-check', (req: Request, res: Response) => res.sendStatus(200));

    //endpoint untuk register new user
    app.post('/api/users/add', validateResource(createUserSchema), createUserHandler);

    //endpoint untuk login mendapatkan access token dan refresh token
    app.post('/api/login', validateResource(createSessionSchema), createUserSessionHandler);

    // app.get('/api/sessions', requireUser, getUserSessionHandler)

    //endpoint untuk logout menghapus access token dan refresh token
    app.post('/api/logout', requireUser, deleteSessionHandler);
    
    //endpoint untuk menambahkan todo
    app.post(
        "/api/todo/add",
        [requireUser, validateResource(createToDoSchema)],
        createTodoHandler
    );

    //endpoint untuk menampilkan seluruh daftar todo yang telah ditambahkan
    app.get("/api/todo/list", requireUser, getTodoHandler);

    //endpoint mengganti status todo, {todoId} merupakan parameter input id todo yang statusnya akan diganti
    app.put("/api/todo/:todoId", requireUser, updateTodoHandler);

    //endpoint untuk menghapus todo, {todoId} merupakan parameter input id todo yang akan dihapus
    app.delete("/api/todo/:todoId", requireUser, deleteTodoHandler);
    
}

export default routes;