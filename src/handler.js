const { nanoid } = require('nanoid');
const book = require('./book');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };

    book.push(newBook);

    const isSuccess = book.filter((book) => book.id === id).length > 0;


    if (!name || !name.trim()) {
        const response = h.response({
            "status": 'fail',
            "message": 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (request.payload.readPage > request.payload.pageCount) {
        const response = h.response({
            "status": 'fail',
            "message": 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });

        response.code(201);
        return response;
    }

};

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        book,
    },
});

// const getBookByIdHandler = (request, h) => {
//     const {id} =  request.params

//     const index = book.filter((book) => book.id === id)[0]

//     if (index !== undefined) {
//         return {
//           status: 'success',
//           data: {
//             book: index
//           },
//         };
//       }
//       const response = h.response({
//         status: 'fail',
//         message: 'Buku tidak ditemukan',
//       });
//       response.code(404);
//       return response;
// }

// const getBookByIdHandler = (request, h) => {
//     const { id } = request.params;
//     console.log(request.params);
//     console.log(id);

//     const bookTarget = book.find(book => book.id === id);

//     if (bookTarget) {
//         const response = h.response({
//             status: 'success',
//             data: {
//                 book: bookTarget,
//             }
//         });
//         console.log(h);
//         console.log(response);
//         console.log(bookTarget);
//         response.code(200);
//         return response;
//     } if (!bookTarget) {
//         const response = h.response({
//             status: 'fail',
//             message: 'Buku tidak ditemukan',
//         });
//         response.code(404);
//         return response;
//     }
// };

const editBook = (request, h) => {
    const { id } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = book.findIndex((book) => book.id === id);

    if (index != -1) {
        book[index] = {
            ...book[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};


module.exports = {
    addBookHandler,
    getAllBooksHandler,
    // getBookByIdHandler,
    editBook
};