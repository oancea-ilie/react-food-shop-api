import fs from "fs"
import path from "path";

import { Sequelize } from "sequelize";
import Product from "../model/product.js";
import Category from "../model/category.js";

import Customer from "../model/customer.js";

export default  class Repository {
      
        config =(database)=>  new Promise((resolve,reject)=>{
            fs.readFile(path.normalize("src\\config\\config.json"),'utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    if(database == "development"){
                      const {development} = JSON.parse(data);
                      resolve(development);
                    }
                    if(database == "test"){
                      const {test} = JSON.parse(data);
                      resolve(test);
                    }
                }
            });
        });

        createDb= async(database)=>{
            try{
               let development = await this.config(database);
      
               let sequelize = new Sequelize(development.database, development.username, development.password, {
                  host: development.host,
                     dialect: development.dialect
                });
  
              let db={
                models:{}
              }

              db.sequelize = sequelize;
              db.Sequelize = Sequelize;
              db.models.Product = Product(sequelize);
              db.models.Customer = Customer(sequelize);
              db.models.Category = Category(sequelize);

              db.models.Category.hasMany(db.models.Product,{
                  onDelete: 'CASCADE',
                  as:'fk_product_id',
                  foreignKey:{
                    fieldName:'category_id',
                    allowNull:false
                  },
              });

              db.models.Product.belongsTo(db.models.Category,{
                as:'fk_product_id',
                foreignKey:{
                  fieldName:'category_id',
                  allowNull:false
                },
              });

              return db;
              
            }catch(e){
              throw new  Error(e);
            }
        }

};