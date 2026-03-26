import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));

function dateGenerator (req, res, next) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
    const d = new Date(); 
    res.locals.month = months[d.getMonth()]; 
    res.locals.day = d.getDate();            
    next(); 
}
app.use(dateGenerator); 

app.get('/', (req, res) => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const achievementRate = total === 0 ? 0 : Math.round((completed / total) * 100);
    res.render('index.ejs', {
        todos,
        achievementRate,
    });
}); 

// Add
let todos = []; 
app.post('/todos', (req, res) => {
    const todoTitle = req.body.todoTitle; 
    const newTodo = {
        id: Date.now(),
        title: todoTitle,
        completed: false,
    }; 
    todos.push(newTodo); 
    console.log(todos);
    res.redirect('/'); 
}); 

// Check Box
app.post('/todos/:id/toggle', (req, res) => {
  const id = Number(req.params.id);  
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  console.log(todo);
  res.redirect('/');
});

// Edit
app.get('/todos/:id/edit', (req, res) => {
    const id = Number(req.params.id); 
    const todo = todos.find(t => t.id === id); 
    if (!todo) {
        return res.redirect('/')
    }
    res.render('edit.ejs', {
        todo
    })
}); 

app.post('/todos/:id/edit', (req, res) => {
    const id = Number(req.params.id);
    const newTitle = req.body.title;
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.title = newTitle; 
    }
    res.redirect('/'); 
}); 

// Delete
app.post('/todos/:id/delete', (req, res) => {
    const id = Number(req.params.id); 
    todos = todos.filter(todo => todo.id !== id);
    res.redirect('/'); 
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


