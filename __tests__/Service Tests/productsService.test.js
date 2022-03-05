import ProductService from "../../src/services/ProductServices";

let control = new ProductService();

beforeEach(async()=>{

});

afterEach(async()=>{
    
});

describe("Teste Product Services",()=>{

    test("Get All", async()=>{
        await expect(control.getAll().then(data=>data.length)).resolves.toBeGreaterThan(0);
    })
})