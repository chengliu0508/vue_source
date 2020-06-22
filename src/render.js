class Element {
    constructor(type,props,children){
        this.type = type
        this.props = props
        this.children = children
    }
}

function createElement(type,props,children){
    return new Element(type,props,children)
}

function render(domObj){
    let el = document.createElement(domObj.type)
    for (let key in domObj.props){
        setAttr(el,key,domObj.props[key])
    }
    domObj.children.forEach(child => {
        child = child instanceof Element?render(child):document.createTextNode(child)
        el.appendChild(child)
    });
    return el
}

function setAttr(node,key ,value){
    switch (key){
        case 'value':
            if(node.tagName.tolowerCase() ==='input'||node.tagName.tolowerCase === 'textarea'){
                node.value = value
            }else{
                node.setAttribute(key,value)
            }
            break;
        case 'style':
            node.style.cssText = value
            break
        default:
            node.setAttribute(key,value)
            break
    }
}

function renderDom(el,taregt){
    taregt.appendChild(el)
}


//test
var vdom1 = createElement('ul',{class:'list',style:"color:red;"},[
 createElement('li',{class:'item'},['zhoujielun']),
 createElement('li',{class:'item'},['linjunjie']),
 createElement('li',{class:'item'},['zhanghuimei'])
])
console.log('vdom',vdom1)
let dom1 = render(vdom1)
console.log('dom',dom1)
renderDom(dom1,document.getElementById('app'))