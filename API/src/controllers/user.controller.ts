import {Controller, Param, Body, Get, Post, Put, Delete} from "routing-controllers";
import { Broker } from '../../../CommonJS/src/broker/broker';

const broker = new Broker();

@Controller()
export class UserController {

    @Get("/users")
    getAll() {
        console.log('getAll');
       return broker.send('users', {header:'getAll', body: {}});
    }

    @Get("/users/:id")
    getOne(@Param("id") id: number) {
       return broker.send('users', {header:'getOne', body: {id}});
    }

    @Post("/users")
    create(@Body() user: any) {
       return broker.send('users', {header:'create', body: {user}});
    }

    @Put("/users/:id")
    update(@Param("id") id: number, @Body() user: any) {
       return broker.send('users', {header:'update', body: {id, user}});
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number) {
       return broker.send('users', {header:'delete', body: id});
    }

}