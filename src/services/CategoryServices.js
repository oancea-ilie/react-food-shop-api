
export default class CategoryService{
      
    constructor({Category},{sequelize}){
          this.category = Category;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let obj = await this.category.findAll();
     

        if(obj.length == 0){
            throw new Error("Nu exista cateogry in baza de date!");
        }
 
        return obj;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.category.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista cateogry cu acest id!");
        }
        return obj;

    }

    create= async(newObj)=>{
        
        let allObj = await this.category.findAll();

        if(newObj.name == null || newObj.img == null){
            throw new Error("Propietati invalide!");
        }
        else if(newObj.name == null){
            throw new Error("Campul name este gol");
        }
        else if(newObj.img == null){
            throw new Error("Campul img este gol");
        }
        else{
            if(allObj){
                for(let p of allObj){
                    if(p.name == newObj.name){
                        throw new Error("Acesta Categorie exista deja in baza de date!");
                    }
                }
            }

            await this.category.create(newObj);

        }

    }

    purge = async()=>{
        let obj = await this.getAll();
                
        if(obj){
            obj.forEach((e)=>{
                e.destroy();
            })
        }else{
            throw new Error("Nu s-a gasit Categories in baza de date!");
        }
    }


    delete=async(id)=>{
        let obj = await this.getById(id);
                
        if(obj){
            await obj.destroy();
        }else{
            throw new Error("Nu s-a gasit category cu acest ID pentru a putea fii stearsa!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);

        if(user.name == '' && user.img == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){

            if(user.name){
                obj.name = user.name;
            }
            if(user.img){
                obj.img = user.img;
            }

            await obj.save();

        }else{
            throw new Error(`Nu s-a gasit category cu acest ID pentru a putea face Update!`);
        }
    }




}