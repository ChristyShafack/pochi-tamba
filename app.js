require('dotenv').config()

const app = require('./config')

app.listen(app.get('PORT'), () => {})

app.get('/', (request, response) => {
  response.render('pages/home')
})
app.get('/projects', (request, response) => {
  response.render('pages/projects')
})
app.get('/blog', (request, response) => {
  response.render('pages/blog')
})
app.get('/about', (request, response) => {
  response.render('pages/about')
})
app.get('/contact', (request, response) => {
  response.render('pages/contact')
})

app.get('/projects/portraits', (request, response) => {
  response.render('projects/portraits')
})

app.use((request, response) => {
  response.status(404)

  if (request.accepts('html')) {
    return response.redirect('/')
  }

  if (request.accepts('json')) {
    return response.send({ error: 'Not Found' })
  }

  response.type('txt').send('Not Found')
})
