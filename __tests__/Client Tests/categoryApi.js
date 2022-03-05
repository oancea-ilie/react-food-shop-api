import axios from "axios";

export default class CateogryApi{

    api(url, method ='GET', data= null){
        return axios({method, url, data});
    }

    async getAll(){
        try{
            const rez = await this.api('http://localhost:3000/api/v1/categories');
        
            return rez;

        }catch(e){
          
            return e;
        }
        
    }
    
    async getById(id){

        try{
            const rez = await this.api(`http://localhost:3000/api/v1/categories/${id}`);

            return rez;

        }catch(e){
            return e;
        }
        
    }

    async create(newObj){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/categories`,'POST', newObj);
            
            return rez;

         }catch(e){
            return e;
         }
    }

    async update(newObj,id){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/categories/${id}`,'put', newObj);

            return rez;

        }catch(e){
            return e;
        }
        
    }

    async deleteAll(){
        try{
            const rez = await this.api('http://localhost:3000/api/v1/categories/all', 'delete');

            return rez;

        }catch(e){
          
            return e;
        }
        
    }

    async delete(id){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/categories/${id}`, 'delete');

            return rez;

        }catch(e){
          
            return e;
        }
        
    }

}