import CateogryApi from "./categoryApi.js";

// rez.status / rez.data pe pozitive
// rez.response.status / rez.response.data pe negative.

let control = new CateogryApi();

beforeEach(async()=>{
    await control.deleteAll();

});

afterEach(async()=>{
    await control.deleteAll();
});


describe('Category Api Client',()=>{

    describe('Pozitiv',()=>{

        test('Create', async()=>{

            let obj = {name:'test', img: 'test'};

            let rez = await control.create(obj);
            expect(rez.status).toBe(204);

       });

        test('Get All', async ()=>{
            let obj = {name:'test', img: 'test'};
            await control.create(obj);

            let rez = await control.getAll();
            expect(rez.status).toBe(200);
       });
       
       test('Get By ID', async ()=>{
            let obj = {name:'test', img: 'test'};
           await control.create(obj);

           let all = await control.getAll();
           let user = all.data[0];

           let rez = await control.getById(user.id);
           expect(rez.status).toBe(200);
        });
       
        test('Update', async ()=>{
            let obj = {name:'test', img: 'test'};
            await control.create(obj);

            let all = await control.getAll();
            let user = all.data[0];
            let obj2 = {name:'test2', img: 'test2'};

            let rez = await control.update(obj2, user.id);
            expect(rez.status).toBe(204);
       });

       test('Delete', async ()=>{
        let obj = {name:'test', img: 'test'};
        await control.create(obj);

        let all = await control.getAll();
        let user = all.data[0];

        let rez = await control.delete(user.id);
        expect(rez.status).toBe(204);
        });

    });

    describe('Negative',()=>{

        test('Get All nu exista elemente', async ()=>{
            let rez = await control.getAll();
            expect(rez.response.data.error.message).toMatch("Error: Nu exista cateogry in baza de date!");
       });

       test('Get By ID nu exista ID', async ()=>{
            let rez = await control.getById(1);
            expect(rez.response.data.error.message).toMatch("Nu exista cateogry cu acest id!");
        });

        test('Create Propietati invalide', async ()=>{
            let obj = {name:'test'};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Propietati invalide!");
        });

        test('Create | Name gol',async()=>{
            let obj = {name:'', img: 'test'};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Validation error: name can not be empty!");
        });

        test('Create | img gol',async()=>{
            let obj = {name:'test', img: ''};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Validation error: img can not be empty!");
        });

        test('Update | Propietati invalide',async()=>{
            let obj = {name:'test', img: 'test'};
            await control.create(obj);

            let all = await control.getAll();
            let pers = all.data[0];
            let obj2 = {name:'', img: ''};

            let rez = await control.update(obj2, pers.id);
            expect(rez.response.data.error.message).toMatch("Nu exista propietati pentru update!");
        });

        test('Delete',async()=>{
            let obj = {name:'test', img: 'test'};
            await control.create(obj);

            let all = await control.getAll();
            let pers = all.data[0];
            let rez = await control.delete(pers.id+1);

            expect(rez.response.data.error.message).toMatch("Nu exista cateogry cu acest id!");
        });


    });

});
