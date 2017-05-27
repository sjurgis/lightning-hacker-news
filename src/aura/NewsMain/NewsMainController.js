({
	init : function(cmp, event, helper) {
		// fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
		
	},
	next: function(cmp,event,helper){
		let page = parseInt(cmp.get('v.page'))
		console.log(page)
		cmp.set('v.page',(page+1))
		document.location.hash="#page="+(page+1)
	},
	setStory : function(cmp, event, helper) {
		
		const hash = document.location.hash
		console.log('url changed ' + hash)
		const payload = hash.split('=')[1]
		const target = hash.split('=')[0]
		const sites = ['item','user']
		if(hash && hash.indexOf('story')>-1){
			// helper.setPayload(payload, hash  , cmp)
			fetch('https://node-hnapi.herokuapp.com/item/'+payload)
			  .then( m => m.json() )
			  .then( j => { 
					console.log(j)
					
					cmp.set('v.story',j) 
					cmp.set('v.stories',undefined) 
				})
		} else if(hash && hash.indexOf('page')>-1) {
			fetch('https://node-hnapi.herokuapp.com/news?page='+payload)
			  .then( m => m.json() )
			  .then( j => { 
					console.log(j)
					console.log(cmp.get('v.page'))
					cmp.set('v.page', payload) 
					// cmp.set('v.story',j) 
					cmp.set('v.stories',j) 
					cmp.set('v.story',undefined) 
				})
			// helper.setPayload(payload, hash, cmp)
		}
		else if(hash && hash.indexOf('user')>-1) {
			fetch('https://node-hnapi.herokuapp.com/user/'+payload)
			  .then( m => m.json() )
			  .then( j => { 
					console.log(j)
					
					// cmp.set('v.story',j) 
					cmp.set('v.stories',j) 
					cmp.set('v.story',undefined) 
				})
			// helper.setPayload(payload, hash, cmp)
		}
		else if(hash && hash.indexOf('item')>-1) {
			// fetch('https://node-hnapi.herokuapp.com/item/'+payload)
			//   .then( m => m.json() )
			//   .then( j => { 
			// 		console.log(j)
			// 		
			// 		// cmp.set('v.story',j) 
			// 		cmp.set('v.stories',j) 
			// 		cmp.set('v.story.comments',j) 
			// 	})
		}
		else {
			fetch('https://node-hnapi.herokuapp.com/news')
			  .then( m => m.json() )
			  .then( j => { 
					console.log(j)
					cmp.set('v.stories',j) 
					cmp.set('v.page',1) 
					cmp.set('v.story',undefined) 
				})
		}
		
	}
})