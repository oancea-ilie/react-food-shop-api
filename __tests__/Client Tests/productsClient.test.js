import ProductApi from "./productApi.js";
import CateogryApi from "./categoryApi.js";

// rez.status / rez.data pe pozitive
// rez.response.status / rez.response.data pe negative.

let control = new ProductApi();
let catControl = new CateogryApi();
let catId;

beforeEach(async()=>{
    await control.deleteAll();
    await catControl.deleteAll();

    let obj = {name:'test', img: 'test'}; // category
    await catControl.create(obj);

    let allCat = await catControl.getAll();
    catId = allCat.data[0].id;

});

afterEach(async()=>{
    await control.deleteAll();
    await catControl.deleteAll();
});


describe('Product Api Client',()=>{

    describe('Pozitiv',()=>{

        test('Get All', async ()=>{
            let obj = {name:'test', price: 12, category_id: catId};
            await control.create(obj);

            let rez = await control.getAll();
            expect(rez.status).toBe(200);
       });

       test('Get All Join With Categories', async ()=>{
        let obj = {name:'test', price: 12, category_id: catId};
        await control.create(obj);

        let rez = await control.getAllJoinCategories();
        expect(rez.status).toBe(200);
        });

        test('Order By ', async ()=>{
            let obj = {name:'test', price: 12, category_id: catId};
            await control.create(obj);

            let rez = await control.OrderBy('id');
            expect(rez.status).toBe(200);
        });
       
       test('Get By ID', async ()=>{
           let obj = {name:'test', price: 12, category_id: catId};
           await control.create(obj);

           let all = await control.getAll();
           let user = all.data[0];

           let rez = await control.getById(user.id);
           expect(rez.status).toBe(200);
        });
       
        test('Update', async ()=>{
            let obj = {name:'test', price: 12, category_id:catId};
            await control.create(obj);

            let all = await control.getAll();
            let user = all.data[0];
            let obj2 = {name:'test2', price: 15, category_id:catId};

            let rez = await control.update(obj2, user.id);
            expect(rez.status).toBe(204);
       });

       test('Delete', async ()=>{
        let obj = {name:'test', price: 12, category_id:catId};
        await control.create(obj);

        let all = await control.getAll();
        let user = all.data[0];

        let rez = await control.delete(user.id);
        expect(rez.status).toBe(204);
        });

    });

    describe('Negative',()=>{

        test('Create', async()=>{

            let obj = {name:'test', price: 12, category_id:catId};

            let rez = await control.create(obj);
            expect(rez.status).toBe(204);

       });

        test('Get All nu exista elemente', async ()=>{
            let rez = await control.getAll();
            expect(rez.response.data.error.message).toMatch("Error: Nu exista product in baza de date!");
       });

       test('Get All Join With Categories nu exista elemente', async ()=>{
            let rez = await control.getAllJoinCategories();
            expect(rez.response.data.error.message).toMatch("Nu exista produse in baza de date!");
        });

        test('Order By nu exista elemente', async ()=>{
            let rez = await control.OrderBy('id');
            expect(rez.response.data.error.message).toMatch("Nu exista produse in baza de date!");
        });

        test('Order By incorrect type', async ()=>{
            let rez = await control.OrderBy('idd');
            expect(rez.response.data.error.message).toMatch("Nu exista acest type pentru order!");
        });

       test('Get By ID nu exista ID', async ()=>{
            let rez = await control.getById(1);
            expect(rez.response.data.error.message).toMatch("Nu exista product cu acest id!");
        });

        test('Create Propietati invalide', async ()=>{
            let obj = {name:'test@',price:1};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Propietati invalide!");
        });

        test('Create | Name gol',async()=>{
            let obj = {name:'',price:1, category_id:catId};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Campul name este gol!");
        });

        test('Create | price gol',async()=>{
            let obj = {name:'test',price: '', category_id:catId};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Campul price este gol!");
        });

        test('Create | price not a number',async()=>{
            let obj = {name:'test',price: '1', category_id:catId};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Campul price nu este numar!");
        });

        test('Create | category_id gol',async()=>{
            let obj = {name:'test',price: 12, category_id: ''};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Campul category_id este gol!");
        });
        
        test('Create | category_id not a number',async()=>{
            let obj = {name:'test',price: 1, category_id:'1'};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Campul category_id nu este numar!");
        });

        test('Update | Propietati invalide',async()=>{
            let obj = {name:'test',price: 1, category_id:catId};
            await control.create(obj);

            let all = await control.getAll();
            let pers = all.data[0];
            let obj2 = {name:"", price: '', category_id: ''};

            let rez = await control.update(obj2, pers.id);
            expect(rez.response.data.error.message).toMatch("Nu exista propietati pentru update!");
        });

        test('Update | price not a number',async()=>{
            let obj = {name:'test',price: 1, category_id:catId};
            await control.create(obj);

            let all = await control.getAll();
            let pers = all.data[0];
            let obj2 = {name:"test", price: '1', category_id: catId};

            let rez = await control.update(obj2, pers.id);
            expect(rez.response.data.error.message).toMatch("Campul price nu este numar!");
        });

        test('Update | category_id not a number',async()=>{
            let obj = {name:'test',price: 1, category_id: catId};
            await control.create(obj);

            let all = await control.getAll();
            let pers = all.data[0];
            let obj2 = {name:"test", price: 1, category_id: '1'};

            let rez = await control.update(obj2, pers.id);
            expect(rez.response.data.error.message).toMatch("Campul category_id nu este numar!");
        });

        test('Delete',async()=>{
            let obj = {name:'test',price: 1, category_id:catId};
            await control.create(obj);

            let all = await control.getAll();
            let pers = all.data[0];
            let rez = await control.delete(pers.id+1);

            expect(rez.response.data.error.message).toMatch("Nu exista product cu acest id!");
        });


    });

})
;