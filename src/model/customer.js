import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Customer extends Sequelize.Model{}

    Customer.init({
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

        email:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'email can not be null!'
                },
                notEmpty:{
                    msg:'email can not be empty!'
                },
            },
        },

        password:{
            type:Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'password can not be null!'
                },
                notEmpty:{
                    msg:'password can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Customer;
};