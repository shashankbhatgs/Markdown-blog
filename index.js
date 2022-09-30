const express = require('express'); 
const mongoose = require('mongoose'); 
const Article = require('./models/article'); 
const articleRouter = require('./routes/articles'); 
const methodOverride = require('method-override');  
const app = express(); 

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/markdownBlog');
  console.log("Database connected");
}


app.set('view engine', 'ejs')   
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})  
})


app.use('/articles', articleRouter) 

app.listen(3000); 




