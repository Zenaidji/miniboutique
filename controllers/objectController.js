/* retrieve the model : necessary to interact with the database */
const Objects = require('../models/object.model').model;
var mongoose = require('mongoose');

const buyItem = async(req, res) => {
    console.log("buy item")
    try {
        const data = await Objects.findById(req.params.objectId)
        const price = data.price
        await Objects.findByIdAndRemove(req.params.objectId).remove();
        res.status(201).json(price);
    } catch (error) {
        throw error;
    }
}
const objectData =
    async(req, res) => {
        try {
            const object = await Objects.findById(req.params.objectId);
            console.log(object)
            res.status(200).json(object);
        } catch (error) {
            res.status(400).json(error);
        }
    }



const list = async(req, res) => {
    try {
        const data = await Objects.find({ ownerId: { $ne: req.userId } })

        console.log(data)
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

/*
 *  controller that renders the book list found in the database
 */
const listThen = (_, res) =>
    Objects.find() // select all the books from database
    .then(allObjects => res.render('allbooks', // then use the result of the query to render the view in 'allbooks.pug'
        {
            title: 'Object list (with then)',
            Objects: allObjects
        }));

const DEFAULT_YEAR = 2000;
/* controller for path /books/one : find one book */
const oneObject = async(_, res) => {
    const foundObject = await Objects.findOne(); // select first found document
    res.render('bookdetail', {
        title: 'Only first book from list',
        request: 'objects.findOne()',
        book: foundObject
    });
}

/* controller for /details/:bookId :  find books with _id= :bookId using findById()
(quasi) équivalent à
           Books.findOne({ _id : req.params.bookId })
           Books.findOne().where('_id').equals( req.params.bookId )
*/


/* controller for POST /create : execute the create operation in the db and return created book of successfull*/
const create = async(req, res, _) => {
        console.log("ajout à la base de l'objet")
        console.log(req.id)
            //const newBook = { title : req.body.title, author : req.body.author, year : req.body.year, cover : req.body.cover };
        const newObjectData = {
            ...req.body
        };
        try {
            const createdObject = await Objects.create(newObjectData);
            console.log("owner")
            console.log(createdObject.ownerId)
            res.status(201).json(createdObject);
        } catch (err) {
            console.log(`pb ajout de l'objet à la base de données ${err.message}`);
            res.status(409).json({ message: err.message });
        }
    }
    /*  promise.then version
    Books.create(newBookData)
      .then( createdook => res.status(200).json(createdBook) ) ;    //  responds with code 200 and sends created book
      .catch( error => res.status(400).json(error) );       // if creation fails => responds with code 400
     */


/* details adding */
/* controller for GET /details/:bookId */
const addDetailsForm = async(req, res) => {
    const book = await Objects.findById(req.params.bookId);
    res.render('addDetails', { book: book });
}


/* controller for POST /details/:bookId */
const addDetails = async(req, res) => {
    const details = {...req.body }; // in body we get details for book
    let object = await Objects.findById(req.params.objectId); // retrieve book by id
    try {
        object.details = details; // add details to book
        object = await book.save(); // save modified book
        res.status(201).json(book); // send modified book
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateForm = async(req, res) => {
    const book = await Objects.findById(req.params.bookId) // for updating, we find book and send it to client
    res.render('updateBook', { book: book });
}

/* controller for PUT /update/:bookId */
const update = async(req, res) => {
    const updatedBookData = {...req.body }; // new value for book is received from client
    try {
        const updatedBook = await Books.findByIdAndUpdate(
            req.params.bookId,
            updatedBookData, // updating is done
            { new: true } // to get modified book as result
        );
        res.status(201).json(updatedBook);
    } catch (error) {
        res.status(400).json(error);
    }
}
const deleteObject = async(req, res) => {
    try {
        await Books.findByIdAndRemove(req.params.objectId).remove();
        console.log(`--> book ${req.params.bookId} deleted`);
        res.status(301).redirect('/books');
    } catch (error) {
        throw error;
    }
}


/* controller for GET /create : return the view with create form */
const createForm = (_, res) => res.redirect('/user.html');

module.exports.list = list;
module.exports.listThen = listThen;
module.exports.oneObject = oneObject;
module.exports.buyItem = buyItem;
module.exports.create = create;
module.exports.createForm = createForm;
module.exports.addDetailsForm = addDetailsForm;
module.exports.addDetails = addDetails;
module.exports.updateForm = updateForm;
module.exports.update = update;
module.exports.deleteObject = deleteObject;
module.exports.objectData = objectData;