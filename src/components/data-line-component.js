

AFRAME.registerComponent('data-line-component', {
    schema: {
        index: { type: 'int' },
        name: { type: 'string' },
        dataRow: { type: 'array' },
        lat: { type: 'array' },
        long: { type: 'array' },
        max: { type: 'number' },
        min: { type: 'number' }
    },
    multiple: true,
    init: function() {
        console.log("data-line-component init...")
    },
    update: function() {
        el = this.el
        data = this.data

        console.log("data:", data)

        var vectors = []
        var valueScale = 10;
        var latBase = data.dataRow[1]
        var longBase = data.dataRow[1]
        for(var i=0; i<data.dataRow.length; i++){

            var x = data.lat[i] - latBase // offset to 0
            var z = data.long[i] - longBase // offset to 0
            var y = (( data.dataRow[i] - data.min ) / ( data.max - data.min )) * valueScale // normalized 
        	vectors.push(new THREE.Vector3(x, y, z))
        }

        console.log(vectors)

        var path = new THREE.CatmullRomCurve3(vectors);
	    var geometry = new THREE.TubeBufferGeometry( path, 900, 1, 2, false );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var mesh = new THREE.Mesh( geometry, material );

		el.setObject3D('line-'+name, mesh)

    }
});