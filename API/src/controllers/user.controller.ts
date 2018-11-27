import {Controller, Param, Body, UseBefore, Get, Post, Put, Delete} from "routing-controllers";
import { Broker } from '../../../CommonJS/src/broker/broker';
import { isLoggedIn } from '../middleware/auth/auth'
const broker = new Broker();

@Controller()
export class UserController {

    @Get("/users")
    @UseBefore(isLoggedIn)
    async getAll() {
        console.log('getAll');
        const result = await broker.send('users', {header:'getAll', body: {}});
        console.log('result -> ', result)
        return result;
    }

    @Get("/users/:id")
    async getOne(@Param("id") id: number) {
        const result = await broker.send('users', {header:'getOne', body: {id}});
        console.log('result -> ', result)
        return result;
    }

    @Post("/users")
    async create(@Body() user: any) {
       return await broker.send('users', {header:'create', body: {user}});
    }

    @Put("/users/:id")
    async update(@Param("id") id: number, @Body() user: any) {
       return await broker.send('users', {header:'update', body: {id, user}});
    }

    @Delete("/users/:id")
    async remove(@Param("id") id: number) {
       return await broker.send('users', {header:'delete', body: id});
    }

    @Post("/login")
    async login(@Body() user: any) {
       return await broker.send('users', {header:'login', body: {user}});
    }

    @Post("/signup")
    async signup(@Body() user: any) {
       return await broker.send('users', {header:'signup', body: {user}});
    }

}