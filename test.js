const articleModel = require('./api/models/articleModel')
const mongoose = require('mongoose')
const assert = require('assert')

const configDB = require('./configDB');



// conenxion a la base de donnée
mongoose.connect(`mongodb+srv://${configDB.username}:${configDB.pass}@cluster0.6omxoln.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Connected!'));

describe(' crud  article', () => {
    it('article crée et trouvé', async () => {
        const test = await articleModel.create({
            title: 'testarticle',
            author: 'testarticle',
            category: '653fd0102ff156968e5a1e61',
            content: 'testarticle'
            
        })

          await articleModel.findOne({title: 'testarticle' } ).then((result)=>{
            
            assert(test.title === result.title);
         })
          

        
    })
    // it('article effacé et non trouvé', async ()=>{
    //     await articleModel.deleteOne({title: 'testproduit' })
    //     await articleModel.findOne({ title: 'testproduit' } ).then((result) => {
    //         console.log(result);
    //         assert(result === null)

    //     })
    // })
    // it('produit non crée car valeur title null', async ()=>{

    //      await articleModel.create({
    //         author: 'testarticle',
    //         categoryId: '25',
    //         content: 'testarticle'
    //     }).catch((error)=>{
    //         console.log(error);
    //         assert(error.title === 'ValidatorError: Path `title` is required.')

    //     })
         
    // })
})