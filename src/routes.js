const { addbooksHandler, getAllBooksHandler, getBookByIdHandler, editbooks, deletebooksByIdHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addbooksHandler,
    }, 
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editbooks,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deletebooksByIdHandler,
    },
];

module.exports = routes;
