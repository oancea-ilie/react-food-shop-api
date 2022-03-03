import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Category extends Sequelize.Model{}

    Category.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'name can not be null!'
                },
                notEmpty:{
                    msg:'name can not be empty!'
                },
            },
        },
        
        img:{
            type:Sequelize.STRING,
            allowNull : false,
            validate:{
                notNull:{
                    msg: 'img can not be null!'
                },
                notEmpty:{
                    msg:'img can not be empty!'
                },
            }
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Category;
};