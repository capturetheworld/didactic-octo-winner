var app = require('express')()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
mongoose.connect("mongodb://localhost/blog")

app.use(bodyParser.urlencoded({ extended: true }))

var postSchema = mongoose.Schema({
    title: String, 
    message: String
});

var Post = mongoose.model('Post', postSchema);

app.set('view engine', 'ejs')

app.get('/', function(req, res){
	Post.find({}, function(err, posts){
		if(err) throw err
		res.render('index', { posts: posts })
	})
})

app.get('/posts/:post_id', function(req, res){
	var post_id = req.params.post_id
	Post.findById(post_id, function(err, post){
		if(err) throw err
		res.render('post', { post: post })
	})
})

app.get('/post', function(req, res){
	res.render('new_post')
})

app.post('/post', function(req, res){
	var post = new Post({
		title: req.body.title,
		message: req.body.message
	})
	post.save(function(){
		res.redirect('/')
	})
})

app.listen(3000, function(){
	console.log("server starting on port 3000")
})