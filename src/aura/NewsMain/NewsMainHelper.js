({
	setPayload : function(payload, target, cmp) {
		fetch('https://node-hnapi.herokuapp.com/'+target+'/'+payload)
			.then( m => m.json() )
			.then( j => { 
				console.log(j)
				
				// cmp.set('v.story',j) 
				cmp.set('v.stories',j) 
				cmp.set('v.story.comments',j) 
			})
	}
})