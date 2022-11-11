AFRAME.registerComponent('loader', {
    init:function(){
        let sceneRequest = new XMLHttpRequest();
        sceneRequest.open("GET",this.data,false); //this.data gotten from loader='data'
        sceneRequest.send();
        
        var sceneData = JSON.parse(sceneRequest.responseText);
        
        
        var ascene = document.querySelector('a-scene');
            
        
        for(let i in sceneData.objects){
            //load model for normal entities
            let asset = document.createElement('a-asset-item');
            asset.setAttribute('id', sceneData.objects[i].id); //get id
            asset.setAttribute('src', sceneData.objects[i].src); //get model source
            ascene.appendChild(asset); 
            
            //place entities
            let entity = document.createElement('a-entity');
            entity.setAttribute('gltf-model', '#' + sceneData.objects[i].id); //modelname must include #
            entity.setAttribute('position', sceneData.objects[i].position);
            entity.setAttribute('scale', sceneData.objects[i].scale);
            entity.setAttribute('rotation', sceneData.objects[i].rotation);
            ascene.appendChild(entity);
        }

        //used for oddball objects, for example, a-environment.
        for(let i in sceneData.specialobjects){
            let special = document.createElement(sceneData.specialobjects[i].type);
            for(let j in sceneData.specialobjects[i].properties){
                special.setAttribute(sceneData.specialobjects[i].properties[j].attribute, sceneData.specialobjects[i].properties[j].data);
            }
            ascene.appendChild(special);
        }


        //examples in html
        //<a-asset-item id = table src='../src/models/props/basic/table.gltf'></a-asset-item>"
        //<a-entity gltf-model='#table' position = '0 0 0' scale = '.25 .25 .25' rotation='0 0 0'></a-entity>
        
    }
}); 