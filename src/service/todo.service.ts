import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ToDoModel, { ToDoDocument } from "../models/todo.model";


export async function createTodo(input: ToDoDocument) {
    try {
        const result = await ToDoModel.create(input);
        return result;
    } catch(e) {
        throw e;
    }
    
}

export async function findTodoList(
  query: FilterQuery<ToDoDocument>,
  options: QueryOptions = { lean: true }
) {

  try {
    const result = await ToDoModel.find(query, {}, options);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function findTodo(
    query: FilterQuery<ToDoDocument>,
    options: QueryOptions = { lean: true }
  ) {
    try {
      const id = query.todoId;
      const result = await ToDoModel.findById(id, {}, options);
      return result;
    } catch (e:any) {
      return e.messageFormat;
    }
}

export async function findAndUpdateTodo(
    query: FilterQuery<ToDoDocument>,
    update: UpdateQuery<ToDoDocument>,
    options: QueryOptions
  ) {
    return ToDoModel.findOneAndUpdate(query, update, options);
}

export async function deleteTodo(query: FilterQuery<ToDoDocument>) {
    return ToDoModel.deleteOne(query);
}
  