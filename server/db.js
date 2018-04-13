
const M = require('mongodb');
const mongo = M.MongoClient;
const ObjectID = M.ObjectID;

module.exports = (()=>{

	let _DB, _QUIZ, _QUESTIONS;
	let _ISCONNECTED = false;

	const mongoID = id=> ( {_id: new ObjectID(id)} )
	

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
					collection && collection.find(obj).toArray((err, data)=>{ // NOT SURE ABOUT CALLBACK PARAMS ORDER
						if(err) reject({error:true, message:"Error getting questions"})
						resolve(data);
					})
				});		
			}

			const _findOne = (obj, collection)=> {
				return new Promise((resolve, reject)=>{
					collection && collection.findOne(obj, (err, data)=>{
						if(err) reject({error:true, message:"Error getting questions"})
						resolve(data);
					})
				});		
			}

			const _findByID = (id, collection)=>{
				return new Promise((resolve, reject)=>{					
					collection && collection.findOne(mongoID(id), (err, data)=>{
						if(err) reject({error:true, message:"Error getting questions"})
						resolve(data);
					})
				})
			}


  //////////////////////////////////////////////////////////////////////////
 /** ALL THE BELOW DB FUNCTION HAVE YET TO BE PROPERLY WRITTEN OR TESTED */
//////////////////////////////////////////////////////////////////////////


			

			const _insertMany = (arr, collection)=> {
				return new Promise((resolve,reject)=>{
					collection && collection.insertMany(arr).then(response=>{
						console.log(response)
						resolve(response);
					})
				})
			}

			const _insertOne = (obj, collection)=> {
				return new Promise((resolve,reject)=>{
					collection && collection.insertOne(obj).then(response=>{
						console.log(response)
						resolve({data:response.ops[0], insertedId: response.insertedId})
					});
				})
			}

			const _updateOne = (id, obj, collection)=> {
				// console.log(id, obj, collection)

				return new Promise((resolve, reject)=>{
					collection && collection.updateOne({_id:id}, {$set: obj}).then(response=>{
						console.log(response)
						// resolve({data:response.ops[0], insertedId: response.insertedId})
					});
				})
			}

			const _deleteOne = (obj, collection)=> collection && collection.deleteOne(obj);


  //////////////////////////////////////////////////////////////////////////
 /** ALL THE ABOVE DB FUNCTION HAVE YET TO BE PROPERLY WRITTEN OR TESTED */
//////////////////////////////////////////////////////////////////////////

	
			/** THIS COMBINES THE QUIZ AND THE QUESTIONS INTO ONE SINGLE OBJ TO RETURN */
			const _getQuiz = id=>{
				return new Promise((resolve, reject)=>{
					_QUIZ && _QUIZ.findOne(mongoID(id), (err, quiz)=>{
						if(err) reject({error:true, message:"Error getting quiz"})
						return _find({quiz_id:id}, _QUESTIONS).then((questions,err)=>{
							quiz.questions = questions
							resolve(quiz)
						})
					});
				});
			}

	


    /** HAVING THE RETURNED FUNCTION SEPARTE FROM THE ACTUAL FUNCTION ABOVE IS SIMPLY FOR CLARITY - 
     * ITS MUCH EASIER TO SEE THE MODULES METHODS IF THEY ARE LISTED IN THE RETURN LIKE BELOW
     * IT ACTUALLY MEANS A CHANGE OR ADDITIONAL METHOD NEEDS TO BE ENTERED IN 2 PLACES 
     * A PRIVATE FUNCTION ABOVE - OUTSIDE OF THE RETURN AND
     * AN ANONYMOUS FUNCTION IN THE RETURNED OBJECT TO CALL THE PRIVATE FUNCTION ABOVE*/

	return{
		isConnected: 		()=> _ISCONNECTED,
		connect: 			()=> _connect(),

		postQuiz: 			(obj)=> _insertOne(obj, _QUIZ),						// C
		getQuiz: 			id=> _getQuiz(id),									// R
		updateQuiz: 		(id, obj)=> _updateOne(id, obj, _QUIZ),				// U
		deleteQuiz: 		(obj)=> _deleteOne(obj, _QUIZ),						// D

		postQuestion: 			(obj)=> _insertOne(obj, _QUESTIONS),	// C
		getQuestion: 			(id)=> _findByID(id, _QUESTIONS),		// R		// PROBABLY NOT NEEDED
		updateQuestion: 		(obj)=> _updateOne(obj, _QUESTIONS),	// U
		deleteQuestion: 		(obj)=> _deleteOne(obj, _QUESTIONS),	// D

		getQuestions: 		(obj)=> _find(obj, _QUESTIONS),			
		postQuestions:		(arr)=> _insertMany(arr, _QUESTIONS),

		findOne: 			(obj, collection)=> _findOne(obj, collection),		// THIS IS NOT AN API ENDPOINT WE SHOULD EXPOSE - JUST HERE FOR DEV
	}

})()
