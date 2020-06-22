let num = 0
function diff(oldNode,newTree){
    let patches = []
    walk(oldNode,newTree,num,patches)
    return patches
}

function walk(oldNode,newNode,index,patches){
    let current = []
    if(!newNode){
        current.push({type:'REMOVE'})
    }else if(isString(oldNode)&&isString(newNode)){
        if(oldNode !== newNode){
            current.push({type:'TEXT',text:newNode})
        }
    }else if(oldNode.type === newNode.type){
        let attr = diffAttr(oldNode.props,newNode.props)
        if(Object.keys(attr).length){
            current.push({type:'ATTR',attr})
        }

        diffChildren(oldNode.children,newNode.children,patches)
    }

    if(current.length){
        patches[index] = current
    }
}

function isString(string){
    return typeof(string) === 'string'
}


function diffAttr(oldAttr,newAttr){
    let attr = {}
    for(let key in oldAttr){
        if(oldAttr[key] !== newAttr[key]){
            attr[key] = newAttr[key]
        }
    }

    for(let key in newAttr){
        if(!oldAttr.hasOwnProperty(key)){
            attr[key] = newAttr[key]
        }
    }
    return attr
}

function diffChildren(oldChildren,newChildren,patches){
    oldChildren.forEach((child,index)=> {
        walk(child,newChildren[index],num++,patches)
    });
}


//test

var vdom2 = createElement('ul',{class:'list',style:"color:yellow;"},[
    createElement('li',{class:'item'},['zhoujielun']),
    createElement('li',{class:'item'},['liudehua']),
    createElement('li',{class:'item'},['zhanghuimei'])
])

var patches = diff(vdom1,vdom2)
console.log('patches',patches)