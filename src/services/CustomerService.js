
export default class CustomerService{
      
    constructor({Customer},{sequelize}){
          this.customer = Customer;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let obj = await this.customer.findAll();
     

        if(obj.length == 0){
            throw new Error("Nu exista customers in baza de date!");
        }
 
        return obj;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.customer.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista customer cu acest id!");
        }
        return obj;
    }

    create= async(newObj)=>{
        
        let allObj = await this.customer.findAll();

        if(newObj.name == null || newObj.email == null || newObj.password == null){
            throw new Error("Propietati invalide!");
        }
        if(!newObj.name){
            throw new Error('Campul name este gol!');
        }
        else if(!newObj.email){
            throw new Error('Campul email este gol!');
        }
        else if(!newObj.password){
            throw new Error('Campul password este gol!');
        }
        else{
            if(allObj){
                for(let p of allObj){
                    if(p.email == newObj.email){
                        throw new Error("Acest Email exista deja in baza de date!");
                    }
                }
            }

            await this.customer.create(newObj);

        }

    }

    purge = async()=>{
        let obj = await this.getAll();
                
        if(obj){
            obj.forEach((e)=>{
                e.destroy();
            })
        }else{
            throw new Error("Nu s-a gasit customer in baza de date!");
        }
    }

    delete=async(id)=>{
        let obj = await this.getById(id);
                
        if(obj){
            await obj.destroy();
        }else{
            throw new Error("Nu s-a gasit customer cu acest ID pentru a putea fii stears!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);

        if(user.name == '' && user.email=='' && user.password == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){

            if(user.name){
                obj.name = user.name;
            }
            if(user.email){
                obj.email = user.email;
            }
            if(user.password){
                obj.password = user.password;
            }

            await obj.save();

        }else{
            throw new Error(`Nu s-a gasit Customer cu acest ID pentru a putea face Update!`);
        }
    }




}