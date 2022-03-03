import fs from "fs"
import path from "path";

import { Sequelize } from "sequelize";
import Product from "../model/product.js";
import Category from "../model/category.js";

import Student from "../model/student.js";

export default  class Repository {
      
        config =()=>  new Promise((resolve,reject)=>{
            fs.readFile(path.normalize("src\\config\\config.json"),'utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const {development} = JSON.parse(data);
                    resolve(development);
                }
            });
        });

        createDb= async()=>{
            try{
               let development = await this.config();
      
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
              db.models.Student = Student(sequelize);
              db.models.Category = Category(sequelize);

              // o persoana poate aparea in mai multe inchirieri.
              db.models.Category.hasMany(db.models.Product,{
                  onDelete: 'CASCADE',
                  as:'fk_product_id',
                  foreignKey:{
                    fieldName:'category_id',
                    allowNull:false
                  },
              });

              // o inchiriere poate avea o singura persoana, persoana_id
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