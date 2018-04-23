const M = require('mongodb');
const mongo = M.MongoClient;
const ObjectID = M.ObjectID;

module.exports = (()=>{

	let _DB, _QUIZ, _QUESTIONS;
	let _ISCONNECTED = false;

	const mongoID = id=> {
		if(typeof id==="function") return id
		else if(typeof id==="string") return new ObjectID(id)
		else return id
	}

	const _connect = ()=>{
		return mongo.connect('mongodb://webuser:webuser@ds046067.mlab.com:46067/quizzanywhere')
			.then(client=>{
				console.log("DATABASE CONNECTED")
				_DB = client.db("quizzanywhere");  			// DATABASE
				_QUIZ = _DB.collection('quizz');			// QUIZZES repertoir
				_QUESTIONS = _DB.collection('questions');	// questions on quizzes
				_ISCONNECTED = true;
				// testFunction()
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
			collection && collection.findOne({_id:mongoID(id)}, (err, data)=>{
				if(err) reject({error:true, message:"Error getting by ID"})
				data!==null ? resolve(data) : reject({error:true, message:"Error getting by ID"});
			})
		})
	}


	const _insertOne = (obj, collection)=> {
		return new Promise((resolve,reject)=>{
			collection && collection.insertOne(obj).then(response=>{
				resolve({data:response.ops[0], insertedId: response.insertedId})
			});
		})
	}


	const _insertMany = (arr, collection)=> {
		return new Promise((resolve,reject)=>{
			collection && collection.insertMany(arr).then(response=>{
				resolve(response);
			})
		})
	}

	/** _replaceOne and _updateOne differ only in that 
	 * UPDATE amends a record using the values of OBJ, keys not in OBJ but on the record are untouched
	 * REPLACE will entirely replace the record with the new obj  */
			const _replaceOne = (id, obj, collection)=>{
				// if(obj.quiz_id && typeof obj.quiz_id === "string") obj.quiz_id=mongoID(obj.quiz_id)  // This makes sure any updated questions quiz_id is a MongoID not a string
				// !isMongoID(obj.quiz_id) && obj.quiz_id=mongoID(obj.quiz_id)  // This makes sure any updated questions quiz_id is a MongoID not a string
				return new Promise((resolve, reject)=>{			
					collection && collection.replaceOne({_id:mongoID(id)}, obj, (err, data)=>{
						if(err || data.modifiedCount===0) reject({error:true, message:"Nothing was updated"})
						else resolve(data.ops[0]);
					})
				})
			}

			const _updateOne = (id, obj, collection)=> {	
				// if(obj.quiz_id && typeof obj.quiz_id === "string") obj.quiz_id=mongoID(obj.quiz_id)  // This makes sure any updated questions quiz_id is a MongoID not a string
				return new Promise((resolve, reject)=>{
					collection && collection.updateOne({_id:mongoID(id)}, {$set: obj}).then(response=>{
						if(response.modifiedCount===0) reject({error:true, message:"Nothing was updated"})
						else resolve({data:response})
					});
				})
			}



	const _deleteOne = (id, collection)=>{
		return new Promise((resolve, reject)=>{					
			collection && collection.deleteOne({_id:mongoID(id)}, (err, data)=>{
				if(err || data.deletedCount===0) reject({error:true, message:"Nothing was deleted"})
				else resolve({id:id});
			})
		})
	}

	

	const _deleteMany = (obj, collection)=>{
		return new Promise((resolve, reject)=>{					
			collection && collection.deleteMany(obj, (err, data)=>{
				if(err) reject({error:true, message:"Bulk delete failed"})
				else resolve({id: obj.quiz_id, deleted: data.deletedCount});
			})
		})
	}





  //////////////////////////////////////////////////////////////////////////
 /** combination functions specific to this app, were the above are generic */
//////////////////////////////////////////////////////////////////////////

/** THIS COMBINES THE QUIZ AND THE QUESTIONS INTO ONE SINGLE OBJ TO RETURN */
const _getQuiz = id=>{
	return new Promise((resolve, reject)=>{
		_QUIZ && _QUIZ.findOne({_id:mongoID(id)}, (err, quiz)=>{
			if(err || !quiz) reject({error:true, message:"Error getting quiz"})
			else return _find({$or:[{quiz_id:mongoID(id)},{quiz_id:id}]}, _QUESTIONS).then((questions,err)=>{
				quiz.questions = questions
				resolve(quiz)
			})
		});
	});
}


const _saveQuiz = obj=>{
	let questions = obj.questions || {}
	delete obj.questions
	return new Promise((resolve, reject)=>{
		_insertOne(obj, _QUIZ).then(quiz=>{
			questions.map(q=>{
				q.quiz_id = quiz.insertedId;
				return q;
			})
			_insertMany(questions, _QUESTIONS).then(qs=>{
				quiz.data.questions = qs.ops
				resolve(quiz.data)
			})
		})
	})
}

const _deleteQuiz = (id, obj)=>{
	return _checkPassword(id, obj.password)
		.then(()=>_deleteOne(id, _QUIZ).then(res=>{
			return _deleteMany({quiz_id:mongoID(id)}, _QUESTIONS)
				.then(res=>res)
				.catch(err=>err)
		}))
		.catch(err=>err)
}

const _updateQuiz = (id, obj)=>{
	return _checkPassword(id, obj.password)
		.then(()=>_updateOne(id, obj, _QUIZ))
		.catch(err=>err)
}

const _deleteQuestion = (id, obj)=>{
	return _checkPassword(obj.quiz_id, obj.password)
		.then(()=> _deleteOne(id, _QUESTIONS))
		.catch(err=>err)
	}

const _replaceQuestion = (id, obj)=>{
	return _checkPassword(obj.quiz_id, obj.password)
		.then(()=> _replaceOne(id, obj, _QUESTIONS))
		.catch(err=>err)
	}
	

/**
 * RETURNED BOOLEAN WHICH WE CHANGED TO RETURN A RESOLVED PROMISE (BELOW)
 */
// const _checkPassword = (quiz_id, password)=>{
// 	return _findByID(quiz_id, _QUIZ).then(data=> {
// 		return data.password===password
// 	}).catch(err=> ({error:true, message:"PASSWORD FAILED"}))
// }


const _checkPassword = (quiz_id, password)=>{
	return new Promise((resolve, reject)=>{
		_findByID(quiz_id, _QUIZ)
			.then(data=> {
				// console.log(data.password,password)
				data.password===password ? resolve(true) : reject({error:true, message:"PASSWORD FAILED"})
			})
			.catch(err=> reject(err))
		})	
}









  //////////////////////////////////////////////////////////////////////////
 /** Function for testing, uncomment in connection callback to run on startup */
//////////////////////////////////////////////////////////////////////////

function testFunction(){
	let id  = "5ad0bcecae91fa2b8c5f41bf"
	let obj =     {
        "question": "Whats yes in English",
        "answer": "no",
        "quiz_id": "5ad0fc85fff8d03c45cd2f9f"
    }
	try {
		_checkPassword(id, "richard");
		// isMongoID(isMongoID)
	} catch (error) {
		console.log(error)
	}
}





    /** HAVING THE RETURNED FUNCTION SEPARTE FROM THE ACTUAL FUNCTION ABOVE IS SIMPLY FOR CLARITY - 
     * ITS MUCH EASIER TO SEE THE MODULES METHODS IF THEY ARE LISTED IN THE RETURN LIKE BELOW
     * IT ACTUALLY MEANS A CHANGE OR ADDITIONAL METHOD NEEDS TO BE ENTERED IN 2 PLACES 
     * A PRIVATE FUNCTION ABOVE - OUTSIDE OF THE RETURN AND
     * AN ANONYMOUS FUNCTION IN THE RETURNED OBJECT TO CALL THE PRIVATE FUNCTION ABOVE*/

	return{
		isConnected: 		()=> _ISCONNECTED,
		connect: 			()=> _connect(),

		postQuiz: 			obj=> _saveQuiz(obj),								// C
		getQuiz: 			id => _getQuiz(id),									// R
		updateQuiz: 		(id, obj)=> _updateQuiz(id, obj, _QUIZ),			// U
		deleteQuiz: 		(id, obj)=> _deleteQuiz(id, obj),					// D

		postQuestion: 		obj=> _insertOne(obj, _QUESTIONS),					// C
		getQuestion: 		id=> _findByID(id, _QUESTIONS),						// R		// PROBABLY NOT NEEDED
		replaceQuestion: 	(id, obj)=> _replaceQuestion(id, obj),				// U
		deleteQuestion: 	(id, obj)=> _deleteQuestion(id, obj),				// D

		getQuestions: 		obj=> _find(obj, _QUESTIONS),
		// getQuizQuestions:	id=>  _find({quiz_id:mongoID(id)}, _QUESTIONS),
		postQuestions:		arr=> _insertMany(arr, _QUESTIONS),

		findOne: 			(obj, collection)=> _findOne(obj, collection),		// THIS IS NOT AN API ENDPOINT WE SHOULD EXPOSE - JUST HERE FOR DEV
	}

})()
