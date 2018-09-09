import * as cors from 'cors';
import { basename } from 'path';
import { Router } from 'express';
import { Handler } from 'express';
import { IController } from '../base/interfaces/routes.interface';
import { FindFilesSync, ResolvePath } from '../utils/fs.utils';
import { ROUTES_TYPE } from '../base/constants/constants';
import { Metadata } from '../base/classes/metadata.class';
import { API, PromisifyMiddleware, Route } from '../base/classes/routes.class';


/**
 * Class for Bootstraping all API subclassed instances (controllers) into the Server (express) App
 * 
 * @export
 * @class RoutesInitializer
 */
export class RoutesInitializer {
    private Controllers: Object[] = [];
    private Classes: API[] = [];
    public Router: Router = Router();
    public constructor() {
        this.loadControllers()
            .registerClasses()
            .registerRoutes()
            .registerPreflight();
    }
    private registerPreflight(): RoutesInitializer {
        this.Router.options('*', cors());
        return this;
    }
    /**
     * Loads controller files to a module cache
     * 
     * @private
     * @returns {RoutesInitializer} 
     * 
     * @memberof RoutesInitializer
     */
    private loadControllers(): RoutesInitializer {
        this.Controllers = FindFilesSync(ResolvePath('src'), '.controller.js')
            .filter(e => !e.includes('.map'))
            .map(this.prepareModule);
        return this;
    }
    /**
     * Register each controller module as a Class
     * 
     * @private
     * @returns {RoutesInitializer} 
     * 
     * @memberof RoutesInitializer
     */
    private registerClasses(): RoutesInitializer {
        this.Controllers.forEach((ctrl: IController) => this.registerClass(ctrl));
        return this;
    }
    /**
     * Initiates a new instance of a Class and push the instance in a cache array
     * 
     * @private
     * @param {IController} ctrl 
     * @returns {RoutesInitializer} 
     * 
     * @memberof RoutesInitializer
     */
    private registerClass(ctrl: IController): RoutesInitializer {
        Object.keys(ctrl.module)
            .filter(i => ctrl.module[i].prototype instanceof API)
            .map(el => this.Classes.push(new ctrl.module[el]()));
        return this;
    }
    /**
     * Register each class Route (decorated and added programmatically) to the Express app
     * 
     * @private
     * @returns {RoutesInitializer} 
     * 
     * @memberof RoutesInitializer
     */
    private registerRoutes(): RoutesInitializer {
        /**
         * Register routes from Decarators
         */
        Metadata.getTargetsFromPropertyKey(ROUTES_TYPE)
            .map((ctrl: Function) => Metadata.get(ROUTES_TYPE, ctrl))
            .reduce((p, n) => p.concat(n), [])
            .map((route: Route) => this.registerRoute(route));
        return this;
    }
    /**
     * Register in Router
     * 
     * @private
     * @param {IRoute} route 
     * @returns {RoutesInitializer} 
     * 
     * @memberof RoutesInitializer
     */
    private registerRoute(route: Route): RoutesInitializer {
        try {
            (this.Router as any)[route.method].apply(this.Router, [
                route.prefix + route.path,
                ...(route.middleware.map((fn: Handler) => PromisifyMiddleware(fn))),
                route.controller.Initialize(route.handler)
            ]);
        } catch (err) {
            console.error('Route caused error: \n', route, '\nError: \n', err);
        }
        if (process.env.NODE_ENV !== 'production') console.info(`Route: ${route.method} ${route.prefix}${route.path}`);
        return this;
    }
    /**
     * Helper function to prepare a file to be loaded as a module
     * 
     * @private
     * @param {string} file_path 
     * @returns {IController} 
     * 
     * @memberof RoutesInitializer
     */
    private prepareModule(file_path: string): IController {
        return {
            file: basename(file_path),
            module: require(file_path)
        };
    }
}