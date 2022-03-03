import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Product extends Sequelize.Model{}

    Product.init({
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

        price:{
            type:Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'price can not be null!'
                },
                notEmpty:{
                    msg:'price can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Product;
};