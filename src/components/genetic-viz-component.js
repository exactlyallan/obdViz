// Genetic-Viz Component

AFRAME.registerComponent('genetic-viz-component', {
    schema: {
        chromData: { type: 'array' }
    },
    init: function() {
        // just update
    },
    update: function(oldData) {
        var data = this.data.chromData;
        var el = this.el;
        var dataLength = data.length // full chrom length

        console.log("chrom data length:", data.length)
        // {gap: 18674, id: "rs10195681", pos: "18674", chrom: "2", value: "CC"}
        // AA GG TT CC (4)
        // AG AT AC A (1)
        // GA GT GC G (1)
        // TA TG TC T (1)
        // CA CG CT C (1)
        // Other (1)
        // Gap (1) TBD

        // Visual Attributes 
        var radius = 25 // ring radius
        var spaceMulti = 0.02; // line spacing
        var helixMulti = 0.4; // helix height
        var lineUpMulti = 0; // line uptick

        var gapCount = 0

        this.geometryAA = new THREE.Geometry()
        this.geometryGG = new THREE.Geometry()
        this.geometryTT = new THREE.Geometry()
        this.geometryCC = new THREE.Geometry()
        this.geometryA = new THREE.Geometry()
        this.geometryG = new THREE.Geometry()
        this.geometryT = new THREE.Geometry()
        this.geometryC = new THREE.Geometry()
        this.geometryOther = new THREE.Geometry()


        function calcPos(lineLength, index, gapJ) {

            var posObj = {}
            var theta = ((2 * Math.PI) / radius) * spaceMulti //  even spaces increments

            posObj.posX1 = radius * Math.cos(theta * index)
            posObj.posZ1 = radius * Math.sin(theta * index)
            posObj.posX2 = (radius + lineLength) * Math.cos(theta * index)
            posObj.posZ2 = (radius + lineLength) * Math.sin(theta * index)

            posObj.posY1 = ((index + gapJ)/radius) * helixMulti // add blank space for gaps
            posObj.posY2 = posObj.posY1 + lineUpMulti // slight uptick

            return (posObj)
        }


        for (var j = 0; j < dataLength; j++) {

            var value = data[j].value
            var gap = data[j].gap

            gapCount = gapCount + gap + 1; // total gap count


            // add value lines
            if (value == 'AA') {

                var posObj = calcPos(3, j, gap)

                var vertexAA1 = new THREE.Vector3()
                var vertexAA2 = new THREE.Vector3()

                vertexAA1.x = posObj.posX1
                vertexAA1.y = posObj.posY1
                vertexAA1.z = posObj.posZ1

                vertexAA2.x = posObj.posX2
                vertexAA2.y = posObj.posY2
                vertexAA2.z = posObj.posZ2

                this.geometryAA.vertices.push(vertexAA1);
                this.geometryAA.vertices.push(vertexAA2);

            } else if (value == 'GG') {

                var posObj = calcPos(3, j, gap)


                var vertexGG1 = new THREE.Vector3()
                var vertexGG2 = new THREE.Vector3()

                vertexGG1.x = posObj.posX1
                vertexGG1.y = posObj.posY1
                vertexGG1.z = posObj.posZ1

                vertexGG2.x = posObj.posX2
                vertexGG2.y = posObj.posY2
                vertexGG2.z = posObj.posZ2

                this.geometryGG.vertices.push(vertexGG1);
                this.geometryGG.vertices.push(vertexGG2);

            } else if (value == 'TT') {

                var posObj = calcPos(2, j, gap)

                var vertexTT1 = new THREE.Vector3()
                var vertexTT2 = new THREE.Vector3()

                vertexTT1.x = posObj.posX1
                vertexTT1.y = posObj.posY1
                vertexTT1.z = posObj.posZ1

                vertexTT2.x = posObj.posX2
                vertexTT2.y = posObj.posY2
                vertexTT2.z = posObj.posZ2

                this.geometryTT.vertices.push(vertexTT1);
                this.geometryTT.vertices.push(vertexTT2);

            } else if (value == 'CC') {

                var posObj = calcPos(2, j, gap)

                var vertexCC1 = new THREE.Vector3()
                var vertexCC2 = new THREE.Vector3()

                vertexCC1.x = posObj.posX1
                vertexCC1.y = posObj.posY1
                vertexCC1.z = posObj.posZ1

                vertexCC2.x = posObj.posX2
                vertexCC2.y = posObj.posY2
                vertexCC2.z = posObj.posZ2

                this.geometryCC.vertices.push(vertexCC1);
                this.geometryCC.vertices.push(vertexCC2);

            } else if (value == 'AG' || value == 'AT' || value == 'AC' || value == 'A') {

                var posObj = calcPos(1.5, j, gap)

                var vertexA1 = new THREE.Vector3()
                var vertexA2 = new THREE.Vector3()

                vertexA1.x = posObj.posX1
                vertexA1.y = posObj.posY1
                vertexA1.z = posObj.posZ1

                vertexA2.x = posObj.posX2
                vertexA2.y = posObj.posY2
                vertexA2.z = posObj.posZ2

                this.geometryA.vertices.push(vertexA1);
                this.geometryA.vertices.push(vertexA2);

            } else if (value == 'GA' || value == 'GT' || value == 'GC' || value == 'G') {

                var posObj = calcPos(1.5, j, gap)

                var vertexG1 = new THREE.Vector3()
                var vertexG2 = new THREE.Vector3()

                vertexG1.x = posObj.posX1
                vertexG1.y = posObj.posY1
                vertexG1.z = posObj.posZ1

                vertexG2.x = posObj.posX2
                vertexG2.y = posObj.posY2
                vertexG2.z = posObj.posZ2

                this.geometryG.vertices.push(vertexG1);
                this.geometryG.vertices.push(vertexG2);

            } else if (value == 'TA' || value == 'TG' || value == 'TC' || value == 'T') {

                var posObj = calcPos(1, j, gap)

                var vertexT1 = new THREE.Vector3()
                var vertexT2 = new THREE.Vector3()

                vertexT1.x = posObj.posX1
                vertexT1.y = posObj.posY1
                vertexT1.z = posObj.posZ1

                vertexT2.x = posObj.posX2
                vertexT2.y = posObj.posY2
                vertexT2.z = posObj.posZ2

                this.geometryT.vertices.push(vertexT1);
                this.geometryT.vertices.push(vertexT2);

            } else if (value == 'CA' || value == 'CG' || value == 'CT' || value == 'C') {

                var posObj = calcPos(1, j, gap)

                var vertexC1 = new THREE.Vector3()
                var vertexC2 = new THREE.Vector3()

                vertexC1.x = posObj.posX1
                vertexC1.y = posObj.posY1
                vertexC1.z = posObj.posZ1

                vertexC2.x = posObj.posX2
                vertexC2.y = posObj.posY2
                vertexC2.z = posObj.posZ2

                this.geometryC.vertices.push(vertexC1);
                this.geometryC.vertices.push(vertexC2);

            } else {

                var posObj = calcPos(-1, j, gap)

                var vertexOther1 = new THREE.Vector3()
                var vertexOther2 = new THREE.Vector3()

                vertexOther1.x = posObj.posX1
                vertexOther1.y = posObj.posY1
                vertexOther1.z = posObj.posZ1

                vertexOther2.x = posObj.posX2
                vertexOther2.y = posObj.posY2
                vertexOther2.z = posObj.posZ2

                this.geometryOther.vertices.push(vertexOther1);
                this.geometryOther.vertices.push(vertexOther2);

            }



        } // end for loop


        // AA
        this.materialAA = new THREE.LineBasicMaterial({ color: 0x425dbf });
        this.lineAA = new THREE.LineSegments(this.geometryAA, this.materialAA)
        el.setObject3D('AALines', this.lineAA)

        // GG
        this.materialGG = new THREE.LineBasicMaterial({ color: 0x3595d6 });
        this.lineGG = new THREE.LineSegments(this.geometryGG, this.materialGG)
        el.setObject3D('GGLines', this.lineGG)

        // TT
        this.materialTT = new THREE.LineBasicMaterial({ color: 0x0e9c9c });
        this.lineTT = new THREE.LineSegments(this.geometryTT, this.materialTT)
        el.setObject3D('TTLines', this.lineTT)

        // CC
        this.materialCC = new THREE.LineBasicMaterial({ color: 0x3ba510 });
        this.lineCC = new THREE.LineSegments(this.geometryCC, this.materialCC)
        el.setObject3D('CCLines', this.lineCC)

        // A
        this.materialA = new THREE.LineBasicMaterial({ color: 0x92c746 });
        this.lineA = new THREE.LineSegments(this.geometryA, this.materialA)
        el.setObject3D('ALines', this.lineA)

        // G
        this.materialG = new THREE.LineBasicMaterial({ color: 0xf2c100 });
        this.lineG = new THREE.LineSegments(this.geometryG, this.materialG)
        el.setObject3D('GLines', this.lineG)

        // T
        this.materialT = new THREE.LineBasicMaterial({ color: 0xff6d19 });
        this.lineT = new THREE.LineSegments(this.geometryT, this.materialT)
        el.setObject3D('TLines', this.lineT)

        // C
        this.materialC = new THREE.LineBasicMaterial({ color: 0x9f0f7b });
        this.lineC = new THREE.LineSegments(this.geometryC, this.materialC)
        el.setObject3D('CLines', this.lineC)

        // Other
        this.materialOther = new THREE.LineBasicMaterial({ color: 0xd81515});
        this.lineOther = new THREE.LineSegments(this.geometryOther, this.materialOther)
        el.setObject3D('lineOther', this.lineOther)


        // update status
        var status = document.querySelector('.chrom-stats')
        status.innerHTML = "Displaying " + data.length + " SNPs of an estimated total " + gapCount + " base pairs.";


        // center colum
        var vizHeight = (gapCount/radius )* helixMulti; // shows height of FULL chrom

        this.geometryCyl = new THREE.CylinderGeometry(radius, radius, vizHeight, 32);
        this.materialCyl = new THREE.MeshBasicMaterial({ color: 0x444 });
        this.materialCyl.opacity = 0.2
        this.materialCyl.transparent = true;
        this.cylinder = new THREE.Mesh(this.geometryCyl, this.materialCyl);
        this.cylinder.position.set(0, vizHeight / 2, 0)

        el.setObject3D('cylinder', this.cylinder)


    } // end update

}); // end component