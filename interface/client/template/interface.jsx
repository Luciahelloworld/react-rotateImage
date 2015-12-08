


Interface = React.createClass({
	render:function(){
		return(
			<div className="container">
					<div className="panel panel-default">
					  <div className="panel-heading">
					    <h3 className="panel-title">rotateImage</h3>
					  </div>
					  <div className="panel-body">
					  	<Choose setting={{
					  										"width":1000,
					  										"height":270,
					  										"posterWidth":640,
					  										"posterHeight":270,
					  										"scale":0.9,
					  										"autoplay":"true",
					  										"delay":4000,
					  										"verticalAlign":"middle",
					  									}} />					    
					    
					  </div>
					</div>
			</div>
		)
		
	}
})