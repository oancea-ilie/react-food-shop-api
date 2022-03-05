import axios from "axios";

export default class CustomerApi{

    api(url, method ='GET', data= null){
        return axios({method, url, data});
    }

    async getAll(){
        try{
            const rez = await this.api('http://localhost:3000/api/v1/customers');
        
            return rez;

        }catch(e){
          
            return e;
        }
        
    }
    
    async getById(id){

        try{
            const rez = await this.api(`http://localhost:3000/api/v1/customers/${id}`);

            return rez;

        }catch(e){
            return e;
        }
        
    }

    async create(newObj){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/customers`,'POST', newObj);
            
            return rez;

         }catch(e){
            return e;
         }
    }

    async update(newObj,id){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/customers/${id}`,'put', newObj);

            return rez;

        }catch(e){
            return e;
        }
        
    }

    async deleteAll(){
        try{
            const rez = await this.api('http://localhost:3000/api/v1/customers/all', 'delete');

            return rez;

        }catch(e){
          
            return e;
        }
        
    }

    async delete(id){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/customers/${id}`, 'delete');

            return rez;

        }catch(e){
          
            return e;
        }
        
    }

}