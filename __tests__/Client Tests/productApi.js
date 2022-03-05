import axios from "axios";

export default class ProductApi{

    api(url, method ='GET', data= null){
        return axios({method, url, data});
    }

    async getAll(){
        try{
            const rez = await this.api('http://localhost:3000/api/v1/products');
        
            return rez;

        }catch(e){
          
            return e;
        }
        
    }

    async getAllJoinCategories(){
        try{
            const rez = await this.api('http://localhost:3000/api/v1/products/cat');
        
            return rez;

        }catch(e){
          
            return e;
        }
        
    }

    async OrderBy(type){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/products/order/${type}`);
        
            return rez;

        }catch(e){
          
            return e;
        }
        
    }
    
    async getById(id){

        try{
            const rez = await this.api(`http://localhost:3000/api/v1/products/${id}`);

            return rez;

        }catch(e){
            return e;
        }
        
    }

    async create(newObj){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/products`,'POST', newObj);
            
            return rez;

         }catch(e){
            return e;
         }
    }

    async update(newObj,id){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/products/${id}`,'put', newObj);

            return rez;

        }catch(e){
            return e;
        }
        
    }

    async deleteAll(){
        try{
            const rez = await this.api('http://localhost:3000/api/v1/products/all', 'delete');

            return rez;

        }catch(e){
          
            return e;
        }
        
    }

    async delete(id){
        try{
            const rez = await this.api(`http://localhost:3000/api/v1/products/${id}`, 'delete');

            return rez;

        }catch(e){
          
            return e;
        }
        
    }

}