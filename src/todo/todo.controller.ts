import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schema/todo.schema';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';

@Controller('todos')
export class TodoController {
    constructor(private todoServ: TodoService){}

    @Get()
    async getAllTodos(): Promise<Todo[]>{
        return this.todoServ.findAdll()
    }

    @Post('create')
    async createTodo(@Body()
    todo: CreateTodoDto,
    ): Promise< Todo>{
        return this.todoServ.create(todo)
    }

    @Get(':id')
    async getTodo(@Param('id') id: string): Promise<Todo>{
        return this.todoServ.findById(id)
    }

    @Put(':id')
    async updateTodo(@Param('id') id: string, @Body() todo: UpdateTodoDto): Promise<Todo>{
        return this.todoServ.updateById(id, todo)
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: string): Promise<Todo>{
        return this.todoServ.deleteById(id)
    }
}
