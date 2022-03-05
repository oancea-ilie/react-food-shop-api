import CustomerApi from "./customerApi.js";

// rez.status / rez.data pe pozitive
// rez.response.status / rez.response.data pe negative.

let control = new CustomerApi();

beforeEach(async()=>{
    await control.deleteAll();

});

afterEach(async()=>{
    await control.deleteAll();
});


describe('Customer Api Client',()=>{

    describe('Pozitiv',()=>{

        test('Create', async()=>{

            let obj = {name:'test', email: 'test', password: '123'};

            let rez = await control.create(obj);
            expect(rez.status).toBe(204);

       });

        test('Get All', async ()=>{
            let obj = {name:'test', email: 'test', password: '123'};
            await control.create(obj);

            let rez = await control.getAll();
            expect(rez.status).toBe(200);
       });
       
       test('Get By ID', async ()=>{
            let obj = {name:'test', email: 'test', password: '123'};
           await control.create(obj);

           let all = await control.getAll();
           let user = all.data[0];

           let rez = await control.getById(user.id);
           expect(rez.status).toBe(200);
        });
       
        test('Update', async ()=>{
            let obj = {name:'test', email: 'test', password: '123'};
            await control.create(obj);

            let all = await control.getAll();
            let user = all.data[0];
            let obj2 = {name:'test2', email: 'test2', password: '12333'};

            let rez = await control.update(obj2, user.id);
            expect(rez.status).toBe(204);
       });

       test('Delete', async ()=>{
        let obj = {name:'test', email: 'test', password: '123'};
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
            expect(rez.response.data.error.message).toMatch("Error: Nu exista customers in baza de date!");
       });

       test('Get By ID nu exista ID', async ()=>{
            let rez = await control.getById(1);
            expect(rez.response.data.error.message).toMatch("Nu exista customer cu acest id!");
        });

        test('Create Propietati invalide', async ()=>{
            let obj = {name:'test'};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Propietati invalide!");
        });

        test('Create | Name gol',async()=>{
            let obj = { email: 'test', password: '123'};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Propietati invalide!");
        });

        test('Create | password gol',async()=>{
            let obj = {name: 'test', email: 'test', password: ''};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Campul password este gol!");
        });

        test('Create | email gol',async()=>{
            let obj = {name: 'test', email: '', password: '123'};
            let rez = await control.create(obj);
            expect(rez.response.data.error.message).toMatch("Campul email este gol!");
        });

        test('Update | Propietati invalide',async()=>{
            let obj = {name: 'test', email: 'test', password: '123'};
            await control.create(obj);

            let all = await control.getAll();
            let pers = all.data[0];
            let obj2 = {name: '', email: '', password: ''};

            let rez = await control.update(obj2, pers.id);
            expect(rez.response.data.error.message).toMatch("Nu exista propietati pentru update!");
        });

        test('Delete',async()=>{
            let obj = {name: 'test', email: 'test', password: '123'};
            await control.create(obj);

            let all = await control.getAll();
            let pers = all.data[0];
            let rez = await control.delete(pers.id+1);

            expect(rez.response.data.error.message).toMatch("Nu exista customer cu acest id!");
        });


    });

});
