let db = require('../../../db.json');
const messages = require('./messages');

// Get all expense by category, startdate & enddate
const getAllExpense = (category, startDate, endDate) => {
    let expense = db;
    if(category) {
        expense = expense.filter(ele => ele.category === category);
    }
    if(startDate) {
        expense = expense.filter(ele => filterByStartDate(ele.expenseDate, startDate));
    }
    if(endDate) {
        expense = expense.filter(ele => filterByEndDate(ele.expenseDate, endDate));
    }
    return expense;
};

// Create new expense
const addExpense = (expense) => {
     
    if(Object.keys(expense).length === 0) {
        showError(messages.emptyDataReceived);        
    }
    if(!(expense.id && expense.title && expense.category && expense.description && expense.amount && expense.expenseDate)) {
        showError(messages.missingData);        
    }
    const expenseExists = db.find(ele => ele.id === expense.id);    
    if (expenseExists) { 
        showError(messages.expenseAlreadyExists);        
    }
    db.push(expense);
}

// Update expense by Id
const updateExpense = (id, expense) => {    
    const expenseExists = db.find(ele => ele.id === id);
    if (!expenseExists) {
        showError(messages.expenseNotFoundForUpdate);
    }
    if(Object.keys(expense).length === 0) {
        showError(messages.emptyDataForUpdate);
    }
    if (!expense.id) {
        showError(messages.missingIdForUpdate);
    }
    if(!(expense.title && expense.category && expense.description && expense.amount && expense.expenseDate)) {
        showError(messages.missingValuesForUpdate);
    }
    db = db.map(ele => (ele.id === id) ? expense : ele);
}

// Delete expense by Id
const deleteExpense = (id) => {
    if (!id) {
        showError(messages.missingIdForDelete);
    }
    const expenseExists = db.find(ele => ele.id === id);
    if (!expenseExists) {
        showError(messages.expenseNotFoundForDelete);
    }
    db = db.filter(ele => ele.id !== id);
}

// Throw error message
const showError = (message) => {
    throw { errorStatus: 400, errorMessage: message };
}

// Helper to add filter by startdate
const filterByStartDate = (testDate, baseDate) => {
    var tparts = testDate.split('/');
    testDate = new Date(tparts[2], tparts[1] - 1, tparts[0]);

    var bparts = baseDate.split('/');
    baseDate = new Date(bparts[2], bparts[1] - 1, bparts[0]);
    
    return testDate >= baseDate;
}

// Helper to add filter by enddate
const filterByEndDate = (testDate, baseDate) => {
    var tparts = testDate.split('/');
    testDate = new Date(tparts[2], tparts[1] - 1, tparts[0]);
    
    var bparts = baseDate.split('/');
    baseDate = new Date(bparts[2], bparts[1] - 1, bparts[0]);
    
    return testDate <= baseDate;
}

module.exports = {
    getAllExpense,
    addExpense,
    updateExpense,
    deleteExpense
};