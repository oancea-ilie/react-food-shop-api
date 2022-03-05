
export default class ProductService{
      
    constructor({Product,Category},{sequelize}){
          this.product = Product;
          this.sequelize = sequelize;
          this.category = Category;
    }

    getAll= async ()=>{
          
      try{
        let obj = await this.product.findAll();
     

        if(obj.length == 0){
            throw new Error("Nu exista product in baza de date!");
        }
 
        return obj;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.product.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista product cu acest id!");
        }
        return obj;

    }

    getProductAndCategories =async()=>{
        try{
            let obj = await this.product.findAll({
                include:{
                    all:true
                }
            });
        
            if(obj.length == 0){
                throw new Error("Nu exista produse in baza de date!");
            }
     
            return obj;
              
          }catch(e){
            throw new Error(e);
          }
    }

    orderBy =async(order)=>{
        try{

            let desc = 'DESC';
            if(order =='price-asc'){
                order = 'price';
                desc= 'ASC';
            }

            if(order == 'price' || order == 'price-asc' || order == 'id'){
                let obj = await this.product.findAll({
                    include:{
                        all:true
                    },
                    order:[
                        [`${order}`, `${desc}`],
                    ]
                });

                if(obj.length == 0){
                    throw new Error("Nu exista produse in baza de date!");
                }

                return obj;
            }else{
                throw new Error("Nu exista acest type pentru order!");
            }
              
          }catch(e){
            throw new Error(e);
          }
    }

    create= async(newObj)=>{
        
        let allObj = await this.product.findAll();

        if(newObj.name == null || newObj.price == null || newObj.category_id == null){
            throw new Error("Propietati invalide!");
        }
        if(!newObj.name){
            throw new Error('Campul name este gol!');
        }
        else if(!newObj.price){
            throw new Error('Campul price este gol!');
        }
        else if(typeof newObj.price != 'number'){
            throw new Error('Campul price nu este numar!');
        }
        else if(!newObj.category_id){
            throw new Error('Campul category_id este gol!');
        }
        else if(typeof newObj.category_id != 'number'){
            throw new Error('Campul category_id nu este numar!');
        }
        else{
            if(allObj){
                for(let p of allObj){
                    if(p.name == newObj.name){
                        throw new Error("Acest Produs exista deja in baza de date!");
                    }
                }
            }

            await this.product.create(newObj);

        }

    }


    delete=async(id)=>{
        let obj = await this.getById(id);
                
        if(obj){
            await obj.destroy();
        }else{
            throw new Error("Nu s-a gasit Product cu acest ID pentru a putea fii stearsa!");
        }
    }

    purge = async()=>{
        let obj = await this.getAll();
                
        if(obj){
            obj.forEach((e)=>{
                e.destroy();
            })
        }else{
            throw new Error("Nu s-a gasit Produse in baza de date!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);
        if(user.name == '' && user.price=='' && user.category_id == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(typeof user.price != 'number'){
            throw new Error("Campul price nu este numar!");
        }
        if(typeof user.category_id != 'number'){
            throw new Error("Campul category_id nu este numar!");
        }
        if(obj){

            if(user.name){
                obj.name = user.name;
            }
            if(user.price){
                obj.price = user.price;
            }
            if(user.category_id){
                obj.category_id = user.category_id;
            }

            await obj.save();

        }else{
            throw new Error(`Nu s-a gasit Product cu acest ID pentru a putea face Update!`);
        }
    }

}