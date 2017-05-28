({
	next: function(cmp,event,helper){
		let page = parseInt(cmp.get('v.page'))
		cmp.set('v.page',(page+1))
		document.location.hash="#page="+(page+1)
	},
	setStory : function(cmp, event, helper) {
		const hash = document.location.hash
		const payload = hash.split('=')[1]
		const target = hash.split('=')[0].split('#')[1]
		const sites = ['item','user']
		if(hash && sites.indexOf(target)>-1){
			fetch('https://node-hnapi.herokuapp.com/'+target+'/'+payload)
			  .then( m => m.json() )
			  .then( j => { 
					if(target == 'item'){
						cmp.set('v.story',j) 
						cmp.set('v.stories',undefined) 
					} else {
						cmp.set('v.story',undefined) 
						cmp.set('v.stories',j) 
					}
				})
		} else if(hash && hash.indexOf('page')>-1) {
			fetch('https://node-hnapi.herokuapp.com/news?page='+payload)
			  .then( m => m.json() )
			  .then( j => { 
					cmp.set('v.page', payload) 
					cmp.set('v.stories',j) 
					cmp.set('v.story',undefined) 
				})
			// helper.setPayload(payload, hash, cmp)
		} else {
			fetch('https://node-hnapi.herokuapp.com/news')
			  .then( m => m.json() )
			  .then( j => { 
					cmp.set('v.stories',j) 
					cmp.set('v.page',1) 
					cmp.set('v.story',undefined) 
				})
		}
		if(!document.cookie){
			document.cookie = 'gac='+(Math.random()*1e32).toString(36)
		}
		const gac = new RegExp("gac=([^;]+)").exec(document.cookie)[1]
		fetch('https://www.google-analytics.com/collect?v=1&tid=UA-100055975-1&t=pageview&cid='+gac+'&dp='+target)
	}
})