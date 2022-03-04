import  express from "express";

export default class ProductController{

     constructor(productService,app){

         this.productService = productService;

         this.route = express.Router();

         app.use("/api/v1/products", this.route);

         this.getAll();
         this.getAllAndCategory();
         this.orderBy();
         this.getById();
         this.create();
         this.delete();
         this.update();

         this.catchErr();
     }


     getAll= async ()=>{

        this.route.get("/", async (req,res,next)=>{
            try{

               let obj = await this.productService.getAll();

               res.status(200).json(obj);

            }catch(e){
                next(e);
            }
            
        });

   }

   getAllAndCategory= async ()=>{
        this.route.get("/cat", async (req,res,next)=>{
            try{

            let obj = await this.productService.getProductAndCategories();

            res.status(200).json(obj);

            }catch(e){
                next(e);
            }
            
        });
    }

    orderBy= async ()=>{
        this.route.get("/order/:id", async (req,res,next)=>{
            try{
                let {id}= req.params;

                let obj = await this.productService.orderBy(id);

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

               let obj = await this.productService.getById(id);

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

               await this.productService.create(obj);

               res.status(204).end();
           }catch(e){
               next(e);
           }
       })
   }

   delete = async()=>{
       this.route.delete("/:id", async(req,res,next)=>{
           try{
               let {id} = req.params;
               await this.productService.delete(id);

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
               
               await this.productService.update(id,user);

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

