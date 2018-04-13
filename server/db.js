const mongo = require('mongodb').MongoClient;

module.exports = (()=>{

	let _DB, _QUIZ, _QUESTIONS;
	let _ISCONNECTED = false;

	const _connect = ()=>{
		return mongo.connect('mongodb://webuser:webuser@ds046067.mlab.com:46067/quizzanywhere')
			.then(client=>{
				console.log("DATABASE CONNECTED")
				_DB = client.db("quizzanywhere");  			// DATABASE
				_QUIZ = _DB.collection('quizz');			// QUIZZES repertoir
				_QUESTIONS = _DB.collection('questions');	// questions on quizzes
				_ISCONNECTED = true;
				return true
			}).catch(err=>{
				console.log("DATABASE CONNECTION ERROR")
			})
	}

	const _find = (obj, collection)=> {
		return new Promise((resolve, reject)=>{
			collection && collection.find(obj).toArray((err, data)=>{
				if(err) reject({error:true, message:"Error getting questions"})
				resolve(data);
			})
		});		
	}


	const _findOne = (obj, collection)=> {
		return new Promise((resolve, reject)=>{
			collection && collection.findOne(obj).toArray((err, data)=>{
				if(err) reject({error:true, message:"Error getting questions"})
				resolve(data);
			})
		});		
	}



  //////////////////////////////////////////////////////////////////////////
 /** ALL THE BELOW DB FUNCTION HAVE YET TO BE PROPERLY WRITTEN OR TESTED */
//////////////////////////////////////////////////////////////////////////


			const _insertMany = (arr, collection)=> collection && collection.insertMany(arr);
			const _insertOne = (obj, collection)=> collection && collection.insertOne(obj);

			const _updateOne = (obj, collection)=> {
				return new Promise((resolve, reject)=>{
					collection && collection.update(obj).toArray((err, data)=>{
						if(err) reject({error:true, message:"Error getting questions"})
						resolve(data);
					})
				});		
			}

			const _deleteOne = (obj, collection)=> collection && collection.deleteOne(obj);


  //////////////////////////////////////////////////////////////////////////
 /** ALL THE ABOVE DB FUNCTION HAVE YET TO BE PROPERLY WRITTEN OR TESTED */
//////////////////////////////////////////////////////////////////////////

	


	


    /** HAVING THE RETURNED FUNCTION SEPARTE FROM THE ACTUAL FUNCTION ABOVE IS SIMPLY FOR CLARITY - 
     * ITS MUCH EASIER TO SEE THE MODULES METHODS IF THEY ARE LISTED IN THE RETURN LIKE BELOW
     * IT ACTUALLY MEANS A CHANGE OR ADDITIONAL METHOD NEEDS TO BE ENTERED IN 2 PLACES 
     * A PRIVATE FUNCTION ABOVE - OUTSIDE OF THE RETURN AND
     * AN ANONYMOUS FUNCTION IN THE RETURNED OBJECT TO CALL THE PRIVATE FUNCTION ABOVE*/

	return{
		isConnected: 		()=> _ISCONNECTED,
		connect: 			()=> _connect(),

		postQuiz: 			(obj)=> _insertOne(obj, _QUIZ),		// C
		getQuiz: 			(obj)=> _findOne(obj, _QUIZ),		// R
		updateQuiz: 		(obj)=> _updateOne(obj, _QUIZ),		// U
		deleteQuiz: 		(obj)=> _deleteOne(obj, _QUIZ),		// D

		postQuestion: 			(obj)=> _insertOne(obj, _QUESTIONS),	// C
		getQuestion: 			(obj)=> _findOne(obj, _QUESTIONS),		// R		// PROBABLY NOT NEEDED
		updateQuestion: 		(obj)=> _updateOne(obj, _QUESTIONS),	// U
		deleteQuestion: 		(obj)=> _deleteOne(obj, _QUESTIONS),	// D

		getQuestions: 		(obj)=> _find(obj, _QUESTIONS),			
		postQuestions:	(arr)=> _insertMany(arr, _QUESTIONS),

		findOne: 			(obj, collection)=> _findOne(obj, collection),		// THIS IS NOT AN API ENDPOINT WE SHOULD EXPOSE - JUST HERE FOR DEV
	}

})()
