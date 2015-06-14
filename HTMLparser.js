/*! HTMLparser (c) 2015 Oluwaseun Ogedengbe, MIT seun40.github.io/comic-ng/*/
function HTML2Obj(a){
    return HTMLobjClean(HTMLparser(a));
}
function Obj2HTML(b,e){
    var c;
    for (i = 0; i < b.length; i++) { 
        c = document.createElement(b[i].$head);
        for (var key in b[i]){
            if(b[i].hasOwnProperty(key) && key[0]!='$'){
                console.log(key,b[i][key]);
                c.setAttribute(key, b[i][key]);
            }
        }
        console.log(b[i]);
        if(b[i].$in.length) Obj2HTML(b[i].$in, c);
        e.appendChild(c);
    }
}
function HTMLobjClean(a){
    for(i=0;i<a.length;i++){
        if(a[i].$head[0]=="/"){
            /*console.log(a.splice(i,1));*/
            a.splice(i,1);
        }
        if(i>=a.length) break;
    }
    for(i=0;i<a.length;i++){
        HTMLobjClean(a[i].$in);
    }
    return a;
}
function HTMLparser(a){
    if(void 0===a){
        console.error("HTMLparser needs something to parse");
        return -1;
    } else if(typeof a==='string'){/*if a is string turn it into a cleaned array of tags*/
        a = a.replace(/[\n<]/g, '').split(">");
        a.pop();
    }
    /*console.log(a);*/
    if(a.length<1) return [];
    var taglist = [];
    var tag = {};
    var b = [];
    var c = [];
    var iter = [];
    var u = 0;
    var w = 0;
    var v = 0;
    var x = 0;
    var y = 1;
    var i = 0;
    while(a.length>0){ 
        w = 0;
        x = 0;
        u = 0;
        b = [];
        tag = {$head:'',$tail:'',$in:[]};
        for(q=0;q<a.length;q++){
            b.push(a[q].split(" ")[0]);/*reduce to tags for searching*/
        }
        /*console.log(a);
        console.log(b);*/
        i = -1;
        while(u>=0){
            u = b.indexOf(b[0],u+1);
            i++;/*how many nested replicas there are*/
        }
        for(j=-1;j < i;j++){ 
            /*console.log("active");*/
            x = b.indexOf("/"+b[0],x);
            w = b.indexOf("/"+b[0],x+1);
            if(w<0){
                if(j >= i){//if we break before we've reached the closing tag, the tag doesn't exist*/
                    while(i>0){
                        a.push("/"+b[0]);/*thus we append the closing tags*/
                        b.push("/"+b[0]);
                        i--;
                    }
                }
                break;
            }
        }
        /*console.log("0",x);*/
        iter = a[0].split(" ");
        tag.$head = b[0];
        tag.$tail = b[x];
        for (k = 1; k < iter.length; k++) {
            var sub_iter = iter[k].split("=");
            tag[sub_iter[0]] = (sub_iter.length>1)?sub_iter[1]:'';
        }
        c = a.splice(0,x);
        //c.splice(c.length-1,1);
        c.splice(0,1);
        if(x<=1) a.splice(0,1);
        tag.$in = HTMLparser(c);
        taglist.push(tag);
        
        if(x<0) break;
    }    
    return taglist;
}