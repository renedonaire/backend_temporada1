const fs = require('fs')

class Products {

    constructor(fileName) {
        this.route = fileName
    }


    getAll = async () => {
        try {
            const result = await fs.promises.readFile(this.route, 'utf-8')
            return JSON.parse(result)

        } catch (err) {
            await fs.promises.writeFile(this.route, JSON.stringify([], null, 2))
            const result = await fs.promises.readFile(this.route, 'utf-8')
            return JSON.parse(result)
        }
    }


    saveProduct = async product => {
        const arrayProducts = await this.getAll()

        try {
            let indexArray = []
            arrayProducts.forEach(element => indexArray.push(element.id))
            if (indexArray.length > 0) {
                const arraySorted = indexArray.sort((a, b) => (b - a))
                product.id = arraySorted[0] + 1
                arrayProducts.push(product)
            } else {
                product.id = 1
                arrayProducts.push(product)
            }
            await fs.promises.writeFile(this.route, JSON.stringify(arrayProducts, null, 2))
            return product.id

        } catch (err) {
            console.log('Error: ', err)
        }
    }


    getById = async (number) => {
        try {
            const workArray = await this.getAll()
            const result = workArray.find(e => e.id === number)
            if (result) {
                return result
            } else {
                return null
            }

        } catch (err) {
            console.log("err " + err)
        }
    }

}


const test = async () => {
    const testFile = new Products('myFile')
    console.log(await testFile.getAll())
    console.log(await testFile.saveProduct({ nombre: 'Wilmar', email: 'wilmar@wmail.wom' }))
    console.log(await testFile.getAll())
    console.log(await testFile.getById(987))
}

test()
