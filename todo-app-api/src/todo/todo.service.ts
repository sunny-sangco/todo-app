import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schema/todo.schema';
import mongoose from 'mongoose';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: mongoose.Model<Todo>
    ){}

    async findAdll(): Promise<Todo[]>{
        const todos = await this.todoModel.find()
        return todos
    }

    async create(todo: Todo): Promise<Todo> {
        const res = await this.todoModel.create(todo)
        return res
    }

    async findById(id: string): Promise<Todo> {
        const res = await this.todoModel.findById(id)
        if(!res){
            throw new NotFoundException('Todo not found')
        }
        return res
    }
    
    async updateById(id: string, todo: Todo): Promise<Todo> {
        return await this.todoModel.findByIdAndUpdate(id, todo, {
            new: true,
            runValidators: true
        })
    }

    async deleteById(id: string): Promise<Todo> {
        return await this.todoModel.findByIdAndDelete(id)
    }
    
}
