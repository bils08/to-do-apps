import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ToDoModel, { ToDoDocument } from "../models/todo.model";


export async function createProduct(input: ToDoDocument) {
  
    console.log(input);

    try {
        const result = await ToDoModel.create(input);
        return result;
    } catch(e) {
        throw e;
    }
    
}

export async function findTodo(
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

export async function findAndUpdateProduct(
    query: FilterQuery<ToDoDocument>,
    update: UpdateQuery<ToDoDocument>,
    options: QueryOptions
  ) {
    return ToDoModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ToDoDocument>) {
    return ToDoModel.deleteOne(query);
}
  