const mongo = require('mongodb').MongoClient;

module.exports = (()=>{

	let _DB, _COL

	const _connect = ()=>{
		return mongo.connect('mongodb://webuser:webuser@ds046067.mlab.com:46067/quizzanywhere1')
			.then(client=>{
				_DB = client.db("quizzanywhere");  	// DATABASE
				_COL = _DB.collection('quizz');		// COLLECTION
				_SAVED_QUIZZ = _DB.collection('quizz');		// QUIZZES repertoir
				_QUESTIONS = _DB.collection('questions');		// questions on quizzes
				return true
			}).catch(err=>{
				console.log("Mongo error")
			})
	}

	const _insertOne = (obj, collection)=> collection.insertOne(obj);
	const _insertMany = (arr, collection)=> collection.insertMany(arr);

	const _findOne = (obj)=>_COL.findOne(obj);


	return{
		connect: ()=>_connect(),
		insertQuestion: (obj)=>_insertOne(obj, _QUESTIONS),
		insertQuizz: (obj)=>_insertOne(obj, _QUIZZ),
		insertMany: (arr)=>_insertMany(arr, _QUESTIONS),
		findOne: (obj)=>_findOne(obj),
	}

})()
