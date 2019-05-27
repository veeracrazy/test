const router = require('express').Router();
const expense = require('./expense');
const messages = require('./messages');

// Get All Expense
router.get('/:category?', (req, res) => {  
    const data = expense.getAllExpense(req.params.category, req.query.startdate, req.query.enddate);
    res.status(200).json(data);
});

// Create New Expense
router.post('/', (req, res) => {
    try {        
        if(parseInt(req.headers['content-length']) === 0) {
            throw { errorStatus: 400, errorMessage: messages.noDataReceived };            
        }     
        expense.addExpense(req.body);
        res.status(200).json(messages.expenseAdded);    
    } catch (error) {
        res.status(error.errorStatus).json(error.errorMessage);
    }    
});

// Update Expense by ID
router.put('/:id', (req, res) => {    
    try {        
        if(parseInt(req.headers['content-length']) === 0) {
            throw { errorStatus: 400, errorMessage: messages.noDataReceivedForUpdate };            
        }
        expense.updateExpense(req.params.id, req.body);
        res.status(200).json(messages.expenseUpdated);
    } catch (error) {
        res.status(error.errorStatus).json(error.errorMessage);
    }
});

// Delete Expense by Id
router.delete('/:id?', (req, res) => {    
    try {
        expense.deleteExpense(req.params.id);
        res.status(200).json(messages.expenseDeleted);
    } catch (error) {
        res.status(error.errorStatus).json(error.errorMessage);
    }
});

// 404 Not Found
router.get('*', (req, res) => {
    res.status(404).json(messages.notFound);
});


module.exports = router;