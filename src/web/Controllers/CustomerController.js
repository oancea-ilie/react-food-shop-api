import  express from "express";

export default class CustomerController{

     constructor(customerServices,app){

         this.customerServices = customerServices;

         this.route = express.Router();

         app.use("/api/v1/customers", this.route);

         this.getAll();
         this.getById();
         this.create();
         this.purge();
         this.delete();
         this.update();

         this.catchErr();
     }


     getAll= async ()=>{

         this.route.get("/", async (req,res,next)=>{
             try{

                let obj = await this.customerServices.getAll();

                res.status(200).json(obj);

             }catch(e){
                 next(e);
             }
             
         });

    }

    getById= async()=>{
        this.route.get("/:id", async (req,res,next)=>{
            try{
                let {id}= req.params;

                let obj = await this.customerServices.getById(id);

                res.status(200).json(obj);

            }catch(e){
                next(e);
            }

         });
    }

    create = async()=>{
        this.route.post("/",async(req,res,next)=>{
            try{
                let obj = req.body;

                await this.customerServices.create(obj);

                res.status(204).end();
            }catch(e){
                next(e);
            }
        })
    }

    purge = async()=>{
        this.route.delete("/all", async(req,res,next)=>{
            try{
                await this.customerServices.purge();

                res.status(204).end();

            }catch(e){
                next(e);
            }
        });
    }

    delete = async()=>{
        this.route.delete("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                await this.customerServices.delete(id);

                res.status(204).end();

            }catch(e){
                next(e);
            }
        });
    }

    update = async()=>{
        this.route.put("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let user = req.body;
                
                await this.customerServices.update(id,user);

                res.status(204).end();
                
            }catch(e){
                next(e);
            }
        });
    }

    catchErr=async()=>{
        this.route.use((err,req,res,next)=>{
            res.status(err.status || 500);
    
            res.json({
               error:{
                   message:err.message
               }
            });
         });
    }

}

