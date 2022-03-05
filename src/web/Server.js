import express from "express";
import cors from "cors";
import Repository from "../config/Repository.js";

import ProductService from "../services/ProductServices.js";
import ProductController from "./Controllers/ProductController.js";

import CategoryService from "../services/CategoryServices.js";
import CategoryController from "./Controllers/CategoryController.js";

import CustomerService from "../services/CustomerService.js";
import CustomerController from "./Controllers/CustomerController.js";


export default  class Server{

    constructor(){
        this.app = express();

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors());

        this.repo = new Repository();

        this.app.get('/', (req, res) => {
            res.json({
                message: 'Welcome to my Rest Api !',
            });
        });
        
      }

      run= async(database)=>{
        let db = await this.repo.createDb(database);

        db.sequelize.sync()
        .then( () => {
               this.app.listen(3000, async () => {
               console.log(`Express server is listening on port 3000`);
            });
        }).then(()=>{
            
            let productService = new ProductService(db.models,db.sequelize);
            let productController = new ProductController(productService, this.app);

            let categoryService = new CategoryService(db.models, db.sequelize);
            let categoryController = new CategoryController(categoryService, this.app);

            let customerService = new CustomerService(db.models, db.sequelize);
            let customerController = new CustomerController(customerService, this.app);
        });


      }
}